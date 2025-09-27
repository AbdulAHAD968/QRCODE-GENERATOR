import React, { useState, useEffect } from 'react';
import { QRContent, WiFiConfig, VCardData, EmailData, EventData } from '../../types';
import { 
  FaTextWidth, 
  FaLink, 
  FaEnvelope, 
  FaPhone, 
  FaWifi, 
  FaAddressCard, 
  FaCalendarAlt,
  FaGlobe,
} from 'react-icons/fa';

interface QRConfiguratorProps {
  content: QRContent;
  onContentChange: (content: QRContent) => void;
}

export const QRConfigurator: React.FC<QRConfiguratorProps> = ({
  content,
  onContentChange
}) => {
  const [wifiConfig, setWifiConfig] = useState<WiFiConfig>({
    ssid: '',
    password: '',
    encryption: 'WPA'
  });

  const [vcardData, setVcardData] = useState<VCardData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    title: '',
    website: '',
    address: ''
  });

  const [emailData, setEmailData] = useState<EmailData>({
    address: '',
    subject: '',
    body: ''
  });

  const [eventData, setEventData] = useState<EventData>({
    title: '',
    description: '',
    location: '',
    startTime: '',
    endTime: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  });

  // Initialize form data when content type changes
  useEffect(() => {
    if (content.data && typeof content.data === 'object') {
      switch (content.type) {
        case 'wifi':
          setWifiConfig(content.data as WiFiConfig);
          break;
        case 'vcard':
          setVcardData(content.data as VCardData);
          break;
        case 'email':
          setEmailData(content.data as EmailData);
          break;
        case 'event':
          setEventData(content.data as EventData);
          break;
      }
    }
  }, [content.type]);

  const contentTypes: { 
    value: QRContent['type']; 
    label: string; 
    icon: React.ReactNode; 
  }[] = [
    { value: 'text', label: 'Text', icon: <FaTextWidth /> },
    { value: 'url', label: 'URL', icon: <FaLink /> },
    { value: 'email', label: 'Email', icon: <FaEnvelope /> },
    { value: 'phone', label: 'Phone', icon: <FaPhone /> },
    { value: 'wifi', label: 'WiFi', icon: <FaWifi /> },
    { value: 'vcard', label: 'Contact', icon: <FaAddressCard /> },
    { value: 'event', label: 'Event', icon: <FaCalendarAlt /> }
  ];



  const handleContentTypeChange = (type: QRContent['type']) => {
    let initialData: string | Record<string, any> = '';
    
    switch (type) {
      case 'wifi':
        initialData = { ssid: '', password: '', encryption: 'WPA' };
        break;
      case 'vcard':
        initialData = { 
          firstName: '', 
          lastName: '', 
          email: '', 
          phone: '', 
          company: '', 
          title: '', 
          website: '', 
          address: '' 
        };
        break;
      case 'email':
        initialData = { address: '', subject: '', body: '' };
        break;
      case 'event':
        initialData = { 
          title: '', 
          description: '', 
          location: '', 
          startTime: '', 
          endTime: '', 
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone 
        };
        break;
      default:
        initialData = '';
    }
    
    onContentChange({ type, data: initialData });
  };

  const renderContentForm = () => {
    switch (content.type) {
      case 'text':
        return (
          <div className="space-y-3">
            <textarea
              value={content.data as string}
              onChange={(e) => onContentChange({ ...content, data: e.target.value })}
              placeholder="Enter text to encode..."
              className="w-full h-24 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500">Characters: {(content.data as string)?.length || 0}</p>
          </div>
        );
      
      case 'url':
        return (
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaGlobe className="text-gray-400" />
            </div>
            <input
              type="url"
              value={content.data as string}
              onChange={(e) => onContentChange({ ...content, data: e.target.value })}
              placeholder="https://example.com"
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        );
      
      case 'email':
        return (
          <div className="space-y-3">
            <input
              type="email"
              value={emailData.address}
              onChange={(e) => {
                const newData = { ...emailData, address: e.target.value };
                setEmailData(newData);
                onContentChange({ ...content, data: newData });
              }}
              placeholder="recipient@example.com"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={emailData.subject}
              onChange={(e) => {
                const newData = { ...emailData, subject: e.target.value };
                setEmailData(newData);
                onContentChange({ ...content, data: newData });
              }}
              placeholder="Subject (optional)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              value={emailData.body}
              onChange={(e) => {
                const newData = { ...emailData, body: e.target.value };
                setEmailData(newData);
                onContentChange({ ...content, data: newData });
              }}
              placeholder="Email body (optional)"
              rows={2}
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        );
      
      case 'phone':
        return (
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaPhone className="text-gray-400" />
            </div>
            <input
              type="tel"
              value={content.data as string}
              onChange={(e) => onContentChange({ ...content, data: e.target.value })}
              placeholder="+1234567890"
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        );
      
      case 'wifi':
        return (
          <div className="space-y-3">
            <input
              type="text"
              value={wifiConfig.ssid}
              onChange={(e) => {
                const newConfig = { ...wifiConfig, ssid: e.target.value };
                setWifiConfig(newConfig);
                onContentChange({ ...content, data: newConfig });
              }}
              placeholder="Network name (SSID)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              value={wifiConfig.password}
              onChange={(e) => {
                const newConfig = { ...wifiConfig, password: e.target.value };
                setWifiConfig(newConfig);
                onContentChange({ ...content, data: newConfig });
              }}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={wifiConfig.encryption}
              onChange={(e) => {
                const newConfig = { ...wifiConfig, encryption: e.target.value as any };
                setWifiConfig(newConfig);
                onContentChange({ ...content, data: newConfig });
              }}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="WPA">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">No Encryption</option>
            </select>
          </div>
        );
      
      case 'vcard':
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="First Name"
                value={vcardData.firstName}
                onChange={(e) => {
                  const newData = { ...vcardData, firstName: e.target.value };
                  setVcardData(newData);
                  onContentChange({ ...content, data: newData });
                }}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={vcardData.lastName}
                onChange={(e) => {
                  const newData = { ...vcardData, lastName: e.target.value };
                  setVcardData(newData);
                  onContentChange({ ...content, data: newData });
                }}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              value={vcardData.email}
              onChange={(e) => {
                const newData = { ...vcardData, email: e.target.value };
                setVcardData(newData);
                onContentChange({ ...content, data: newData });
              }}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={vcardData.phone}
              onChange={(e) => {
                const newData = { ...vcardData, phone: e.target.value };
                setVcardData(newData);
                onContentChange({ ...content, data: newData });
              }}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        );
      
      case 'event':
        return (
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Event Title"
              value={eventData.title}
              onChange={(e) => {
                const newData = { ...eventData, title: e.target.value };
                setEventData(newData);
                onContentChange({ ...content, data: newData });
              }}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Description (optional)"
              value={eventData.description}
              onChange={(e) => {
                const newData = { ...eventData, description: e.target.value };
                setEventData(newData);
                onContentChange({ ...content, data: newData });
              }}
              rows={2}
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="datetime-local"
                value={eventData.startTime}
                onChange={(e) => {
                  const newData = { ...eventData, startTime: e.target.value };
                  setEventData(newData);
                  onContentChange({ ...content, data: newData });
                }}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="datetime-local"
                value={eventData.endTime}
                onChange={(e) => {
                  const newData = { ...eventData, endTime: e.target.value };
                  setEventData(newData);
                  onContentChange({ ...content, data: newData });
                }}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );
      
      default:
        return <div className="text-center py-6 text-gray-500">Select a content type to begin</div>;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="space-y-4">
        {/* Content Type Selection */}
        <div>
          <label className="text-sm font-medium mb-3 block">Content Type</label>
          <div className="grid grid-cols-4 gap-2">
            {contentTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => handleContentTypeChange(type.value)}
                className={`p-2 rounded border text-xs flex flex-col items-center gap-1 transition-colors ${
                  content.type === type.value
                    ? 'border-blue-500 bg-blue-50 text-blue-600'
                    : 'border-gray-300 text-gray-600 hover:border-gray-400'
                }`}
              >
                <span className="text-base">{type.icon}</span>
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Form */}
        <div className="pt-4 border-t">{renderContentForm()}</div>
      </div>
    </div>
  );
};
