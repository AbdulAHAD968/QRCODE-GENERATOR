import { QRStyling } from '../../types';

export const downloadQRCode = async (qrDataURL: string, format: 'PNG' | 'SVG' | 'PDF', styling: QRStyling) => {
  switch (format) {
    case 'PNG':
      await downloadPNG(qrDataURL);
      break;
    case 'SVG':
      await downloadSVG(qrDataURL, styling);
      break;
    case 'PDF':
      await downloadPDF(qrDataURL, styling);
      break;
  }
};

const downloadPNG = (qrDataURL: string) => {
  const link = document.createElement('a');
  link.download = `qrcode-${Date.now()}.png`;
  link.href = qrDataURL;
  link.click();
};

const downloadSVG = async (qrDataURL: string, styling: QRStyling) => {
  // Convert PNG data URL to SVG (simplified version)
  const svgContent = `
    <svg width="${styling.size}" height="${styling.size}" xmlns="http://www.w3.org/2000/svg">
      <image href="${qrDataURL}" width="100%" height="100%"/>
    </svg>
  `;
  
  const blob = new Blob([svgContent], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.download = `qrcode-${Date.now()}.svg`;
  link.href = url;
  link.click();
  
  URL.revokeObjectURL(url);
};

const downloadPDF = async (qrDataURL: string, styling: QRStyling) => {
  // Simple PDF generation using jsPDF (you'll need to install it)
  try {
    // @ts-ignore - Dynamic import for optional dependency
    const { jsPDF } = await import('jspdf');
    
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    
    // Add QR code (resize to fit page)
    const qrSize = Math.min(pageWidth * 0.8, styling.size);
    const x = (pageWidth - qrSize) / 2;
    
    pdf.addImage(qrDataURL, 'PNG', x, 40, qrSize, qrSize);
    pdf.text('Generated QR Code', pageWidth / 2, 30, { align: 'center' });
    
    pdf.save(`qrcode-${Date.now()}.pdf`);
  } catch (error) {
    // Fallback to PNG if PDF generation fails
    console.warn('PDF generation failed, falling back to PNG');
    downloadPNG(qrDataURL);
  }
};