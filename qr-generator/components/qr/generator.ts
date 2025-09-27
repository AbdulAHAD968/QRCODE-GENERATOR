import QRCode from 'qrcode-generator';
import { QRContent, QRStyling, WiFiConfig, VCardData } from '../../types';

export class QRGenerator {
  static generateQRCode(content: QRContent, styling: QRStyling): string {
    const qr = QRCode(0, styling.errorCorrection);
    
    const dataString = this.contentToString(content);
    qr.addData(dataString);
    qr.make();
    
    return qr.createDataURL(10, styling.margin);
  }

  private static contentToString(content: QRContent): string {
    switch (content.type) {
      case 'text':
        return content.data as string;
      
      case 'url':
        let url = content.data as string;
        if (!url.startsWith('http')) url = 'https://' + url;
        return url;
      
      case 'email':
        const emailData = content.data as { address: string; subject?: string; body?: string };
        let emailString = `mailto:${emailData.address}`;
        const params = new URLSearchParams();
        if (emailData.subject) params.append('subject', emailData.subject);
        if (emailData.body) params.append('body', emailData.body);
        return emailString + (params.toString() ? `?${params}` : '');
      
      case 'phone':
        return `tel:${content.data}`;
      
      case 'wifi':
        const wifi = content.data as WiFiConfig;
        return `WIFI:S:${wifi.ssid};T:${wifi.encryption};P:${wifi.password};;`;
      
      case 'vcard':
        const vcard = content.data as VCardData;
        return this.generateVCard(vcard);
      
      case 'event':
        return this.generateEvent(content.data as any);
      
      default:
        return content.data as string;
    }
  }

  private static generateVCard(vcard: VCardData): string {
    return `BEGIN:VCARD
    VERSION:3.0
    FN:${vcard.firstName} ${vcard.lastName}
    EMAIL:${vcard.email}
    TEL:${vcard.phone}
    ORG:${vcard.company}
    TITLE:${vcard.title}
    URL:${vcard.website}
    ADR:${vcard.address}
    END:VCARD`;
  }

  private static generateEvent(event: any): string {
    return `BEGIN:VEVENT
SUMMARY:${event.title}
DTSTART:${event.start}
DTEND:${event.end}
LOCATION:${event.location}
DESCRIPTION:${event.description}
END:VEVENT`;
  }
}