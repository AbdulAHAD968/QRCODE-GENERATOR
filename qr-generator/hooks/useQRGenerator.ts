import { useState, useCallback, useRef } from 'react';
import { QRContent, QRStyling, QRHistoryItem } from '../types';
import { QRGenerator } from '../lib/qr/generator';
import { useStorage } from './useStorage';

export const useQRGenerator = () => {
  const [content, setContent] = useState<QRContent>({ type: 'text', data: '' });
  const [styling, setStyling] = useState<QRStyling>({
    foreground: '#000000',
    background: '#ffffff',
    transparent: false,
    errorCorrection: 'M',
    size: 256,
    margin: 4
  });
  
  const [qrCode, setQrCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const { addToHistory, history } = useStorage();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastGeneratedRef = useRef<string>(''); // Track last generated content to prevent duplicates

  const generateQR = useCallback((newContent?: QRContent, newStyling?: QRStyling) => {
    const currentContent = newContent || content;
    const currentStyling = newStyling || styling;

    // Validate content
    if (!currentContent.data || 
        (typeof currentContent.data === 'string' && !currentContent.data.trim())) {
      setQrCode('');
      setIsLoading(false);
      return;
    }

    // Create a unique key for this QR configuration to prevent duplicates
    const configKey = JSON.stringify({
      content: currentContent,
      styling: currentStyling
    });

    // Skip if this exact configuration was just generated
    if (lastGeneratedRef.current === configKey) {
      setIsLoading(false);
      return;
    }

    // Clear any existing debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    setIsLoading(true);
    setError(null);

    debounceRef.current = setTimeout(() => {
      try {
        const qrDataURL = QRGenerator.generateQRCode(currentContent, currentStyling);
        setQrCode(qrDataURL);
        
        // Update last generated reference
        lastGeneratedRef.current = configKey;

        // Auto-save to history if valid content (with duplicate prevention)
        if (currentContent.data && 
            (typeof currentContent.data === 'string' ? currentContent.data.trim() : true)) {
          
          const historyItem: QRHistoryItem = {
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`, // More unique ID
            content: currentContent,
            styling: currentStyling,
            timestamp: Date.now(),
            title: generateTitle(currentContent)
          };
          
          addToHistory(historyItem);
        }
        
        setError(null);
      } catch (error) {
        console.error('QR generation failed:', error);
        setError('Failed to generate QR code. Please try again.');
        setQrCode('');
      } finally {
        setIsLoading(false);
      }
    }, 300);
  }, [content, styling, addToHistory]);

  // Immediate QR generation without debounce (for manual triggers)
  const generateQRImmediate = useCallback((newContent?: QRContent, newStyling?: QRStyling) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    const currentContent = newContent || content;
    const currentStyling = newStyling || styling;

    // Validate content
    if (!currentContent.data || 
        (typeof currentContent.data === 'string' && !currentContent.data.trim())) {
      setQrCode('');
      setIsLoading(false);
      return;
    }

    // Create a unique key for this QR configuration
    const configKey = JSON.stringify({
      content: currentContent,
      styling: currentStyling
    });

    // Skip if this exact configuration was just generated
    if (lastGeneratedRef.current === configKey) {
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const qrDataURL = QRGenerator.generateQRCode(currentContent, currentStyling);
      setQrCode(qrDataURL);
      
      // Update last generated reference
      lastGeneratedRef.current = configKey;
      
      // Auto-save to history with duplicate prevention
      if (currentContent.data && 
          (typeof currentContent.data === 'string' ? currentContent.data.trim() : true)) {
        const historyItem: QRHistoryItem = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          content: currentContent,
          styling: currentStyling,
          timestamp: Date.now(),
          title: generateTitle(currentContent)
        };
        addToHistory(historyItem);
      }
      
      setError(null);
    } catch (error) {
      console.error('QR generation failed:', error);
      setError('Failed to generate QR code. Please try again.');
      setQrCode('');
    } finally {
      setIsLoading(false);
    }
  }, [content, styling, addToHistory]);

  const generateTitle = (qrContent: QRContent): string => {
    switch (qrContent.type) {
      case 'text': 
        return `Text: ${(qrContent.data as string).slice(0, 30)}${(qrContent.data as string).length > 30 ? '...' : ''}`;
      case 'url': 
        try {
          return `URL: ${new URL(qrContent.data as string).hostname}`;
        } catch {
          return `URL: ${(qrContent.data as string).slice(0, 30)}...`;
        }
      case 'email': 
        return `Email: ${(qrContent.data as any).address}`;
      case 'phone': 
        return `Phone: ${qrContent.data as string}`;
      case 'wifi': 
        return `WiFi: ${(qrContent.data as any).ssid}`;
      case 'vcard': 
        return `Contact: ${(qrContent.data as any).firstName} ${(qrContent.data as any).lastName || ''}`.trim();
      case 'event': 
        return `Event: ${(qrContent.data as any).title}`;
      default: 
        return 'QR Code';
    }
  };

  // Clear error manually
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Reset generator to initial state
  const resetGenerator = useCallback(() => {
    setContent({ type: 'text', data: '' });
    setStyling({
      foreground: '#000000',
      background: '#ffffff',
      transparent: false,
      errorCorrection: 'M',
      size: 256,
      margin: 4
    });
    setQrCode('');
    setError(null);
    setIsLoading(false);
    lastGeneratedRef.current = '';
    
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
  }, []);

  // Update content without auto-generating (for form controls)
  const updateContent = useCallback((newContent: QRContent) => {
    setContent(newContent);
  }, []);

  // Update styling without auto-generating (for form controls)
  const updateStyling = useCallback((newStyling: QRStyling) => {
    setStyling(newStyling);
  }, []);

  return {
    content,
    setContent: updateContent, // Don't auto-generate on content change
    styling,
    setStyling: updateStyling, // Don't auto-generate on styling change
    qrCode,
    generateQR: generateQRImmediate, // Manual generation
    generateQRAuto: generateQR, // Auto-generation with debounce
    isLoading,
    error,
    clearError,
    resetGenerator,
    history
  };
};