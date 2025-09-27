'use client';

import React from 'react';
import Link from 'next/link';
import { FaMagic, FaBolt, FaPalette, FaDownload, FaRocket, FaStar, FaArrowRight, FaGithub, FaLinkedinIn, FaIdCard, FaChartLine, FaTicketAlt, FaBox, FaLinkedin } from 'react-icons/fa';
import { FiShield } from 'react-icons/fi';

export default function LandingPage() {
  // Get current year for footer
  const currentYear = new Date().getFullYear();

  const features = [
    {
      icon: FaMagic,
      title: 'AI-Powered Generation',
      description: 'Smart QR code generation with optimal settings for each use case',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-gradient-to-r from-purple-500 to-pink-500'
    },
    {
      icon: FaPalette,
      title: 'Fully Customizable',
      description: 'Colors, shapes, and styles to match your brand identity',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-gradient-to-r from-blue-500 to-cyan-500'
    },
    {
      icon: FaDownload,
      title: 'Multiple Formats',
      description: 'Download in PNG, SVG, PDF with high-resolution quality',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-gradient-to-r from-green-500 to-emerald-500'
    },
    {
      icon: FiShield,
      title: 'Privacy First',
      description: 'No data stored on servers. Everything happens in your browser',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-gradient-to-r from-orange-500 to-red-500'
    },
    {
      icon: FaBolt,
      title: 'Lightning Fast',
      description: 'Generate QR codes instantly with real-time preview',
      color: 'from-yellow-500 to-amber-500',
      bgColor: 'bg-gradient-to-r from-yellow-500 to-amber-500'
    },
    {
      icon: FaRocket,
      title: 'Enterprise Ready',
      description: 'Advanced features for business and marketing use',
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-gradient-to-r from-indigo-500 to-purple-500'
    }
  ];

  const useCases = [
    {
      title: 'Business Cards',
      description: 'Create professional QR codes for contact sharing',
      icon: FaIdCard
    },
    {
      title: 'Marketing Materials',
      description: 'Enhance your campaigns with scannable codes',
      icon: FaChartLine
    },
    {
      title: 'Event Tickets',
      description: 'Generate secure QR codes for event access',
      icon: FaTicketAlt
    },
    {
      title: 'Product Packaging',
      description: 'Add interactive experiences to your products',
      icon: FaBox
    }
  ];

  const stats = [
    { value: '10,000+', label: 'Active Users' },
    { value: '500K+', label: 'QR Codes Generated' },
    { value: '99.9%', label: 'Uptime' },
    { value: '4.9/5', label: 'User Rating' }
  ];

  // Function to scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-100/50 dark:from-gray-900 dark:via-blue-950/50 dark:to-indigo-950/50">
      
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
              <FaMagic className="text-2xl text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              QRMagic
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => scrollToSection('features')}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 font-medium cursor-pointer hover:scale-105"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('use-cases')}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 font-medium cursor-pointer hover:scale-105"
            >
              Use Cases
            </button>
            <Link 
              href="/generator" 
              className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer group overflow-hidden"
            >
              <span className="relative z-10">Start Creating</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-gray-200/50 dark:border-gray-700/50 shadow-sm cursor-default">
            <FaStar className="text-yellow-500 animate-pulse" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Trusted by 10,000+ users worldwide
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Create{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              Beautiful QR Codes
            </span>
            <br />
            in Seconds
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            The most advanced QR code generator with AI-powered optimization, 
            custom branding, and enterprise-grade features.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link 
              href="/generator"
              className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl flex items-center space-x-2 cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              <span className="relative z-10">Start Creating Free</span>
              <FaArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-4 cursor-default">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Everything you need to create professional QR codes that match your brand
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:border-transparent transition-all duration-300 hover:shadow-2xl cursor-pointer transform hover:-translate-y-2"
            >
              <div className={`inline-flex p-3 rounded-2xl ${feature.bgColor} mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <feature.icon className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Perfect For Every Need
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Various applications across industries and use cases
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase, index) => (
            <div 
              key={index} 
              className="group text-center p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
            >
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 flex items-center justify-center group-hover:from-blue-600 group-hover:to-purple-700 transition-all duration-300">
                <useCase.icon className="text-white text-2xl" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {useCase.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl p-12 border border-blue-200/50 dark:border-blue-700/50">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Ready to Create Your QR Code?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of users who trust our platform for their QR code needs
          </p>
          <Link 
            href="/generator"
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-2xl cursor-pointer group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            <FaMagic className="relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            <span className="relative z-10">Start Generating Now</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200/50 dark:border-gray-800/50 mt-20 bg-white/30 dark:bg-gray-900/30 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-10">
          {/* Top Section */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Logo + Brand */}
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg shadow-blue-500/10">
                <FaMagic className="text-xl text-white" />
              </div>
              <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                QRMagic
              </span>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-6">
              <Link 
                href="https://www.linkedin.com/in/abdulahad-zarinc/" 
                className="text-gray-500 hover:text-blue-500 transition-transform duration-300 transform hover:scale-125"
                aria-label="Twitter"
              >
                <FaLinkedinIn className="text-xl" />
              </Link>
              <Link 
                href="https://github.com/AbdulAHAD968" 
                className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-200 transition-transform duration-300 transform hover:scale-125"
                aria-label="GitHub"
              >
                <FaGithub className="text-xl" />
              </Link>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200/50 dark:border-gray-700/50 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600 dark:text-gray-400">
            {/* Copyright */}
            <div className="text-center md:text-left">
              © {new Date().getFullYear()} QRMagic. All rights reserved.
            </div>

            {/* Footer Links */}
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}