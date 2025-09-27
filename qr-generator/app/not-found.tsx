'use client';

import React from 'react';
import Link from 'next/link';
import { FaMagic, FaHome, FaArrowLeft, FaSearch, FaExclamationTriangle } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <div className="text-9xl font-bold text-gray-300 dark:text-gray-700 relative">
            4
            <span className="absolute inset-0 text-blue-600 dark:text-blue-400 animate-pulse">0</span>
            4
          </div>
          <div className="absolute -top-4 -right-4">
            <FaExclamationTriangle className="text-6xl text-yellow-500 animate-bounce" />
          </div>
        </div>

        {/* Content */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-2xl">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <FaMagic className="text-3xl text-white" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Page Not Found
          </h1>
          
          <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back to creating amazing QR codes.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/"
              className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
            >
              <FaHome className="group-hover:scale-110 transition-transform" />
              <span>Back to Home</span>
            </Link>
            
            <button 
              onClick={() => window.history.back()}
              className="group border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-semibold hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              <span>Go Back</span>
            </button>
          </div>

          {/* Quick Links */}
          <div className="mt-8 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Quick Links</p>
            <div className="flex justify-center space-x-4">
              <Link 
                href="/generator" 
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-300 text-sm font-medium cursor-pointer flex items-center space-x-1"
              >
                <FaMagic className="text-xs" />
                <span>QR Generator</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}