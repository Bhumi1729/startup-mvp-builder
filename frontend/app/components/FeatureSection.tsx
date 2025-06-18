'use client';
import React from 'react';
import Image from 'next/image';
import { 
  Search, 
  BarChart2, 
  Target, 
  Users, 
  Puzzle, 
  FileText, 
  LayoutGrid, 
  Cpu, 
  Database, 
  Layers, 
  PenTool, 
  Smartphone, 
  BarChart, 
  TrendingUp, 
  ShieldAlert
} from 'lucide-react';

export default function FeatureSection() {
  // Features data structure
  const features = [
    {      title: 'Market Research Toolkit',
      description: 'Leverage AI to scan competitors, analyze trends, and detect market gaps in real-time. Get instant access to market size statistics and auto-generated trend reports from the latest data sources to make informed decisions.',
      subFeatures: [
        'AI competitor scan & trend analyzer',
        'Real-time market gap detector',
        'Auto-generated opportunity reports'
      ],
      icon: Search,
      illustrationSide: 'right',
      color: 'from-blue-500 to-indigo-600',      illustration: (
        <div className="relative w-full h-full min-h-[300px]">
          {/* Market Analysis Illustration */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full max-w-2xl h-auto flex items-center justify-center">
              {/* Main background glow effect */}
              <div className="absolute inset-0 rounded-full bg-pink-500/20 blur-3xl opacity-40"></div>
              
              {/* The Market Analysis Dashboard with glassmorphic effect */}
              <div className="relative z-10 w-full h-full">
                <div className="relative w-[320px] h-[320px] md:w-[420px] md:h-[420px] xl:w-[480px] xl:h-[480px] animate-float">
                  {/* Main glassmorphic container for analytics dashboard */}
                  <div className="relative w-full h-full backdrop-blur-xl bg-gradient-to-br from-black/40 to-pink-950/20 rounded-2xl border border-pink-500/30 p-4 md:p-5 shadow-2xl shadow-pink-500/20 overflow-hidden">
                    {/* Background glow effects */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-pink-500/10 rounded-full blur-[80px]"></div>
                    <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-red-500/10 rounded-full blur-[60px]"></div>
                    <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[60px]"></div>
                      {/* Search bar */}
                    <div className="relative mb-4 mt-1">
                      <div className="w-full bg-black/40 backdrop-blur-md border border-pink-500/20 rounded-lg p-2 flex items-center">
                        <svg width="16" height="16" fill="none" className="mr-2 text-pink-500">
                          <path d="M19 19l-4.35-4.35M17 9A8 8 0 1 1 1 9a8 8 0 0 1 16 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <div className="text-gray-400 text-xs">Search: healthy food delivery market 2024</div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-transparent rounded-lg blur-sm"></div>
                    </div>
                    
                    {/* Dashboard panels container */}                    <div className="flex flex-col md:flex-row gap-3">
                      {/* Left column with line and pie charts */}
                      <div className="flex-1">
                        {/* Line chart - Market Growth */}
                        <div className="bg-black/30 backdrop-blur-md rounded-lg border border-pink-500/20 p-2 md:p-3 mb-3">
                          <div className="text-xs font-medium text-gray-200 mb-2">Market Growth (2020–2024)</div>
                          <div className="relative h-24">
                            {/* Chart background grid */}
                            <div className="absolute inset-0 flex flex-col justify-between">
                              {[...Array(4)].map((_, i) => (
                                <div key={i} className="border-t border-gray-700/30 w-full h-0"></div>
                              ))}
                            </div>
                            
                            {/* Line chart */}
                            <div className="absolute inset-0">
                              <svg className="w-full h-full" viewBox="0 0 100 40">
                                <defs>
                                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="rgb(236, 72, 153)" stopOpacity="0.3" />
                                    <stop offset="100%" stopColor="rgb(236, 72, 153)" stopOpacity="0" />
                                  </linearGradient>
                                </defs>
                                
                                {/* Area under curve */}
                                <path 
                                  d="M0,35 L0,30 C5,28 15,25 20,20 C30,10 40,15 50,10 C60,5 70,8 80,3 L100,0 L100,40 Z" 
                                  fill="url(#lineGradient)" 
                                />
                                
                                {/* Line */}
                                <path 
                                  d="M0,30 C5,28 15,25 20,20 C30,10 40,15 50,10 C60,5 70,8 80,3 L100,0" 
                                  fill="none" 
                                  stroke="#ec4899" 
                                  strokeWidth="1.5"
                                  className="animate-pulse" 
                                  style={{ animationDuration: '4s' }} 
                                />
                                
                                {/* Data points */}
                                {[
                                  {x: 0, y: 30},
                                  {x: 20, y: 20},
                                  {x: 50, y: 10},
                                  {x: 80, y: 3},
                                  {x: 100, y: 0}
                                ].map((point, i) => (
                                  <circle key={i} cx={point.x} cy={point.y} r="1.5" fill="#ec4899" />
                                ))}
                              </svg>
                            </div>
                            
                            {/* Year labels */}
                            <div className="absolute bottom-0 left-0 right-0 flex justify-between">
                              <div className="text-[10px] text-gray-500">2020</div>
                              <div className="text-[10px] text-gray-500">2022</div>
                              <div className="text-[10px] text-gray-500">2024</div>
                            </div>
                          </div>
                        </div>
                          {/* Pie chart - User Demographics */}
                        <div className="bg-black/30 backdrop-blur-md rounded-lg border border-pink-500/20 p-2 md:p-3">
                          <div className="text-xs font-medium text-gray-200 mb-2">User Demographics</div>
                          <div className="flex">
                            {/* Pie chart SVG */}
                            <div className="w-16 h-16 md:w-20 md:h-20 relative">
                              <svg viewBox="0 0 36 36" className="w-full h-full">
                                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#444" strokeWidth="1" />
                                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#ec4899" strokeWidth="3" strokeDasharray="35, 100" />
                                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#1a7fd1" strokeWidth="3" strokeDasharray="25, 100" strokeDashoffset="-35" />
                                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#8b5cf6" strokeWidth="3" strokeDasharray="20, 100" strokeDashoffset="-60" />
                                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="20, 100" strokeDashoffset="-80" />
                              </svg>
                            </div>
                            
                            {/* Legend */}
                            <div className="ml-2 md:ml-3 flex flex-col justify-center text-[10px] space-y-1">
                              <div className="flex items-center">
                                <div className="w-2 h-2 bg-pink-500 rounded-sm mr-1"></div>
                                <div className="text-gray-300">Millennials (35%)</div>
                              </div>
                              <div className="flex items-center">
                                <div className="w-2 h-2 bg-blue-500 rounded-sm mr-1"></div>
                                <div className="text-gray-300">Gen Z (25%)</div>
                              </div>
                              <div className="flex items-center">
                                <div className="w-2 h-2 bg-purple-500 rounded-sm mr-1"></div>
                                <div className="text-gray-300">Gen X (20%)</div>
                              </div>
                              <div className="flex items-center">
                                <div className="w-2 h-2 bg-emerald-500 rounded-sm mr-1"></div>
                                <div className="text-gray-300">Others (20%)</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                        {/* Right column with bar chart and insight card */}
                      <div className="flex-1 flex flex-col">
                        {/* Bar chart - Competitor Comparison */}
                        <div className="bg-black/30 backdrop-blur-md rounded-lg border border-pink-500/20 p-2 md:p-3 mb-3">
                          <div className="text-xs font-medium text-gray-200 mb-2">Competitor Comparison</div>
                          <div className="space-y-2">
                            {[
                              { name: 'Company A', value: 84 },
                              { name: 'Company B', value: 62 },
                              { name: 'Company C', value: 47 }
                            ].map((item, i) => (
                              <div key={i} className="space-y-0.5">
                                <div className="flex justify-between text-[10px]">
                                  <div className="text-gray-400">{item.name}</div>
                                  <div className="text-gray-300">{item.value}%</div>
                                </div>
                                <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-gradient-to-r from-pink-500 to-red-500 rounded-full animate-pulse" 
                                    style={{ width: `${item.value}%`, animationDelay: `${i * 0.3}s` }}
                                  ></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                          {/* Insight card */}
                        <div className="bg-black/30 backdrop-blur-md rounded-lg border border-pink-500/20 p-2 md:p-3 flex-1 flex items-center">
                          <div className="relative w-full">
                            <div className="text-xs font-medium text-gray-200 mb-2">Market Insight</div>
                            <div className="p-2 bg-gradient-to-br from-pink-900/30 to-pink-800/10 rounded-lg border border-pink-500/20">
                              <div className="text-xs md:text-sm text-white font-medium flex items-center">
                                <span className="text-sm mr-1">📈</span>
                                Demand for health-focused meals up 38%
                              </div>
                              <div className="mt-1 text-[10px] text-gray-400">
                                Millennial consumers driving premium delivery segment.
                              </div>
                            </div>
                            
                            {/* Decorative elements */}
                            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-pink-500/20 animate-ping opacity-70" style={{ animationDuration: '3s' }}></div>
                            <div className="absolute -bottom-1 -left-1 w-4 h-4 rounded-full bg-red-500/20 animate-ping opacity-70" style={{ animationDuration: '4s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Added Market Size and Target Audience cards row */}
                    <div className="flex justify-between gap-4 mt-3">
                      {/* Market Size Card */}
                      <div className="bg-black/40 backdrop-blur-md rounded-lg border border-pink-500/30 p-2 w-[48%] shadow-lg shadow-pink-500/10 z-10">
                        <div className="text-xs font-medium text-gray-200 mb-1.5">Market Size</div>
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500/20 to-pink-800/20 flex items-center justify-center mr-2">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-pink-400">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                              <polyline points="17 8 12 3 7 8"/>
                              <line x1="12" y1="3" x2="12" y2="15"/>
                            </svg>
                          </div>
                          <div>
                            <div className="text-xs text-white font-bold">$14.2B</div>
                            <div className="text-[10px] text-green-400 flex items-center">
                              +12.4% CAGR
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-0.5">
                                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                                <polyline points="17 6 23 6 23 12"/>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Target Audience Card */}
                      <div className="bg-black/40 backdrop-blur-md rounded-lg border border-pink-500/30 p-2 w-[48%] shadow-lg shadow-pink-500/10 z-10">
                        <div className="text-xs font-medium text-gray-200 mb-1.5">Target Audience</div>
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-800/20 flex items-center justify-center mr-2">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-blue-400">
                              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                              <circle cx="9" cy="7" r="4"/>
                              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                            </svg>
                          </div>
                          <div>
                            <div className="text-xs text-white font-bold">28-45 Age</div>
                            <div className="text-[10px] text-gray-400">Health-conscious urban</div>
                          </div>
                        </div>
                      </div>
                    </div>
                      {/* Hovering magnifying glass */}
                    <div className="absolute bottom-3 right-4 animate-float" style={{ animationDelay: '1.5s' }}>
                      <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-pink-500/20 to-pink-900/20 rounded-full border border-pink-500/30 flex items-center justify-center shadow-lg shadow-pink-500/20">
                        <svg width="12" height="12" fill="none" className="text-pink-500 md:w-4 md:h-4">
                          <path d="M19 19l-4.35-4.35M17 9A8 8 0 1 1 1 9a8 8 0 0 1 16 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                    
                    {/* Light beam effects */}
                    <div className="absolute top-0 left-[30%] w-[40%] h-[30%] bg-gradient-to-b from-pink-500/10 to-transparent rotate-[30deg] blur-lg"></div>
                    <div className="absolute bottom-0 right-[20%] w-[30%] h-[40%] bg-gradient-to-t from-red-500/10 to-transparent rotate-[-30deg] blur-lg"></div>
                  </div>
                </div>              </div>
            </div>
          </div>
        </div>
      )
    },
    {      title: 'Smart Product Planning',
      description: 'Build detailed user personas with behavior mapping, prioritize features using MoSCoW and RICE matrices, and generate comprehensive user stories with AI assistance. Create complete MVP roadmaps with phase-wise breakdown for efficient development planning.',
      subFeatures: [
        'Persona builder + feature prioritizer',
        'AI-generated user stories',
        'Interactive MVP roadmap'
      ],
      icon: Puzzle,
      illustrationSide: 'left',
      color: 'from-emerald-500 to-teal-600',      
      illustration: (
        <div className="relative w-full h-full min-h-[400px]">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Main container with glassmorphic effect */}
            <div className="relative w-full max-w-3xl h-[380px] backdrop-blur-xl bg-gradient-to-br from-black/40 to-pink-950/20 rounded-2xl border border-pink-500/30 p-6 shadow-2xl shadow-pink-500/20 overflow-hidden">
              
              {/* Background glow effects */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-pink-500/10 rounded-full blur-[80px]"></div>
              <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-red-500/10 rounded-full blur-[60px]"></div>
              <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[60px]"></div>
              
              {/* Content directly on the main background without the whiteboard window container */}
              <div className="relative h-full w-full">
                
                {/* Sticky Notes */}
                <div className="flex justify-center space-x-6 absolute top-[25%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  {/* Ideas Sticky */}
                  <div className="w-24 h-28 bg-gradient-to-br from-blue-600/70 to-blue-900/50 rounded-lg shadow-lg border border-blue-500/30 p-3 rotate-[-3deg] transform hover:rotate-0 transition-transform animate-float" style={{ animationDelay: '0.2s' }}>
                    <div className="text-center text-white font-semibold text-sm mb-2">Ideas</div>
                    <div className="space-y-1.5">
                      <div className="h-1.5 bg-white/30 rounded-full w-full"></div>
                      <div className="h-1.5 bg-white/30 rounded-full w-[80%]"></div>
                      <div className="h-1.5 bg-white/30 rounded-full w-full"></div>
                      <div className="h-1.5 bg-white/30 rounded-full w-[60%]"></div>
                    </div>
                  </div>
                  
                  {/* Prioritize Sticky */}
                  <div className="w-24 h-28 bg-gradient-to-br from-pink-600/70 to-pink-900/50 rounded-lg shadow-lg border border-pink-500/30 p-3 rotate-[1deg] transform hover:rotate-0 transition-transform animate-float" style={{ animationDelay: '0.5s' }}>
                    <div className="text-center text-white font-semibold text-sm mb-2">Prioritize</div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-white/80"></div>
                        <div className="h-1.5 bg-white/30 rounded-full w-full"></div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-white/80"></div>
                        <div className="h-1.5 bg-white/30 rounded-full w-full"></div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-white/80"></div>
                        <div className="h-1.5 bg-white/30 rounded-full w-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* MVP Roadmap Sticky */}
                  <div className="w-24 h-28 bg-gradient-to-br from-purple-600/70 to-purple-900/50 rounded-lg shadow-lg border border-purple-500/30 p-3 rotate-[4deg] transform hover:rotate-0 transition-transform animate-float" style={{ animationDelay: '0.7s' }}>
                    <div className="text-center text-white font-semibold text-sm mb-2">MVP Roadmap</div>
                    <div className="space-y-1">
                      <div className="h-1.5 bg-white/30 rounded-full w-full"></div>
                      <div className="h-3 bg-gradient-to-r from-green-500/60 via-yellow-500/60 to-red-500/60 rounded-md w-full mt-1"></div>
                      <div className="flex justify-between mt-1">
                        <div className="h-2 w-2 bg-white/30 rounded-full"></div>
                        <div className="h-2 w-2 bg-white/30 rounded-full"></div>
                        <div className="h-2 w-2 bg-white/30 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Timeline Bar */}
                <div className="absolute bottom-[15%] left-1/2 transform -translate-x-1/2 w-[70%] bg-gray-800/80 backdrop-blur-md rounded-lg p-3 border border-gray-700/40 shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                  <div className="relative h-2 bg-gray-700/60 rounded-full mb-2 overflow-hidden">
                    <div className="absolute top-0 left-0 h-full w-[60%] bg-gradient-to-r from-pink-500 to-red-500 rounded-full"></div>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex flex-col items-center">
                      <div className="w-1 h-1 bg-pink-500 rounded-full"></div>
                      <div className="text-xs text-gray-300 mt-1">Phase 1</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-1 h-1 bg-pink-500 rounded-full"></div>
                      <div className="text-xs text-gray-300 mt-1">Phase 2</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-1 h-1 bg-red-500 rounded-full"></div>
                      <div className="text-xs text-gray-300 mt-1">Launch</div>
                    </div>
                  </div>
                </div>
              
                {/* User Persona Card */}
                <div className="absolute right-[7%] top-[26%] w-[130px] bg-gradient-to-br from-gray-900/70 to-black/50 rounded-xl border border-gray-700/50 shadow-lg backdrop-blur-xl p-3 transform rotate-[5deg] animate-float" style={{ animationDelay: '1.2s' }}>
                  <div className="flex flex-col items-center">
                    <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-pink-500/30 to-red-500/30 mb-2 flex items-center justify-center overflow-hidden border border-pink-500/30">
                      <svg className="w-8 h-8 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent"></div>
                    </div>
                    <div className="text-sm font-medium text-white mb-0.5">User Persona</div>
                    <div className="text-xs text-gray-400">Tech Founder</div>
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent my-2"></div>
                    <div className="w-full space-y-1.5">
                      <div className="h-1 bg-white/20 rounded-full w-full"></div>
                      <div className="h-1 bg-white/20 rounded-full w-[70%]"></div>
                    </div>
                  </div>
                </div>
                
                {/* Additional decorative elements */}
                <div className="absolute left-[10%] bottom-[25%] w-6 h-6 rounded-full bg-pink-500/20 animate-ping opacity-70" style={{ animationDuration: '3s' }}></div>
                <div className="absolute right-[15%] bottom-[60%] w-4 h-4 rounded-full bg-red-500/20 animate-ping opacity-70" style={{ animationDuration: '4s' }}></div>
                <div className="absolute left-[40%] top-[15%] w-5 h-5 rounded-full bg-purple-500/20 animate-ping opacity-70" style={{ animationDuration: '5s' }}></div>
                
                {/* Light beam effect */}
                <div className="absolute top-0 left-[30%] w-[40%] h-[30%] bg-gradient-to-b from-pink-500/10 to-transparent rotate-[30deg] blur-xl transform-gpu"></div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {      title: 'Technical Blueprint Generator',
      description: 'Generate complete system architecture with AI-recommended tech stacks tailored to your product type. Create database schemas with one-click design tools for both SQL and NoSQL options, visualize your system with drag-and-drop architecture builders, and estimate technical effort with color-coded difficulty levels.',
      subFeatures: [
        'Suggested tech stacks',
        'Drag-drop system architecture',
        'API & DB schema planners'
      ],
      icon: Cpu,
      illustrationSide: 'right',
      color: 'from-red-500 to-pink-600',      
      illustration: (
        <div className="relative w-full h-full min-h-[300px]">
          {/* Architecture diagram with modules and connections */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full max-w-3xl backdrop-blur-xl bg-gradient-to-br from-black/30 to-pink-950/20 rounded-2xl border border-pink-500/30 p-6 shadow-2xl shadow-pink-500/20">
              {/* Light glow effect behind image */}
              <div className="absolute inset-0 rounded-3xl bg-pink-500/15 blur-3xl opacity-40"></div>
              
              {/* Floating Architecture Components */}              
              <div className="relative w-full h-[380px]">
                {/* Tech stack summary panel */}
                <div className="absolute left-[50%] top-[-0.4%] transform -translate-x-1/2 w-[240px] bg-black/40 backdrop-blur-xl rounded-lg border border-pink-500/30 overflow-hidden z-10">
                  <div className="p-2 bg-gradient-to-r from-pink-900/20 to-red-900/20 border-b border-pink-500/30">
                    <div className="text-xs font-mono text-pink-200">Tech Stack</div>
                  </div>
                  <div className="p-2">
                    <pre className="text-[11px] leading-tight text-gray-300 font-mono overflow-hidden">
                      <code className="whitespace-nowrap">
                        <span className="text-cyan-400">frontend</span>: next.js, react, tailwind,<br/>
                        <span className="text-green-400">backend</span>: node.js, express,<br/>
                        <span className="text-violet-400">api</span>: graphql, rest,<br/>
                        <span className="text-amber-400">db</span>: postgres, redis,<br/>
                        <span className="text-red-400">auth</span>: jwt, oauth2
                      </code>
                    </pre>
                  </div>
                </div>
                
                {/* Frontend Component */}
                <div className="absolute top-[33%] left-[4%] animate-float" style={{ animationDelay: '0s' }}>
                  <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 p-3 rounded-xl border border-blue-500/40 shadow-lg shadow-blue-500/20 backdrop-blur-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/30 flex items-center justify-center backdrop-blur-sm">
                        <div className="relative">
                          {/* React icon */}
                          <div className="w-5 h-5 text-white animate-pulse">
                            <svg viewBox="0 0 24 24" fill="none">
                              <path d="M12 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" fill="currentColor"/>
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" 
                                fillRule="evenodd" clipRule="evenodd" fill="currentColor"/>
                            </svg>
                          </div>
                          {/* Glowing effect */}
                          <div className="absolute inset-0 bg-blue-500/40 rounded-full blur-md"></div>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-blue-200">Frontend</div>
                        <div className="text-xs text-blue-300/70">React + Next.js</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Backend Component */}
                <div className="absolute top-[33%] right-[4%] animate-float" style={{ animationDelay: '0.5s' }}>
                  <div className="bg-gradient-to-br from-green-900/40 to-green-800/20 p-3 rounded-xl border border-green-500/40 shadow-lg shadow-green-500/20 backdrop-blur-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-green-500/30 flex items-center justify-center backdrop-blur-sm">
                        <div className="relative">
                          {/* Node.js icon */}
                          <div className="w-5 h-5 text-white animate-pulse">
                            <svg viewBox="0 0 24 24" fill="none">
                              <path d="M12 21.985c-.275 0-.532-.074-.772-.202l-2.439-1.448c-.365-.204-.182-.277-.072-.314.496-.165.588-.198 1.101-.493.056-.029.129-.018.185.018l1.87 1.12c.074.036.166.036.22 0l7.319-4.237c.073-.036.11-.11.11-.202V7.768c0-.091-.037-.165-.11-.202l-7.319-4.219c-.073-.037-.165-.037-.22 0L4.552 7.566c-.073.036-.11.129-.11.201v8.457c0 .073.037.165.11.201l2 1.157c1.082.543 1.762-.095 1.762-.735V8.502c0-.11.091-.22.22-.22h.926c.11 0 .22.092.22.22v8.345c0 1.448-.788 2.294-2.164 2.294-.422 0-.752 0-1.688-.46l-1.908-1.103c-.477-.275-.771-.788-.771-1.337v-8.46c0-.55.294-1.062.771-1.336l7.336-4.237a1.65 1.65 0 011.54 0l7.337 4.237c.477.275.771.787.771 1.336v8.458c0 .55-.295 1.062-.771 1.337l-7.337 4.237a1.74 1.74 0 01-.77.202z" fill="currentColor"/>
                            </svg>
                          </div>
                          {/* Glowing effect */}
                          <div className="absolute inset-0 bg-green-500/40 rounded-full blur-md"></div>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-green-200">Backend</div>
                        <div className="text-xs text-green-300/70">Node.js + Express</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* API Component */}
                <div className="absolute top-[62%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 animate-float" style={{ animationDelay: '1s' }}>
                  <div className="bg-gradient-to-br from-violet-900/40 to-violet-800/20 p-3 rounded-xl border border-violet-500/40 shadow-lg shadow-violet-500/20 backdrop-blur-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-violet-500/30 flex items-center justify-center backdrop-blur-sm">
                        <div className="relative">
                          {/* API icon */}
                          <div className="w-5 h-5 text-white animate-pulse">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>
                            </svg>
                          </div>
                          {/* Glowing effect */}
                          <div className="absolute inset-0 bg-violet-500/40 rounded-full blur-md"></div>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-violet-200">API</div>
                        <div className="text-xs text-violet-300/70">RESTful + GraphQL</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Database Component */}
                <div className="absolute bottom-[6%] left-[3%] animate-float" style={{ animationDelay: '1.5s' }}>
                  <div className="bg-gradient-to-br from-amber-900/40 to-amber-800/20 p-3 rounded-xl border border-amber-500/40 shadow-lg shadow-amber-500/20 backdrop-blur-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/30 flex items-center justify-center backdrop-blur-sm">
                        <div className="relative">
                          {/* Database icon */}
                          <div className="w-5 h-5 text-white animate-pulse">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M12 8c4.42 0 8-1.79 8-4s-3.58-4-8-4-8 1.79-8 4 3.58 4 8 4z"/>
                              <path d="M4 6v6c0 2.21 3.58 4 8 4s8-1.79 8-4V6"/>
                              <path d="M4 12v6c0 2.21 3.58 4 8 4s8-1.79 8-4v-6"/>
                            </svg>
                          </div>
                          {/* Glowing effect */}
                          <div className="absolute inset-0 bg-amber-500/40 rounded-full blur-md"></div>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-amber-200">Database</div>
                        <div className="text-xs text-amber-300/70">PostgreSQL</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Auth Module */}
                <div className="absolute bottom-[6%] right-[3%] animate-float" style={{ animationDelay: '2s' }}>
                  <div className="bg-gradient-to-br from-red-900/40 to-red-800/20 p-3 rounded-xl border border-red-500/40 shadow-lg shadow-red-500/20 backdrop-blur-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-red-500/30 flex items-center justify-center backdrop-blur-sm">
                        <div className="relative">
                          {/* Auth icon */}
                          <div className="w-5 h-5 text-white animate-pulse">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                            </svg>
                          </div>
                          {/* Glowing effect */}
                          <div className="absolute inset-0 bg-red-500/40 rounded-full blur-md"></div>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-red-200">Auth</div>
                        <div className="text-xs text-red-300/70">JWT + OAuth</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Animated light trails connecting components */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <defs>
                    <linearGradient id="trailGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#EC4899" stopOpacity="0" />
                      <stop offset="50%" stopColor="#EC4899" stopOpacity="1" />
                      <stop offset="100%" stopColor="#EC4899" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="trailGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#EF4444" stopOpacity="0" />
                      <stop offset="50%" stopColor="#EF4444" stopOpacity="1" />
                      <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="trailGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FB7185" stopOpacity="0" />
                      <stop offset="50%" stopColor="#FB7185" stopOpacity="1" />
                      <stop offset="100%" stopColor="#FB7185" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* Frontend to API (from bottom right of Frontend to top left of API) */}
                  <line x1="22%" y1="48%" x2="45%" y2="56%" stroke="url(#trailGradient1)" strokeWidth="1.5" strokeDasharray="5,3" className="animate-pulse" style={{ animationDuration: '3s' }} />

                  {/* Backend to API (from bottom left of Backend to top right of API) */}
                  <line x1="78%" y1="48%" x2="55%" y2="56%" stroke="url(#trailGradient2)" strokeWidth="1.5" strokeDasharray="5,3" className="animate-pulse" style={{ animationDuration: '4s' }} />

                  {/* API to Database (from bottom left of API to top right of Database) */}
                  <line x1="47%" y1="68%" x2="2%" y2="83%" stroke="url(#trailGradient3)" strokeWidth="1.5" strokeDasharray="5,3" className="animate-pulse" style={{ animationDuration: '3.5s' }} />

                  {/* API to Auth (from bottom right of API to top left of Auth) */}
                  <line x1="50%" y1="68%" x2="96%" y2="82%" stroke="url(#trailGradient1)" strokeWidth="1.5" strokeDasharray="5,3" className="animate-pulse" style={{ animationDuration: '4.5s' }} />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )
    },    {      title: 'UX/UI Design Assistant',
      description: 'Create intuitive user flows from prompts or personas, generate wireframes that can be exported to Figma or Sketch, and receive design system recommendations based on your brand tone. Preview designs in both dark and light modes, and verify usability with built-in experience checking tools.',
      subFeatures: [
        'User flow + wireframe generator',
        'Design system recommender',
        'UI previews with usability scores'
      ],
      icon: PenTool,
      illustrationSide: 'left',
      color: 'from-pink-500 to-red-600',      illustration: (
        <div className="relative w-full h-full min-h-[300px]">
          {/* UI/UX Designer illustration with dark theme and pinkish glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full max-w-3xl h-[380px] backdrop-blur-xl bg-gradient-to-br from-black/40 to-pink-950/20 rounded-2xl border border-pink-500/30 p-6 shadow-2xl shadow-pink-500/20 overflow-hidden">
              {/* Background glow effects - matching hero section */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-pink-500/10 rounded-full blur-[80px]"></div>
              <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-red-500/10 rounded-full blur-[60px]"></div>
              <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[60px]"></div>
              
              {/* Content container */}
              <div className="relative h-full w-full flex items-center justify-between">
                {/* Left side - User Flow Diagram */}
                <div className="w-1/4 mr-4 animate-float" style={{ animationDelay: '0.2s' }}>
                  <div className="bg-black/40 backdrop-blur-md rounded-lg border border-pink-500/20 p-3 shadow-lg">
                    <div className="text-xs text-gray-300 font-medium mb-3 text-center">User Flow</div>
                    
                    {/* User flow nodes and arrows */}
                    <div className="space-y-4">
                      {/* Onboarding node */}
                      <div className="flex flex-col items-center">
                        <div className="w-20 h-7 bg-black/50 border border-pink-500/30 rounded-md flex items-center justify-center">
                          <span className="text-[10px] text-gray-300">Onboarding</span>
                        </div>
                        <div className="h-4 w-[1px] bg-pink-500/50 my-1"></div>
                        <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-pink-500/50"></div>
                      </div>
                      
                      {/* Browse Meals node */}
                      <div className="flex flex-col items-center">
                        <div className="w-20 h-7 bg-black/50 border border-pink-500/30 rounded-md flex items-center justify-center">
                          <span className="text-[10px] text-gray-300">Browse Meals</span>
                        </div>
                        <div className="h-4 w-[1px] bg-pink-500/50 my-1"></div>
                        <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-pink-500/50"></div>
                      </div>
                      
                      {/* Order node */}
                      <div className="flex flex-col items-center">
                        <div className="w-20 h-7 bg-black/50 border border-pink-500/30 rounded-md flex items-center justify-center">
                          <span className="text-[10px] text-gray-300">Order</span>
                        </div>
                        <div className="h-4 w-[1px] bg-pink-500/50 my-1"></div>
                        <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-pink-500/50"></div>
                      </div>
                      
                      {/* Confirmation node */}
                      <div className="flex flex-col items-center">
                        <div className="w-20 h-7 bg-black/50 border border-pink-500/30 rounded-md flex items-center justify-center">
                          <span className="text-[10px] text-gray-300">Confirmation</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>                {/* Center - Mobile Phone Mockup */}
                <div className="flex-1 flex items-center justify-center animate-float" style={{ animationDelay: '0.5s' }}>
                  {/* Phone container - reduced size by 25% */}
                  <div className="relative w-[180px] h-[340px]">
                    {/* Phone frame - clean design without 3D distortion */}
                    <div className="absolute inset-0 bg-black rounded-[32px] shadow-xl overflow-hidden flex flex-col border border-gray-800">
                      {/* Inner screen with smaller radius */}
                      <div className="m-[8px] flex-1 bg-black rounded-[24px] overflow-hidden flex flex-col">
                        {/* Status bar */}
                        <div className="h-6 w-full flex justify-center items-center relative">
                          {/* Notch */}
                          <div className="absolute top-0 w-[80px] h-6 bg-black rounded-b-[14px] flex items-end justify-center pb-1">
                            <div className="w-1.5 h-1.5 bg-gray-800 rounded-full"></div>
                          </div>
                          
                          {/* Status icons on right */}
                          <div className="absolute right-3 top-1 flex gap-1">
                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          </div>
                        </div>
                        
                        {/* App content */}
                        <div className="flex-1 px-2.5 pt-0 pb-2 flex flex-col">
                          {/* Navigation */}
                          <div className="flex items-center justify-between mb-1">
                            <svg className="w-3.5 h-3.5 text-white/70" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <div className="text-[8px] text-white font-medium">Menu</div>
                            <svg className="w-3.5 h-3.5 text-white/70" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                          </div>
                          
                          {/* Food item preview */}
                          <div className="w-full h-28 bg-gradient-to-br from-pink-500/30 to-purple-500/30 rounded-lg mb-2 overflow-hidden relative">
                            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                            <div className="absolute bottom-1.5 left-1.5">
                              <div className="text-[9px] text-white font-bold">Healthy Bowl</div>
                              <div className="text-[7px] text-gray-300">$12.99</div>
                            </div>
                          </div>
                          
                          {/* Food categories */}
                          <div className="flex justify-between mb-2">
                            <div className="px-1.5 py-0.5 rounded-full text-[7px] bg-gray-800/80 text-gray-400">
                              Popular
                            </div>
                            <div className="px-1.5 py-0.5 rounded-full text-[7px] bg-pink-500/40 text-pink-300 border border-pink-500/30">
                              Healthy
                            </div>
                            <div className="px-1.5 py-0.5 rounded-full text-[7px] bg-gray-800/80 text-gray-400">
                              Vegan
                            </div>
                          </div>
                          
                          {/* Food items list */}
                          <div className="flex-1 space-y-2">
                            {[...Array(3)].map((_, i) => (
                              <div key={i} className="flex items-center bg-gray-800/30 rounded-lg p-1">
                                <div className="w-6 h-6 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-md mr-1.5"></div>
                                <div>
                                  <div className="w-12 h-1 bg-gray-400 rounded-full"></div>
                                  <div className="w-8 h-0.5 bg-gray-500/50 rounded-full mt-1"></div>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          {/* Bottom navigation */}
                          <div className="h-5 flex items-center justify-around pt-1">
                            <div className="w-6 h-1 bg-pink-500 rounded-full"></div>
                            <div className="w-6 h-1 bg-gray-700/50 rounded-full"></div>
                            <div className="w-6 h-1 bg-gray-700/50 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Arrow icon */}
                    <div className="absolute top-1/2 -right-10 transform -translate-y-1/2">
                      <svg className="w-6 h-6 text-pink-500/70" viewBox="0 0 24 24" fill="none">
                        <path d="M19 12H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Right side - Style Guide Panel */}
                <div className="w-1/4 ml-4 animate-float" style={{ animationDelay: '0.7s' }}>
                  <div className="bg-black/40 backdrop-blur-md rounded-lg border border-pink-500/20 p-3 shadow-lg">
                    <div className="text-xs text-gray-300 font-medium mb-3 text-center">Style Guide</div>
                    
                    {/* Color swatches */}
                    <div className="mb-4">
                      <div className="text-[10px] text-gray-400 mb-1">Colors</div>
                      <div className="flex justify-between gap-1">
                        <div className="h-5 flex-1 bg-purple-600 rounded"></div>
                        <div className="h-5 flex-1 bg-green-500 rounded"></div>
                        <div className="h-5 flex-1 bg-gray-600 rounded"></div>
                      </div>
                    </div>
                    
                    {/* Typography */}
                    <div className="mb-4">
                      <div className="text-[10px] text-gray-400 mb-1">Typography</div>
                      <div className="p-1.5 bg-black/30 rounded-md border border-gray-800">
                        <div className="text-[10px] text-white font-medium mb-1">Inter, 16px</div>
                        <div className="text-[8px] text-gray-400">Aa Bb Cc Dd Ee Ff Gg Hh Ii</div>
                      </div>
                    </div>
                    
                    {/* Components */}
                    <div>
                      <div className="text-[10px] text-gray-400 mb-1">Components</div>
                      {/* Buttons */}
                      <div className="flex gap-1 mb-2">
                        <div className="flex-1 h-5 bg-pink-600 rounded-full flex items-center justify-center">
                          <span className="text-[8px] text-white">Button</span>
                        </div>
                        <div className="flex-1 h-5 bg-transparent border border-pink-500 rounded-full flex items-center justify-center">
                          <span className="text-[8px] text-pink-400">Button</span>
                        </div>
                      </div>
                      
                      {/* Sliders */}
                      <div className="space-y-2">
                        <div>
                          <div className="text-[8px] text-gray-500 mb-0.5">Spacing</div>
                          <div className="h-1.5 bg-black/50 rounded-full overflow-hidden">
                            <div className="w-2/3 h-full bg-pink-500 rounded-full"></div>
                          </div>
                        </div>
                        <div>
                          <div className="text-[8px] text-gray-500 mb-0.5">Radius</div>
                          <div className="h-1.5 bg-black/50 rounded-full overflow-hidden">
                            <div className="w-1/2 h-full bg-pink-500 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {      title: 'Business Strategy Builder',
      description: 'Develop comprehensive business strategies with AI-powered tools including revenue model templates (freemium, subscription, ads), dynamic pricing strategies based on competitive analysis, and detailed go-to-market plans. Create first 3-year financial projections and identify potential risks with automated mitigation planning.',
      subFeatures: [
        'Revenue model + pricing strategy',
        'Go-to-market plan + projections',
        'Risk and mitigation map'
      ],
      icon: BarChart,
      illustrationSide: 'right',
      color: 'from-amber-500 to-yellow-600',      illustration: (
        <div className="relative w-full h-full min-h-[300px]">
          {/* Premium Pricing Strategy Cards Illustration */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full max-w-4xl mx-auto">
              {/* Main background glow effect */}
              <div className="absolute inset-0 rounded-full bg-pink-500/20 blur-3xl opacity-30"></div>
              
              {/* Container for the pricing cards */}
              <div className="relative flex items-center justify-center">
                {/* Pricing cards container */}
                <div className="flex items-center justify-center space-x-4 md:space-x-6">
                  
                  {/* Free Plan Card */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-2xl blur-md opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                    <div className="relative w-[200px] h-[320px] backdrop-blur-xl bg-black/60 hover:bg-black/70 rounded-2xl border border-pink-500/20 overflow-hidden shadow-lg shadow-pink-500/20 transition-all duration-300">
                      {/* Card header */}
                      <div className="bg-gradient-to-r from-pink-900/30 to-black/30 p-4 border-b border-pink-500/10">
                        <div className="text-gray-400 text-xs font-medium mb-1">FREE</div>
                        <div className="flex items-baseline">
                          <span className="text-2xl font-bold text-white">$0</span>
                          <span className="text-gray-400 text-xs ml-1">/month</span>
                        </div>
                        <div className="text-gray-400 text-xs">For individuals just starting out</div>
                      </div>
                      
                      {/* Card features */}
                      <div className="p-4">
                        <ul className="space-y-3">
                          {[
                            'Basic market analysis',
                            'Single user collaboration',
                            'Core feature access'
                            
                          ].map((feature, i) => (
                            <li key={i} className="flex items-start">
                              <svg className="w-4 h-4 text-pink-400 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              <span className="text-gray-300 text-xs">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        
                        {/* CTA Button */}
                        <div className="mt-5">
                          <div className="w-full rounded-md py-2 border border-pink-500/30 text-pink-400 text-sm font-medium text-center hover:bg-pink-500/10 transition-colors duration-300 cursor-pointer">
                            Start for Free
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Pro Plan Card - Larger and more prominent */}
                  <div className="relative group z-10 transform scale-110">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/40 to-red-400/40 rounded-2xl blur-md opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                    <div className="relative w-[220px] h-[350px] backdrop-blur-xl bg-black/60 hover:bg-black/70 rounded-2xl border border-pink-500/30 overflow-hidden shadow-xl shadow-pink-500/30 transition-all duration-300">
                      {/* Tag */}
                      <div className="absolute top-4 right-4">
                        <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs px-2 py-1 rounded-full">
                          Popular
                        </div>
                      </div>
                      
                      {/* Card header */}
                      <div className="bg-gradient-to-r from-pink-800/30 to-pink-900/30 p-5 border-b border-pink-500/20">
                        <div className="text-pink-300 text-xs font-medium mb-1">PROFESSIONAL</div>
                        <div className="flex items-baseline">
                          <span className="text-3xl font-bold text-white">$20</span>
                          <span className="text-gray-300 text-xs ml-1">/month</span>
                        </div>
                        <div className="text-gray-300 text-xs">Perfect for serious builders</div>
                      </div>
                      
                      {/* Card features */}
                      <div className="p-5">
                        <ul className="space-y-3">
                          {[
                            'Advanced market insights',
                            'AI-assisted strategy building',
                            'Email + chat support',
                            'Export & integration options'
                          ].map((feature, i) => (
                            <li key={i} className="flex items-start">
                              <svg className="w-4 h-4 text-pink-400 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              <span className="text-gray-200 text-xs">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        
                        {/* CTA Button */}
                        <div className="mt-6">
                          <div className="w-full rounded-md py-2.5 bg-gradient-to-r from-pink-500 to-red-500 text-white text-sm font-medium text-center hover:from-pink-600 hover:to-red-600 transition-colors duration-300 cursor-pointer">
                            Try for Free
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enterprise Plan Card */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-2xl blur-md opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                    <div className="relative w-[200px] h-[320px] backdrop-blur-xl bg-black/60 hover:bg-black/70 rounded-2xl border border-pink-500/20 overflow-hidden shadow-lg shadow-pink-500/20 transition-all duration-300">
                      {/* Card header */}
                      <div className="bg-gradient-to-r from-purple-900/30 to-black/30 p-4 border-b border-pink-500/10">
                        <div className="text-gray-400 text-xs font-medium mb-1">ENTERPRISE</div>
                        <div className="flex items-baseline">
                          <span className="text-2xl font-bold text-white">$50</span>
                          <span className="text-gray-400 text-xs ml-1">/month</span>
                        </div>
                        <div className="text-gray-400 text-xs">For large teams and organizations</div>
                      </div>
                      
                      {/* Card features */}
                      <div className="p-4">
                        <ul className="space-y-3">
                          {[
                            'Customizable reports & insights',
                            'Priority 24/7 support',
                            'API access & custom integrations'
                          ].map((feature, i) => (
                            <li key={i} className="flex items-start">
                              <svg className="w-4 h-4 text-pink-400 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              <span className="text-gray-300 text-xs">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        
                        {/* CTA Button */}
                        <div className="mt-5">
                          <div className="w-full rounded-md py-2 border border-pink-500/30 text-pink-400 text-sm font-medium text-center hover:bg-pink-500/10 transition-colors duration-300 cursor-pointer">
                            Contact Us
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="relative bg-black overflow-hidden">
      {/* Background Effects - matching hero section */}
      <div id="features" className="absolute inset-0">
        {/* Subtle background grain/texture effect */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
        
        {/* Subtle ambient glow orbs */}
        <div className="absolute top-2/3 left-1/4 w-96 h-96 bg-pink-600/5 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 right-1/6 w-80 h-80 bg-blue-600/5 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2s"></div>
      </div>

      {/* Main content */}      <div className="relative z-10 py-24">
        <div className="container mx-auto px-4 md:px-12 lg:px-16 xl:px-6 max-w-7xl">
          {/* Section heading */}
          <div className="text-center mb-20">
            <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-pink-500/10 to-red-500/10 text-pink-500 text-sm font-medium mb-4 border border-pink-500/20">
              Features
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Everything You Need to Build Your MVP
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              From market research to launch, our AI-powered platform streamlines the entire MVP development process.
            </p>
          </div>          {/* Feature rows */}
          <div className="space-y-56">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div                  key={idx} 
                  className={`flex flex-col ${feature.illustrationSide === 'left' ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center ${idx === 0 ? 'gap-8' : 'gap-16'} justify-center`}
                >
                  {/* Text content */}
                  <div className="flex-1 space-y-6">                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-red-500 p-3 shadow-lg shadow-pink-500/25">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <h3 className="text-3xl font-bold text-white">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-400 text-lg">
                      {feature.description}
                    </p>
                    
                    <ul className="space-y-3">                      {feature.subFeatures.map((subFeature, subIdx) => (
                        <li key={subIdx} className="flex items-start gap-2">
                          <div className="mt-1 w-4 h-4 rounded-full flex items-center justify-center bg-gradient-to-r from-pink-500 to-red-500">
                            <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                          </div>
                          <span className="text-gray-300">{subFeature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div>                      <button className="group relative px-6 py-2.5 bg-black border border-pink-500/50 rounded-full text-sm font-medium text-white hover:bg-gradient-to-r from-pink-500 to-red-500 transition-all duration-300 flex items-center gap-2">
                        Learn more
                        <svg className="w-4 h-4 transition-transform duration-300 transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                    {/* Illustration/visual */}
                  <div className="flex-1 relative">
                    {feature.illustration}
                    
                    {/* Glow effect behind illustration */}
                    <div className="absolute -inset-4 -z-10 bg-gradient-to-r from-transparent via-pink-500/10 to-transparent rounded-2xl blur-xl opacity-70"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>      {/* Custom animations */}
      <style jsx>{`
        .animation-delay-1s { animation-delay: 1s; }
        .animation-delay-2s { animation-delay: 2s; }
        .animation-delay-4s { animation-delay: 4s; }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}


