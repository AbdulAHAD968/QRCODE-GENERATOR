'use client';

import React, { useCallback, useEffect } from 'react';
import { QRConfigurator } from '../../components/qr/ContentForm';
import { QRPreview } from '../../components/qr/QRPreview';
import { DownloadControls } from '../../components/qr/DownloadControls';
import { useQRGenerator } from '../../hooks/useQRGenerator';
import { FaBolt, FaDownload, FaMagic, FaArrowLeft, FaCog } from 'react-icons/fa';
import Link from 'next/link';

export default function GeneratorPage() {
  const {
    content,
    setContent,
    styling,
    setStyling,
    qrCode,
    generateQR,
    generateQRAuto,
    isLoading,
    error,
    clearError,
  } = useQRGenerator();

  // Optimized auto-generation with proper content checking
  useEffect(() => {
    let mounted = true;

    const generateWithDelay = async () => {
      const hasValidContent = () => {
        if (!content.data) return false;

        if (typeof content.data === 'string') {
          return content.data.trim().length > 0;
        }

        switch (content.type) {
          case 'wifi':
            return (content.data as any).ssid?.trim().length > 0;
          case 'email':
            return (content.data as any).address?.trim().length > 0;
          case 'vcard':
            const vcard = content.data as any;
            return (
              vcard.firstName?.trim().length > 0 ||
              vcard.lastName?.trim().length > 0
            );
          case 'event':
            return (content.data as any).title?.trim().length > 0;
          default:
            return true;
        }
      };

      if (!hasValidContent()) return;

      await new Promise(resolve => setTimeout(resolve, 800));
      if (mounted) {
        await generateQRAuto();
      }
    };

    generateWithDelay();
    return () => {
      mounted = false;
    };
  }, [content, styling, generateQRAuto]);

  const handleManualGenerate = useCallback(async () => {
    await generateQR();
  }, [generateQR]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <FaArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>

            <div className="flex items-center space-x-2">
              <FaMagic className="text-2xl text-blue-600 dark:text-blue-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                QRMagic
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6">
        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-xl flex justify-between items-center shadow-lg animate-fade-in">
            <span className="flex items-center space-x-2">
              <FaBolt className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm sm:text-base">{error}</span>
            </span>
            <button
              onClick={clearError}
              className="text-red-700 hover:text-red-900 font-bold text-lg ml-4 transition-colors"
              aria-label="Close error message"
            >
              ×
            </button>
          </div>
        )}

        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-700 dark:from-white dark:to-blue-400 bg-clip-text text-transparent mb-3">
            QR Code Generator
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
            Create and customize your QR code in real-time with instant preview
          </p>
        </header>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Configuration */}
          <div className="space-y-6">
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-200 hover:shadow-xl">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-xl">
                    <FaBolt className="text-blue-600 dark:text-blue-400 text-lg" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      QR Code Configuration
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                      Configure content and design settings
                    </p>
                  </div>
                </div>
                <QRConfigurator content={content} onContentChange={setContent} />
              </div>
            </section>

            {/* Manual Generate Button */}
            <div className="flex justify-center">
              <button
                onClick={handleManualGenerate}
                disabled={isLoading || !content.data}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 flex items-center gap-2 shadow-lg disabled:cursor-not-allowed"
              >
                <FaBolt className={isLoading ? 'animate-spin' : ''} />
                {isLoading ? 'Generating...' : 'Generate QR Code'}
              </button>
            </div>
          </div>

          {/* Right Column - Preview & Download */}
          <div className="space-y-6 lg:sticky lg:top-24 h-fit">
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-200 hover:shadow-xl">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-xl">
                    <FaDownload className="text-green-600 dark:text-green-400 text-lg" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Preview & Download
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-xs">
                      Real-time preview and export options
                    </p>
                  </div>
                </div>

                <div className="flex justify-center mb-6">
                  <QRPreview
                    qrCode={qrCode}
                    size={Math.min(styling.size, 280)}
                    isLoading={isLoading}
                    className="w-full"
                  />
                </div>

                <DownloadControls
                  qrCode={qrCode}
                  styling={styling}
                  isLoading={isLoading}
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
