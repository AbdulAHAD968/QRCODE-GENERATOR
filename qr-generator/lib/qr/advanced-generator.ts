import { QRContent, QRStyling } from '../../types';

export class AdvancedQRGenerator {
  static async generateQRWithLogo(content: QRContent, styling: QRStyling): Promise<string> {
    const canvas = document.createElement('canvas');
    const size = styling.size;
    canvas.width = size;
    canvas.height = size;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');

    // Create basic QR code
    const qrDataURL = this.generateBasicQR(content, styling);
    
    return new Promise((resolve) => {
      const qrImage = new Image();
      qrImage.onload = async () => {
        // Draw QR code
        ctx.drawImage(qrImage, 0, 0, size, size);
        
        // Add logo if provided
        if (styling.logo) {
          await this.addLogoToCanvas(ctx, styling.logo as File, size);
        }
        
        resolve(canvas.toDataURL('image/png'));
      };
      qrImage.src = qrDataURL;
    });
  }

  private static generateBasicQR(content: QRContent, styling: QRStyling): string {
    // Use the basic generator from earlier
    const QRCode = require('qrcode-generator');
    const qr = QRCode(0, styling.errorCorrection);
    
    // ... existing generation logic
    return qr.createDataURL(10, styling.margin);
  }

  private static async addLogoToCanvas(ctx: CanvasRenderingContext2D, logoFile: File, qrSize: number): Promise<void> {
    return new Promise((resolve) => {
      const logoSize = qrSize / 4; // Logo size is 25% of QR code
      const logoX = (qrSize - logoSize) / 2;
      const logoY = (qrSize - logoSize) / 2;

      const logoImage = new Image();
      logoImage.onload = () => {
        // Draw white background for logo
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(logoX - 2, logoY - 2, logoSize + 4, logoSize + 4);
        
        // Draw logo
        ctx.drawImage(logoImage, logoX, logoY, logoSize, logoSize);
        resolve();
      };
      
      logoImage.src = URL.createObjectURL(logoFile);
    });
  }
}