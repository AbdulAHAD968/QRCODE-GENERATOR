export interface QRContent {
  type: 'text' | 'url' | 'email' | 'phone' | 'wifi' | 'vcard' | 'event';
  data: string | Record<string, any>;
}

export interface QRStyling {
  foreground: string;
  background: string;
  transparent: boolean;
  errorCorrection: 'L' | 'M' | 'Q' | 'H';
  size: number;
  margin: number;
  logo?: File | null;
}

export interface QRHistoryItem {
  id: string;
  content: QRContent;
  styling: QRStyling;
  timestamp: number;
  title?: string;
}

export interface WiFiConfig {
  ssid: string;
  password: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
}

export interface VCardData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  title: string;
  website: string;
  address: string;
}

export interface EmailData {
  address: string;
  subject: string;
  body: string;
}

export interface EventData {
  title: string;
  description: string;
  location: string;
  startTime: string;
  endTime: string;
  timezone: string;
}
