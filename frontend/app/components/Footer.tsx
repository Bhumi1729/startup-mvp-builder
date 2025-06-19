'use client';
import React, { useState } from 'react';
import { 
  Sparkles, 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  ArrowRight,
  Send,
  Heart,
  ExternalLink,
  Rocket
} from 'lucide-react';

export default function MVPBuilderFooter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const quickLinks = [
    { name: 'Home', href: '#' },
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Privacy Policy', href: '#' }
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Bhumi1729', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/bhumika-yadav/', label: 'LinkedIn' }
  ];

  return (
    <footer className="relative bg-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Subtle background grain/texture effect */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
        
        {/* Ambient glow orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-600/8 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-red-600/8 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      {/* Enhanced Top border glow with multiple layers */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500/40 to-transparent"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500/60 to-transparent blur-sm"></div>
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-pink-500/20 to-transparent blur-md"></div>
      <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-r from-transparent via-red-500/15 to-transparent blur-lg"></div>

      <div className="relative z-10">        <div className="container mx-auto px-10 sm:px-14 md:px-16 lg:px-20 py-10">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">              {/* Enhanced Logo */}
              <div className="flex items-center space-x-2.5 group">
                <div className="relative">
                  <div className="w-9 h-9 bg-gradient-to-br from-pink-600 via-red-600 to-orange-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg shadow-pink-500/40">
                    <Rocket className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-600 to-red-600 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
                  <div className="absolute -inset-1 bg-gradient-to-br from-pink-500/30 to-red-500/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    MVP Builder
                  </span>
                  <span className="text-xs text-gray-400 font-medium">Build smarter, launch faster.</span>
                </div>
              </div>              {/* Description */}
              <p className="text-gray-400 leading-relaxed max-w-md text-sm">
                The AI-powered platform that takes you from idea to launch. Build MVPs with confidence using intelligent market analysis, smart roadmaps, and automated code generation.
              </p>              {/* Newsletter Signup */}
              <div className="space-y-3">
                <div className="text-white font-semibold text-sm">Stay Updated</div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1 max-w-sm">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700/50 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/50 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300 backdrop-blur-xl"
                      required
                    />
                    <Mail className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubscribed}
                    className="group relative px-4 py-2 bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-500 hover:to-red-500 rounded-lg text-sm text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/30 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isSubscribed ? (
                      <>
                        <Heart className="w-4 h-4 text-white" />
                        <span>Subscribed!</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                        <span>Subscribe</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold text-base">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="group flex items-center space-x-2 text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1"
                    >
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                      <span>{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold text-base">Connect</h3>
              <div className="flex flex-col space-y-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      className="group flex items-center space-x-3 text-gray-400 hover:text-white transition-all duration-300"
                      aria-label={social.label}
                    >
                      <div className="relative">                        <div className="p-1.5 bg-gray-900/50 rounded-lg border border-gray-700/50 group-hover:border-pink-500/50 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-pink-600/20 group-hover:to-red-600/20 backdrop-blur-xl">
                          <Icon className="w-4 h-4 transform group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-red-500/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <span className="font-medium">{social.label}</span>
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>          {/* Bottom Section */}
          <div className="pt-6 border-t border-gray-800/50">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
              {/* Copyright */}
              <div className="text-gray-500 text-xs">
                © 2025 MVP Builder. All rights reserved.
              </div>

              {/* Additional Links */}
              <div className="flex items-center space-x-4 text-xs">
                <a href="#" className="text-gray-500 hover:text-white transition-colors duration-300">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-500 hover:text-white transition-colors duration-300">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-500 hover:text-white transition-colors duration-300">
                  Support
                </a>
              </div>

              {/* Made with love indicator */}
              <div className="flex items-center space-x-1.5 text-gray-500 text-xs">
                <span>Made with</span>
                <Heart className="w-3 h-3 text-pink-500 animate-pulse" />
                <span>for builders</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simple bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-800/30"></div>
      
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </footer>
  );
}