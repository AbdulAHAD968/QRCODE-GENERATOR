'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaMagic, FaShieldAlt, FaUserLock, FaDatabase, FaCode, FaHome } from 'react-icons/fa';
import { FiArrowLeft, FiCheckCircle } from 'react-icons/fi';

export default function PrivacyPolicy() {
  const [lastUpdated, setLastUpdated] = useState("September 1, 2025");
  const [currentYear, setCurrentYear] = useState("2025");

  useEffect(() => {
    // Auto-fetch current year
    const year = new Date().getFullYear().toString();
    setCurrentYear(year);
    
    // Auto-update last updated date to current year while keeping month/day
    const now = new Date();
    const month = now.toLocaleString('en-US', { month: 'long' });
    const day = now.getDate();
    setLastUpdated(`${month} ${day}, ${year}`);
  }, []);

  const sections = [
    {
      icon: FaShieldAlt,
      title: "Information We Collect",
      content: "QRMagic operates on a privacy-first principle. We do not collect, store, or process any personal data on our servers. All QR code generation happens locally in your browser."
    },
    {
      icon: FaUserLock,
      title: "Data Processing",
      content: "Your QR code data (URLs, text, contact information) is processed entirely on your device. We never transmit this data to our servers or third-party services."
    },
    {
      icon: FaDatabase,
      title: "Data Storage",
      content: "No user data is stored on our servers. Any temporary data required for QR code generation is kept in your browser's local storage and can be cleared at any time."
    },
    {
      icon: FaCode,
      title: "Third-Party Services",
      content: "We use minimal, privacy-respecting analytics to understand usage patterns. These services collect anonymized data that cannot be traced back to individual users."
    }
  ];

  const principles = [
    "No data collection without explicit consent",
    "Local processing of all QR code data",
    "Transparent about what little data we collect",
    "Regular security audits and updates",
    "Compliance with global privacy regulations"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950">
      {/* Header */}
      <header className="border-b border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Link href="/" className="flex items-center space-x-3 group cursor-pointer w-full sm:w-auto">
              <FiArrowLeft className="text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" />
              <div className="flex items-center space-x-2">
                <FaMagic className="text-2xl text-blue-600 dark:text-blue-400" />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  QRMagic
                </span>
              </div>
            </Link>
            <div className="text-sm text-gray-500 dark:text-gray-400 w-full sm:w-auto text-right sm:text-left">
              Last updated: {lastUpdated}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-10 max-w-5xl">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-xl sm:shadow-2xl">
          
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10">
            <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center">
              <FaShieldAlt className="text-xl sm:text-2xl text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Privacy Policy
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
              Your privacy is our top priority. Here's how we protect it.
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">Our Commitment</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
              At QRMagic, we believe in building trust through transparency. We've designed our 
              platform with privacy as a fundamental principle, not an afterthought.
            </p>
          </section>

          {/* Privacy Principles */}
          <section className="mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">Privacy Principles</h2>
            <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
              {principles.map((principle, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50/50 dark:bg-blue-900/20 rounded-lg">
                  <FiCheckCircle className="text-green-500 flex-shrink-0 text-sm sm:text-base" />
                  <span className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">{principle}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Detailed Sections in Grid */}
          <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2">
            {sections.map((section, index) => (
              <section key={index} className="group cursor-pointer">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg sm:rounded-xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <section.icon className="text-white text-lg sm:text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {section.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                      {section.content}
                    </p>
                  </div>
                </div>
              </section>
            ))}
          </div>

          {/* Contact */}
          <section className="mt-10 sm:mt-12 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">Questions?</h2>
            <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
              If you have any questions about our privacy practices, contact us at{' '}
              <Link href="mailto:privacy@qrmagic.app" className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                ab.zarinc@gmail.com
              </Link>
            </p>
          </section>

          {/* Copyright */}
          <section className="mt-6 pt-4 border-t border-gray-200/30 dark:border-gray-700/30">
            <p className="text-center text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
              © {currentYear} QRMagic. All rights reserved.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200/50 dark:border-gray-700/50 mt-6 sm:mt-8 bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 text-center">
          <Link href="/" className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 cursor-pointer text-sm sm:text-base">
            <FaHome className="text-sm sm:text-base" />
            <span>Back to Home</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}