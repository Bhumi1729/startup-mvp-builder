'use client';
import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  Sparkles, 
  Zap, 
  Target, 
  Code, 
  TrendingUp, 
  Brain, 
  Menu, 
  X, 
  Globe, 
  Rocket, 
  Users, 
  ChevronDown, 
  Play,
  ArrowRight,
  Star,
  Shield
} from 'lucide-react';

export default function HotDropHeroSection() {
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
    const phrases = [
    'Everything your MVP needs.',
    'From idea to launch.',
    'Build. Validate. Pitch.'
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);  useEffect(() => {
    const currentPhrase = phrases[currentIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting && typedText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && typedText === '') {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % phrases.length);
      } else if (isDeleting) {
        setTypedText(currentPhrase.substring(0, typedText.length - 1));
      } else {
        setTypedText(currentPhrase.substring(0, typedText.length + 1));
      }
    }, isDeleting ? 40 : 60);

    return () => clearTimeout(timeout);
  }, [typedText, currentIndex, isDeleting, phrases]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  const features = [
    { icon: Brain, title: 'AI Market Analysis', color: 'from-blue-500 to-indigo-600' },
    { icon: Target, title: 'Smart Roadmap', color: 'from-emerald-500 to-teal-600' },
    { icon: Code, title: 'Code Generation', color: 'from-violet-500 to-purple-600' }
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Subtle background grain/texture effect */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
        
        {/* Very subtle ambient glow orbs */}
        <div className="absolute top-1/3 left-1/6 w-96 h-96 bg-pink-600/5 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/6 w-80 h-80 bg-red-600/5 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2s"></div>
      </div>

      {/* Enhanced Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrollY > 50 
          ? 'bg-black/90 backdrop-blur-xl border-b border-pink-500/30 shadow-2xl shadow-pink-500/20' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Enhanced Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <div className="w-11 h-11 bg-gradient-to-br from-pink-600 via-red-600 to-orange-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg shadow-pink-500/40">
                  <Sparkles className="w-6 h-6 text-white animate-pulse" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-pink-600 to-red-600 rounded-xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
                {/* Additional glow ring */}
                <div className="absolute -inset-1 bg-gradient-to-br from-pink-500/30 to-red-500/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  MVPBuilder
                </span>
                <span className="text-xs text-gray-400 font-medium tracking-wide">AI-Powered Platform</span>
              </div>
            </div>
              {/* Enhanced Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {[
                { name: 'Features', href: '#features' },
                { name: 'About', href: '#about' },
                { name: 'Pricing', href: '#pricing' }
              ].map((item, index) => (
                <div key={item.name} className="relative group">
                  <a 
                    href={item.href} 
                    className="px-4 py-2 text-gray-400 hover:text-white transition-all duration-300 rounded-lg hover:bg-white/5 flex items-center space-x-1 font-medium"
                  >
                    <span>{item.name}</span>
                    {item.name === 'Features' && <ChevronDown className="w-4 h-4 opacity-60" />}
                  </a>
                  {/* Hover effect bar */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-red-500 group-hover:w-full transition-all duration-300"></div>
                </div>
              ))}
              
              {/* Enhanced Sign In */}
              <div className="relative group">
                <a 
                  href="/sign-in" 
                  className="px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 font-medium flex items-center space-x-2 rounded-lg hover:bg-white/5"
                >
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
              
              {/* Enhanced 3D Get Started Button with Rocket */}
              <div className="relative group">
                <a href="/sign-up">
                  <button className="relative px-6 py-3 bg-gradient-to-r from-pink-600 via-red-600 to-orange-600 group-hover:from-pink-500 group-hover:via-red-500 group-hover:to-orange-500 rounded-xl text-white font-semibold transform transition-all duration-300 group-hover:translate-y-[-2px] shadow-lg shadow-pink-500/30 group-hover:shadow-pink-500/50 flex items-center space-x-2">
                    <Rocket className="w-4 h-4 transform group-hover:rotate-12 transition-transform duration-300" />
                    <span>Get Started</span>
                  </button>
                </a>
                {/* Enhanced button glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-red-600 rounded-xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 -z-10"></div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>          {/* Enhanced Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-6 pb-6 space-y-4 bg-black/30 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-6 shadow-2xl">
              {[
                { name: 'Features', href: '#features' },
                { name: 'About', href: '#about' },
                { name: 'Pricing', href: '#pricing' },
                { name: 'Sign In', href: '/sign-in' }
              ].map((item) => (
                <a key={item.name} href={item.href} className="text-gray-400 hover:text-white py-3 px-4 rounded-lg hover:bg-white/10 transition-all flex items-center justify-between group">
                  <span>{item.name}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                </a>
              ))}
              <div className="px-4 py-3">
                <div className="relative group">
                  <a href="/sign-up">
                    <button className="relative w-full py-3 bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-500 hover:to-red-500 rounded-xl text-white font-semibold flex items-center justify-center space-x-2">
                      <Rocket className="w-4 h-4" />
                      <span>Get Started</span>
                    </button>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 pt-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between min-h-[calc(100vh-120px)] gap-16">
            
            {/* Left Content */}
            <div className="flex-1 max-w-2xl space-y-8 lg:pr-8">
              {/* Main Heading with Typing Effect */}
              <div className="space-y-4">                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                  <span className="block text-white mb-2 min-h-[1.2em]">
                    {typedText}
                    <span className="animate-pulse text-pink-500">|</span>
                  </span>
                  <span className="block bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
                    All in one place.
                  </span>
                </h1>
                
                <div className="max-w-lg pt-4">
                  <p className="text-lg text-gray-400 leading-relaxed">
                    Build smarter with AI — from market research to planning, architecture, and design. Launch with confidence.
                  </p>
                  
                </div>
              </div>

              {/* Waitlist Text - HotDrop style */}
              <div className="flex items-center space-x-2 text-base">
                <span className="text-gray-400">No Chaos.</span>
                <span className="text-pink-500 font-semibold">Just Clarity.</span>
              </div>              {/* Single CTA Button with Zap Icon */}
              <div className="pt-2">
                <a href="/sign-up">
                  <button className="group relative px-10 py-5 bg-gradient-to-r from-pink-600 to-red-600 rounded-full font-bold text-lg text-white overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/40 transform hover:scale-[1.02] shadow-lg shadow-pink-500/30">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative flex items-center justify-center space-x-3">
                      <Zap className="w-5 h-5 transform group-hover:rotate-12 transition-transform duration-300" />
                      <span>START BUILDING</span>
                      <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                    {/* Enhanced button glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-red-500 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10 scale-110"></div>
                  </button>
                </a>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center space-x-6 text-sm text-gray-500 pt-4">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span>Secure & Private</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>AI-Powered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Rocket className="w-4 h-4 text-blue-400" />
                  <span>Launch Ready</span>
                </div>
              </div>
            </div>

            {/* Right Side - Dashboard with HotDrop-style Glow */}
            <div className="flex-1 max-w-xl relative">              {/* Enhanced Glow Effect with Darker Blurred Edges */}
              <div className="absolute inset-0 scale-110">
                {/* Primary radial glow with increased blur and darker colors */}
                <div 
                  className="absolute inset-0 rounded-[40px] opacity-75 filter blur-3xl"
                  style={{
                    background: `radial-gradient(ellipse 600px 800px at center, 
                      rgba(236, 72, 153, 0.25) 0%, 
                      rgba(220, 38, 127, 0.22) 25%,
                      rgba(239, 68, 68, 0.15) 50%,
                      rgba(220, 38, 127, 0.08) 75%,
                      transparent 100%)`
                  }}
                ></div>
                
                {/* Secondary glow layer with darker intensity */}
                <div 
                  className="absolute inset-0 rounded-[40px] opacity-60 filter blur-2xl"
                  style={{
                    background: `radial-gradient(ellipse 400px 600px at center, 
                      rgba(236, 72, 153, 0.32) 0%, 
                      rgba(239, 68, 68, 0.25) 40%,
                      transparent 70%)`
                  }}
                ></div>
                
                {/* Outer atmospheric glow with darker hue */}
                <div 
                  className="absolute inset-0 scale-125 rounded-[50px] opacity-40 filter blur-3xl"
                  style={{
                    background: `radial-gradient(ellipse 800px 1000px at center, 
                      rgba(236, 72, 153, 0.22) 0%, 
                      rgba(220, 38, 127, 0.15) 30%,
                      transparent 60%)`
                  }}
                ></div>
              </div>              {/* Dashboard Container */}              <div className="relative bg-gradient-to-br from-gray-900/70 via-gray-900/65 to-black/75 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-filter">
                {/* Glass reflection effect */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                  <div className="absolute -inset-x-40 -top-80 h-[500px] w-[1000px] opacity-15 bg-gradient-to-b from-white to-transparent transform rotate-12"></div>
                </div>
                  {/* Dashboard Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-700/60">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-500/90 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-yellow-500/90 rounded-full animate-pulse animation-delay-1s"></div>
                    <div className="w-3 h-3 bg-green-500/90 rounded-full animate-pulse animation-delay-2s"></div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-xs text-gray-500 font-mono">MVP Builder Pro</div>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Feature Cards */}
                <div className="space-y-4 mb-6">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    const isActive = activeFeature === index;
                    return (
                      <div
                        key={index}                        className={`p-4 rounded-2xl border transition-all duration-700 transform ${
                          isActive 
                            ? 'border-transparent bg-gradient-to-br from-slate-900/85 via-slate-950/90 to-black/95 backdrop-blur-lg scale-105 shadow-xl shadow-black/70 backdrop-filter before:absolute before:inset-0 before:rounded-2xl before:p-[1px] before:bg-gradient-to-r before:from-white/10 before:via-pink-500/20 before:to-blue-500/15 before:-z-10 relative z-10 overflow-hidden' 
                            : 'border-white/15 bg-gray-900/35 hover:border-gray-500/40 hover:bg-gray-900/45 backdrop-blur-md relative'
                        }`}
                      >
                        <div className="flex items-center space-x-4">                          <div className={`relative p-3 rounded-xl bg-gradient-to-br ${feature.color} ${isActive ? 'animate-pulse' : ''} shadow-lg overflow-hidden`}>
                            <Icon className="w-5 h-5 text-white relative z-10" />
                            <div className="absolute inset-0 bg-black/5 backdrop-blur-sm"></div>
                            <div className="absolute top-0 right-0 w-8 h-8 bg-white/30 rounded-full blur-xl transform -translate-y-4 translate-x-2"></div>                            {isActive && (
                              <>
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-xl blur-xl opacity-60 -z-10`}></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-black/10"></div>
                                <div className="absolute -inset-1 bg-white/5 animate-pulse rounded-xl blur-2xl"></div>
                              </>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-white text-base">{feature.title}</div>
                            <div className="text-sm text-gray-400 mt-1">
                              {index === 0 && 'Analyzing market trends and opportunities...'}
                              {index === 1 && 'Building comprehensive product roadmap...'}
                              {index === 2 && 'Generating optimized code architecture...'}
                            </div>
                          </div>
                          {isActive && (
                            <div className="flex items-center space-x-2">
                              <div className="text-xs text-green-400 font-mono">78%</div>
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            </div>
                          )}
                        </div>
                          {/* Enhanced Progress Bar */}                        {isActive && (                          <div className="mt-4 bg-gray-900/50 rounded-full h-3 overflow-hidden backdrop-blur-lg p-0.5 border border-white/10">
                            <div className={`h-full bg-gradient-to-r ${feature.color} rounded-full relative overflow-hidden backdrop-filter bg-opacity-95`} style={{width: '78%'}}>
                              <div className="absolute inset-0 bg-white/15 animate-pulse"></div>
                              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                              <div className="absolute right-1 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full"></div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>                {/* Code Preview with Enhanced Glassmorphism */}
                <div className="bg-slate-900/50 rounded-2xl p-6 border border-white/15 backdrop-blur-xl shadow-lg relative overflow-hidden backdrop-filter">
                  {/* Glassmorphic Background Elements */}
                  <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/25 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-purple-500/25 rounded-full blur-3xl"></div>
                  {/* Glass reflection effect */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                    <div className="absolute -inset-x-20 -top-40 h-[300px] w-[600px] opacity-15 bg-gradient-to-b from-white to-transparent transform rotate-12"></div>
                  </div>
                    <div className="flex items-center justify-between mb-4 relative z-10">
                    <div className="flex items-center space-x-3">
                      <div className="p-1.5 bg-indigo-500/30 rounded-lg backdrop-blur-md">
                        <Code className="w-4 h-4 text-indigo-300" />
                      </div>
                      <div className="text-sm text-gray-300 font-mono">Generated Code Preview</div>
                    </div>
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse animation-delay-1s"></div>
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse animation-delay-2s"></div>
                    </div>
                  </div>                  <div className="font-mono text-sm space-y-1.5 relative z-10">
                    <div className="text-indigo-400">const <span className="text-blue-400">buildMVP</span> = <span className="text-white">{'() => {'}</span></div>
                    <div className="text-gray-500 pl-4 text-xs">{'// AI-generated MVP structure'}</div>
                    <div className="text-emerald-400 pl-4">return <span className="text-amber-300">productionReadyMVP</span>;</div>
                    <div className="text-white">{'}'}</div>
                    <div className="text-gray-500 mt-3 text-xs border-t border-gray-800 pt-2">
                      {'// Building components...'}
                      <span className="animate-pulse text-blue-400">⚡</span>
                    </div>
                    <div className="text-indigo-400">export default <span className="text-violet-400">ScalableMVP</span>;</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>      <style jsx>{`
        .animation-delay-1s { animation-delay: 1s; }
        .animation-delay-2s { animation-delay: 2s; }
        .animation-delay-4s { animation-delay: 4s; }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}