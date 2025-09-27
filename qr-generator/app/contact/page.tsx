'use client';

import { Mail, Github, Linkedin, MapPin, Clock, Briefcase, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaMagic, FaHome } from "react-icons/fa";

export default function ContactPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950 p-4 md:p-10 flex items-center justify-center">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group cursor-pointer">
            <div className="flex items-center space-x-2">
              <FaMagic className="text-2xl text-blue-600 dark:text-blue-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                QRMagic
              </span>
            </div>
          </Link>
          
          <Link 
            href="/"
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 cursor-pointer group"
          >
            <FaHome className="group-hover:scale-110 transition-transform" />
            <span>Back to Home</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl w-full mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-10 border border-gray-200/50 dark:border-gray-700/50 mt-16 mb-20">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">
            Get In Touch
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, collaborations, and how we can work together to create amazing QR code solutions.
          </p>
        </div>

        {/* Contact Cards in Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {/* Email */}
          <a
            href="mailto:ahad06074@gmail.com"
            className={`group flex flex-col items-center gap-4 p-6 bg-white dark:bg-gray-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-2xl shadow-lg hover:shadow-xl border border-gray-200/50 dark:border-gray-600/50 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${
              mounted ? "opacity-100" : "opacity-0 translate-y-2"
            }`}
            style={{ transitionDelay: "0.2s" }}
          >
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              Email
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm text-center">ahad06074@gmail.com</p>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/AbdulAHAD968"
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex flex-col items-center gap-4 p-6 bg-white dark:bg-gray-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-2xl shadow-lg hover:shadow-xl border border-gray-200/50 dark:border-gray-600/50 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${
              mounted ? "opacity-100" : "opacity-0 translate-y-2"
            }`}
            style={{ transitionDelay: "0.3s" }}
          >
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Github className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              GitHub
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm text-center">AbdulAHAD968</p>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/abdulahad-zarinc/"
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex flex-col items-center gap-4 p-6 bg-white dark:bg-gray-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-2xl shadow-lg hover:shadow-xl border border-gray-200/50 dark:border-gray-600/50 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${
              mounted ? "opacity-100" : "opacity-0 translate-y-2"
            }`}
            style={{ transitionDelay: "0.4s" }}
          >
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Linkedin className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              LinkedIn
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm text-center">abdulahad-zarinc</p>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
          </a>
        </div>

        {/* Extra Info Row */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "0.5s" }}
        >
          <div className="group bg-white dark:bg-gray-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-2xl p-6 border border-gray-200/50 dark:border-gray-600/50 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Location & Availability
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              • Open to freelance work worldwide
              <br />
              • Remote-first collaboration
              <br />
              • Flexible across timezones
            </p>
          </div>

          <div className="group bg-white dark:bg-gray-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-2xl p-6 border border-gray-200/50 dark:border-gray-600/50 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 cursor-pointer">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Response Time
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              • Usually respond within 24 hours
              <br />
              • Quick turnaround for urgent projects
              <br />
              • Available for scheduled calls
            </p>
          </div>
        </div>

      </div>
      <footer className="fixed bottom-0 left-0 right-0 h-16 border-t border-gray-200/50 dark:border-gray-700/50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg">
        <div className="container mx-auto h-full px-6 flex items-center justify-center">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <FaMagic className="text-blue-600 dark:text-blue-400" />
            <span>QRMagic • Built with passion</span>
            </div>
        </div>
      </footer>
    </div>

  );
}