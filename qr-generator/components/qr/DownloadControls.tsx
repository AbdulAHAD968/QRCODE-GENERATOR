import React from 'react';
import { QRStyling } from '../../types';
import { downloadQRCode } from '../../lib/utils/download';
import { FaFileImage, FaDrawPolygon, FaFilePdf, FaShareAlt, FaDownload } from 'react-icons/fa';

interface DownloadControlsProps {
  qrCode: string;
  styling: QRStyling;
  isLoading?: boolean;
}

export const DownloadControls: React.FC<DownloadControlsProps> = ({
  qrCode,
  styling,
  isLoading = false,
}) => {
  const handleDownload = async (format: 'PNG' | 'SVG' | 'PDF') => {
    if (!qrCode) {
      alert('Please generate a QR code first');
      return;
    }

    try {
      await downloadQRCode(qrCode, format, styling);
    } catch (error) {
      console.error('Download failed:', error);
      
      // Fallback to alternative download if main function fails
      await handleAlternativeDownload(format);
    }
  };

  // Alternative download implementation
  const handleAlternativeDownload = async (format: 'PNG' | 'SVG' | 'PDF') => {
    if (!qrCode) return;

    try {
      if (format === 'PNG') {
        // PNG download
        const link = document.createElement('a');
        link.href = qrCode;
        link.download = `qrcode-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (format === 'SVG') {
        // Simple SVG download using the PNG image
        const svgContent = generateSimpleSVG(qrCode);
        downloadSVG(svgContent, `qrcode-${Date.now()}.svg`);
      } else if (format === 'PDF') {
        // PDF generation
        await generatePDF(qrCode);
      }
    } catch (error) {
      console.error('Alternative download failed:', error);
      alert('Download failed. Please try again.');
    }
  };

  const generateSimpleSVG = (qrCodeUrl: string): string => {
    // Create a simple SVG wrapper around the PNG image
    return `
      <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <image href="${qrCodeUrl}" width="200" height="200" />
      </svg>
    `.trim();
  };

  const downloadSVG = (svgContent: string, filename: string) => {
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const generatePDF = async (qrCodeUrl: string) => {
    try {
      // Dynamically import jsPDF
      const { default: jsPDF } = await import('jspdf');
      
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      
      // Add title
      pdf.setFontSize(16);
      pdf.text('QR Code', pageWidth / 2, 20, { align: 'center' });

      // Convert QR code to image data
      const imgData = await urlToImageData(qrCodeUrl);
      
      // Add QR code image (max width 150px, centered)
      const imgWidth = 150;
      const x = (pageWidth - imgWidth) / 2;
      pdf.addImage(imgData, 'PNG', x, 30, imgWidth, imgWidth);

      pdf.save(`qrcode-${Date.now()}.pdf`);
    } catch (error) {
      console.error('PDF generation failed:', error);
      throw error;
    }
  };

  const urlToImageData = (url: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL('image/png'));
        } else {
          reject(new Error('Could not get canvas context'));
        }
      };
      img.onerror = reject;
      img.src = url;
    });
  };

  const handleShare = async () => {
    if (!qrCode) return;

    try {
      if (navigator.share) {
        const response = await fetch(qrCode);
        const blob = await response.blob();
        const file = new File([blob], 'qrcode.png', { type: 'image/png' });

        await navigator.share({
          title: 'QR Code',
          text: 'Check out this QR code I generated',
          files: [file],
        });
      } else {
        handleDownload('PNG');
      }
    } catch (error) {
      console.error('Share failed:', error);
      handleDownload('PNG');
    }
  };

  const downloadOptions: {
    format: 'PNG' | 'SVG' | 'PDF';
    label: string;
    description: string;
    icon: React.ReactNode;
    color: string;
  }[] = [
    {
      format: 'PNG',
      label: 'PNG',
      description: 'High quality image',
      icon: <FaFileImage className="w-5 h-5" />,
      color: 'from-blue-500 to-blue-600',
    },
    {
      format: 'SVG',
      label: 'SVG',
      description: 'Scalable vector',
      icon: <FaDrawPolygon className="w-5 h-5" />,
      color: 'from-purple-500 to-purple-600',
    },
    {
      format: 'PDF',
      label: 'PDF',
      description: 'Document ready',
      icon: <FaFilePdf className="w-5 h-5" />,
      color: 'from-red-500 to-red-600',
    },
  ];

  const isDisabled = !qrCode || isLoading;

  return (
    <div className="mt-8 space-y-6">
      <div className="text-center">
        <h4 className="font-bold text-xl text-gray-900 dark:text-gray-100 mb-2 flex items-center justify-center gap-2">
          <FaDownload className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          Download Options
        </h4>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Choose your preferred format
        </p>
      </div>

      {/* Download Buttons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {downloadOptions.map((option) => (
          <button
            key={option.format}
            onClick={() => handleDownload(option.format)}
            disabled={isDisabled}
            className={`
              group relative flex flex-col items-center justify-center p-4 rounded-2xl
              bg-gradient-to-br ${option.color} text-white font-medium
              shadow-lg hover:shadow-xl transform hover:scale-105
              disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed
              disabled:transform-none disabled:shadow-md
              transition-all duration-300 ease-out
              min-h-[100px]
            `}
          >
            <div className="mb-3 p-3 bg-white/20 rounded-2xl group-hover:bg-white/30 transition-colors">
              {option.icon}
            </div>
            <span className="font-semibold text-sm mb-1">{option.label}</span>
            <span className="text-white/80 text-xs">{option.description}</span>
            <div className="absolute inset-0 rounded-2xl border-2 border-white/20 group-hover:border-white/40 transition-colors" />
          </button>
        ))}
      </div>

      {/* Share Button */}
      <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleShare}
          disabled={isDisabled}
          className={`
            inline-flex items-center space-x-3 px-6 py-3 rounded-full font-medium
            bg-gradient-to-r from-green-500 to-emerald-600 text-white
            shadow-lg hover:shadow-xl transform hover:scale-105
            disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed
            disabled:transform-none disabled:shadow-md
            transition-all duration-300
          `}
        >
          <FaShareAlt className="w-4 h-4" />
          <span>Share QR Code</span>
        </button>

        {isDisabled && (
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-3">
            {isLoading ? 'Generating QR code...' : 'Generate a QR code to enable downloads'}
          </p>
        )}
      </div>
    </div>
  );
};