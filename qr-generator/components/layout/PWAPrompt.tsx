"use client";

import React, { useState, useEffect } from 'react';
import { installPWA, checkPWA } from '../../lib/utils/pwa';

export const PWAPrompt: React.FC = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isPWA, setIsPWA] = useState(false);

  useEffect(() => {
    setIsPWA(checkPWA());
    
    // Check if PWA is already installed
    if (!checkPWA() && 'BeforeInstallPromptEvent' in window) {
      setShowPrompt(true);
    }

    // Listen for install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setShowPrompt(true);
    });
  }, []);

  const handleInstall = () => {
    installPWA();
    setShowPrompt(false);
  };

  if (isPWA || !showPrompt) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 border border-gray-200 dark:border-gray-700 max-w-sm">
      <div className="flex items-center space-x-3">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 dark:text-white">Install App</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Install for better experience and offline access
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleInstall}
            className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
          >
            Install
          </button>
          <button
            onClick={() => setShowPrompt(false)}
            className="px-3 py-1 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};