'use client';

import React from 'react';
import { ProductManagerResponse } from '../utils/agentChain';

interface ProductManagerDisplayProps {
  analysisData: ProductManagerResponse;
}

const ProductManagerDisplay: React.FC<ProductManagerDisplayProps> = ({ analysisData }) => {
  if (!analysisData) return null;

  const getPriorityColor = (priority: string) => {
    switch(priority.toUpperCase()) {
      case 'HIGH':
        return 'bg-pink-500/20 text-pink-300 ring-2 ring-pink-500/40 shadow-pink-500/20';
      case 'MEDIUM':
        return 'bg-yellow-500/20 text-yellow-300 ring-2 ring-yellow-500/40 shadow-yellow-500/20';
      case 'LOW':
        return 'bg-green-500/20 text-green-300 ring-2 ring-green-500/40 shadow-green-500/20';
      default:
        return 'bg-gray-700/40 text-gray-200';
    }
  };
  return (
    <div className="space-y-8 w-full">      {/* Startup Idea Header */}
      <section className="bg-black/70 border border-pink-500/25 rounded-2xl shadow-lg shadow-pink-500/10 p-6 backdrop-blur-lg relative overflow-hidden">
        <div className="absolute -z-10 top-0 right-0 w-1/3 h-1/3 rounded-full bg-pink-600/10 blur-xl"></div>
        <div className="absolute -z-10 bottom-0 left-1/4 w-1/3 h-1/3 rounded-full bg-red-500/10 blur-xl"></div>
        
        <div className="flex flex-col md:flex-row md:justify-between md:items-center relative z-10">
          <div>
            <div className="inline-flex items-center px-3 py-1 mb-4 bg-pink-500/15 rounded-full text-xs text-pink-200 font-semibold backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"></path>
              </svg>
              PRODUCT ROADMAP
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-300 to-red-300 bg-clip-text text-transparent mb-2">
              Product Planning Document
            </h1>
            <p className="text-gray-300 text-lg">
              Strategic features and development timeline for your product
            </p>
          </div>
        </div>
      </section>
        {/* User Personas Section */}
      <section className="bg-black/70 border border-pink-500/25 rounded-2xl shadow-lg shadow-pink-500/10 p-6 backdrop-blur-lg relative overflow-hidden">
        <div className="absolute -z-10 top-1/3 right-1/3 w-1/3 h-1/2 rounded-full bg-pink-600/5 blur-xl"></div>
        <div className="absolute -z-10 bottom-0 left-0 w-1/4 h-1/4 rounded-full bg-red-500/10 blur-xl"></div>
        
        <h2 className="text-2xl font-bold text-pink-300 mb-6 flex items-center relative z-10">
          <span className="bg-pink-500/15 rounded-full p-2 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
              <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </span>
          User Personas
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          {analysisData.user_personas.map((persona, index) => (
            <div key={index} className="border border-pink-500/25 rounded-xl p-5 bg-black/60 backdrop-blur-lg relative overflow-hidden">
              <div className="absolute -z-10 top-0 right-0 w-1/4 h-1/2 rounded-full bg-pink-600/10 blur-xl"></div>
              <div className="absolute -z-10 bottom-0 left-0 w-1/3 h-1/3 rounded-full bg-red-500/10 blur-xl"></div>
              
              <div className="flex justify-between items-start mb-3 relative z-10">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500/15 to-red-500/15 rounded-full flex items-center justify-center mr-3">
                    <span className="text-pink-200 font-bold">{persona.name.charAt(0)}</span>
                  </div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-pink-200 to-red-200 bg-clip-text text-transparent">
                    {persona.name}
                  </h3>
                </div>
                <span className="px-3 py-1.5 bg-black/50 text-pink-300 text-xs rounded-full font-semibold backdrop-blur-lg border border-pink-500/15">
                  {persona.tech_savviness} Tech Savviness
                </span>
              </div>              <div className="bg-black/40 p-4 rounded-lg mb-4 relative z-10 border border-pink-500/10 backdrop-blur-sm">
                <p className="text-gray-100">{persona.description}</p>
              </div>
              
              {/* Demographics */}
              <div className="mb-4">
                <div className="flex items-center mb-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500/20 to-red-500/20 flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-100">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <h4 className="font-bold text-base text-pink-200">Demographics</h4>
                </div>
                <div className="bg-black/50 p-3 rounded-lg border border-pink-500/15 ml-8">
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(persona.demographics).map(([key, value]) => (
                      <div key={key} className="mb-1 text-sm">
                        <span className="font-medium text-pink-200">{key.charAt(0).toUpperCase() + key.slice(1)}: </span>
                        <span className="text-gray-100">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Pain Points */}
              <div className="mb-4">
                <div className="flex items-center mb-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500/20 to-red-500/20 flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-100">
                      <path d="m18 6-6-6-6 6"></path>
                      <path d="m6 6 6 6 6-6"></path>
                      <path d="M12 12v9"></path>
                    </svg>
                  </div>
                  <h4 className="font-bold text-base text-pink-200">Pain Points</h4>
                </div>
                <ul className="space-y-2 ml-8">
                  {persona.pain_points.map((point, idx) => (
                    <li key={idx} className="text-gray-100 flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-pink-400 mr-2 mt-2"></span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>                {/* Goals */}
              <div className="mb-4">
                <div className="flex items-center mb-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500/20 to-red-500/20 flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-100">
                      <circle cx="12" cy="12" r="10"></circle>
                      <circle cx="12" cy="12" r="6"></circle>
                      <circle cx="12" cy="12" r="2"></circle>
                    </svg>
                  </div>
                  <h4 className="font-bold text-base text-pink-200">Goals</h4>
                </div>
                <ul className="space-y-2 ml-8">
                  {persona.goals.map((goal, idx) => (
                    <li key={idx} className="text-gray-100 flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-pink-400 mr-2 mt-2"></span>
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Behaviors */}
              <div className="mb-4">
                <div className="flex items-center mb-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500/20 to-red-500/20 flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-100">
                      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                      <line x1="12" x2="12" y1="19" y2="22"></line>
                    </svg>
                  </div>
                  <h4 className="font-bold text-base text-pink-200">Behaviors</h4>
                </div>
                <ul className="space-y-2 ml-8">
                  {persona.behaviors.map((behavior, idx) => (
                    <li key={idx} className="text-gray-100 flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-pink-400 mr-2 mt-2"></span>
                      <span>{behavior}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Needs */}
              <div>
                <div className="flex items-center mb-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500/20 to-red-500/20 flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-100">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                    </svg>
                  </div>
                  <h4 className="font-bold text-base text-pink-200">Needs</h4>
                </div>
                <ul className="space-y-2 ml-8">
                  {persona.needs.map((need, idx) => (
                    <li key={idx} className="text-gray-100 flex items-start">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-pink-400 mr-2 mt-2"></span>
                      <span>{need}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
        {/* Features Section */}
      <section className="bg-black/70 border border-pink-500/25 rounded-2xl shadow-lg shadow-pink-500/10 p-6 backdrop-blur-lg relative overflow-hidden">
        <div className="absolute -z-10 top-0 right-0 w-1/3 h-1/3 rounded-full bg-pink-600/10 blur-xl"></div>
        <div className="absolute -z-10 bottom-1/4 left-1/4 w-1/3 h-1/3 rounded-full bg-red-600/5 blur-xl"></div>
          <h2 className="text-2xl font-bold text-pink-300 mb-6 flex items-center relative z-10">
          <span className="bg-gradient-to-br from-pink-500/20 to-red-500/20 rounded-full p-2.5 mr-3 border border-pink-500/30 shadow-md shadow-pink-500/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
              <path d="M11 12H3"></path>
              <path d="M16 6H3"></path>
              <path d="M16 18H3"></path>
              <path d="M18 9v6"></path>
              <path d="M21 12h-3"></path>
            </svg>
          </span>
          <div>
            <span className="bg-gradient-to-r from-pink-300 via-white to-red-300 bg-clip-text text-transparent drop-shadow">Features</span>
            <div className="text-sm font-normal text-gray-400 mt-1">Key product features with detailed metrics and user stories</div>
          </div>
        </h2>
        
        <div className="space-y-6 relative z-10">
          {analysisData.features.map((feature, index) => (
            <div key={index} className="border border-pink-500/25 rounded-xl p-5 bg-black/60 backdrop-blur-lg relative overflow-hidden">
              <div className="absolute -z-10 top-0 right-0 w-1/4 h-1/2 rounded-full bg-pink-600/10 blur-xl"></div>
              <div className="absolute -z-10 bottom-0 left-0 w-1/3 h-1/3 rounded-full bg-red-500/10 blur-xl"></div>              <div className="relative mb-5 z-10">
                <div className="flex justify-between items-start bg-gradient-to-br from-black/90 to-black/70 p-4 rounded-xl border border-pink-500/25 shadow-lg shadow-pink-500/5 backdrop-blur-sm">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-pink-500/40 to-red-500/40 rounded-full flex items-center justify-center shadow-md shadow-pink-500/20 border border-pink-500/30">
                        <span className="text-2xl font-bold text-white">{index + 1}</span>
                      </div>
                    </div>
                    <div className="ml-4 flex flex-col justify-center">
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-100 via-white to-red-100 bg-clip-text text-transparent drop-shadow-lg">
                        {feature.name}
                      </h3>
                      <div className="flex items-center mt-2 text-sm text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-300 mr-2">
                          <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"></path>
                          <path d="m7.5 4.27 9 5.15"></path>
                          <path d="M3.29 7 12 12l8.71-5"></path>
                          <path d="M12 22V12"></path>
                          <circle cx="18.5" cy="15.5" r="2.5"></circle>
                          <path d="M20.27 17.27 22 19"></path>
                        </svg>
                        <span className="font-medium">Feature ID:</span> {`F${index + 1}`}
                      </div>
                    </div>
                  </div>
                  
                  <span className={`px-5 py-2 text-sm rounded-lg font-bold ${getPriorityColor(feature.priority)} backdrop-blur-sm shadow-lg`}>
                    {feature.priority} Priority
                  </span>
                </div>
              </div>
                <div className="bg-gradient-to-br from-black/80 to-black/60 p-5 rounded-xl mb-6 relative z-10 border border-pink-500/30 shadow-lg shadow-pink-500/10 backdrop-blur-sm">
                <div className="flex items-center mb-3 border-b border-pink-500/20 pb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500/25 to-red-500/25 flex items-center justify-center mr-3 border border-pink-500/20">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                  <h4 className="text-base font-semibold text-pink-200 uppercase tracking-wider">Feature Description</h4>
                </div>
                <div className="bg-black/40 p-4 rounded-lg shadow-inner shadow-pink-500/5 border border-pink-500/10">
                  <p className="text-gray-100">{feature.description}</p>
                </div>
              </div><div className="mb-8 mt-4 relative">
                  <div className="absolute -z-10 top-0 right-0 w-1/4 h-1/2 rounded-full bg-pink-600/10 blur-xl"></div>
                  <h4 className="font-bold text-xl text-pink-300 mb-5 border-b border-pink-500/20 pb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-300 mr-3">
                      <path d="M12 20V4"></path>
                      <path d="M4 8l8-4 8 4"></path>
                      <path d="m4 12 8 4 8-4"></path>
                      <path d="m4 16 8 4 8-4"></path>
                    </svg>
                    Feature Key Metrics
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* Effort Card */}
                    <div className="bg-gradient-to-br from-black/80 to-black/60 p-5 rounded-xl border border-pink-500/30 shadow-lg shadow-pink-500/10 backdrop-blur-sm relative overflow-hidden group hover:border-pink-500/50 transition-all duration-300">
                      <div className="absolute -z-10 top-0 right-0 w-1/2 h-1/2 rounded-full bg-pink-600/10 blur-xl group-hover:bg-pink-600/15 transition-all duration-300"></div>
                      
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500/30 to-red-500/30 flex items-center justify-center mr-3 border border-pink-500/20 shadow-md shadow-pink-500/10">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                              <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"></path>
                              <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                            </svg>
                          </div>
                          <div>
                            <h5 className="text-base font-bold text-pink-200 uppercase tracking-wider">Effort</h5>
                            <p className="text-xs text-gray-400">Resource intensity</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-black/70 border border-pink-500/40 shadow-inner shadow-pink-500/20">
                          <span className="text-3xl font-bold bg-gradient-to-r from-pink-100 to-red-100 bg-clip-text text-transparent">{feature.effort}</span>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="mt-2 mb-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-xs font-medium text-pink-200">{feature.effort} / 10</span>
                          <span className="text-xs text-gray-400">{(feature.effort * 10)}% Intensity</span>
                        </div>
                        <div className="h-3 bg-black/60 rounded-full overflow-hidden border border-pink-500/20">
                          <div 
                            className="h-full bg-gradient-to-r from-pink-500/70 to-red-500/70 rounded-full shadow-inner shadow-pink-500/20" 
                            style={{ width: `${feature.effort * 10}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex justify-between mt-1.5 px-1">
                        <span className="text-xs text-gray-400">Low Effort</span>
                        <span className="text-xs text-gray-400">High Effort</span>
                      </div>
                    </div>
                    
                    {/* Impact Card */}
                    <div className="bg-gradient-to-br from-black/80 to-black/60 p-5 rounded-xl border border-pink-500/30 shadow-lg shadow-pink-500/10 backdrop-blur-sm relative overflow-hidden group hover:border-pink-500/50 transition-all duration-300">
                      <div className="absolute -z-10 bottom-0 left-0 w-1/2 h-1/2 rounded-full bg-blue-500/10 blur-xl group-hover:bg-blue-500/15 transition-all duration-300"></div>
                      
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/30 to-green-500/30 flex items-center justify-center mr-3 border border-green-500/20 shadow-md shadow-green-500/10">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-200">
                              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                              <path d="M12 14v-4"></path>
                            </svg>
                          </div>
                          <div>
                            <h5 className="text-base font-bold text-green-200 uppercase tracking-wider">Impact</h5>
                            <p className="text-xs text-gray-400">Business value</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-black/70 border border-green-500/40 shadow-inner shadow-green-500/20">
                          <span className="text-3xl font-bold bg-gradient-to-r from-green-100 to-blue-100 bg-clip-text text-transparent">{feature.impact}</span>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="mt-2 mb-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-xs font-medium text-green-200">{feature.impact} / 10</span>
                          <span className="text-xs text-gray-400">{(feature.impact * 10)}% Value</span>
                        </div>
                        <div className="h-3 bg-black/60 rounded-full overflow-hidden border border-green-500/20">
                          <div 
                            className="h-full bg-gradient-to-r from-green-500/70 to-blue-500/70 rounded-full shadow-inner shadow-green-500/20" 
                            style={{ width: `${feature.impact * 10}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex justify-between mt-1.5 px-1">
                        <span className="text-xs text-gray-400">Low Impact</span>
                        <span className="text-xs text-gray-400">High Impact</span>
                      </div>
                    </div>
                    
                    {/* Technical Complexity Card */}
                    <div className="bg-gradient-to-br from-black/80 to-black/60 p-5 rounded-xl border border-pink-500/30 shadow-lg shadow-pink-500/10 backdrop-blur-sm relative overflow-hidden group hover:border-pink-500/50 transition-all duration-300">
                      <div className="absolute -z-10 top-0 right-0 w-1/2 h-1/2 rounded-full bg-yellow-600/10 blur-xl group-hover:bg-yellow-600/15 transition-all duration-300"></div>
                      
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500/30 to-red-500/30 flex items-center justify-center mr-3 border border-yellow-500/20 shadow-md shadow-yellow-500/10">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-200">
                              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                            </svg>
                          </div>
                          <div>
                            <h5 className="text-base font-bold text-yellow-200 uppercase tracking-wider">Complexity</h5>
                            <p className="text-xs text-gray-400">Development difficulty</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-black/70 border border-yellow-500/40 shadow-inner shadow-yellow-500/20">
                          <span className="text-3xl font-bold bg-gradient-to-r from-yellow-100 to-red-100 bg-clip-text text-transparent">{feature.technical_complexity}</span>
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="mt-2 mb-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-xs font-medium text-yellow-200">{feature.technical_complexity} / 10</span>
                          <span className="text-xs text-gray-400">{(feature.technical_complexity * 10)}% Complexity</span>
                        </div>
                        <div className="h-3 bg-black/60 rounded-full overflow-hidden border border-yellow-500/20">
                          <div 
                            className="h-full bg-gradient-to-r from-yellow-500/70 to-red-500/70 rounded-full shadow-inner shadow-yellow-500/20" 
                            style={{ width: `${feature.technical_complexity * 10}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex justify-between mt-1.5 px-1">
                        <span className="text-xs text-gray-400">Simple</span>
                        <span className="text-xs text-gray-400">Complex</span>
                      </div>
                    </div>
                  </div>
                </div>                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* User Stories */}
                <div className="bg-gradient-to-br from-black/80 to-black/60 p-5 rounded-xl border border-pink-500/30 shadow-lg shadow-pink-500/10 backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute -z-10 top-0 right-0 w-1/3 h-1/3 rounded-full bg-pink-600/10 blur-xl"></div>
                  
                  <div className="flex items-center mb-4 border-b border-pink-500/20 pb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500/25 to-red-500/25 flex items-center justify-center mr-3 border border-pink-500/20">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                        <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5Z"></path>
                        <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"></path>
                      </svg>
                    </div>
                    <h4 className="font-semibold text-base text-pink-200 uppercase tracking-wider">User Stories</h4>
                    <span className="ml-3 bg-pink-500/25 text-xs font-bold text-pink-200 px-3 py-1 rounded-full border border-pink-500/20 shadow-inner shadow-pink-500/5">
                      {feature.user_stories.length}
                    </span>
                  </div>
                  
                  <div className="max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                    <ul className="space-y-3">
                      {feature.user_stories.map((story, idx) => (
                        <li key={idx} className="text-gray-100 flex items-start bg-black/60 p-4 rounded-lg border border-pink-500/20 shadow-inner shadow-pink-500/5">
                          <div className="flex-shrink-0 mt-0.5 mr-3">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500/20 to-red-500/20 flex items-center justify-center border border-pink-500/10">
                              <span className="text-xs font-bold text-pink-200">{idx + 1}</span>
                            </div>
                          </div>
                          <span className="text-sm">{story}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Target Personas */}
                <div className="bg-gradient-to-br from-black/80 to-black/60 p-5 rounded-xl border border-pink-500/30 shadow-lg shadow-pink-500/10 backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute -z-10 bottom-0 left-0 w-1/3 h-1/3 rounded-full bg-red-500/10 blur-xl"></div>
                  
                  <div className="flex items-center mb-4 border-b border-pink-500/20 pb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500/25 to-red-500/25 flex items-center justify-center mr-3 border border-pink-500/20">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                    <h4 className="font-semibold text-base text-pink-200 uppercase tracking-wider">Target Personas</h4>
                    <span className="ml-3 bg-pink-500/25 text-xs font-bold text-pink-200 px-3 py-1 rounded-full border border-pink-500/20 shadow-inner shadow-pink-500/5">
                      {feature.target_personas.length}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {feature.target_personas.map((persona, idx) => (
                      <div key={idx} className="bg-black/60 p-3 rounded-lg border border-pink-500/20 flex items-center shadow-inner shadow-pink-500/5">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500/25 to-red-500/25 flex items-center justify-center mr-2.5 flex-shrink-0 border border-pink-500/15">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                        </div>
                        <span className="text-pink-200 text-sm font-medium">{persona}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>                {/* Dependencies and Success Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {feature.dependencies.length > 0 && (
                  <div className="bg-gradient-to-br from-black/80 to-black/60 p-5 rounded-xl border border-pink-500/30 shadow-lg shadow-pink-500/10 backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute -z-10 top-0 right-0 w-1/3 h-1/3 rounded-full bg-purple-600/10 blur-xl"></div>
                    
                    <div className="flex items-center mb-3 border-b border-pink-500/20 pb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/25 to-blue-500/25 flex items-center justify-center mr-3 border border-purple-500/20">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-200">
                          <path d="M9 12h6"></path>
                          <path d="M12 9v6"></path>
                          <path d="M11 5h2V3h-2v2Z"></path>
                          <path d="M3 11v2h2v-2H3Z"></path>
                          <path d="M19 11v2h2v-2h-2Z"></path>
                          <path d="M11 19h2v2h-2v-2Z"></path>
                        </svg>
                      </div>
                      <h4 className="font-semibold text-base text-purple-200 uppercase tracking-wider">Dependencies</h4>
                      <span className="ml-3 bg-purple-500/20 text-xs font-bold text-purple-200 px-3 py-1 rounded-full border border-purple-500/20 shadow-inner shadow-purple-500/5">
                        {feature.dependencies.length}
                      </span>
                    </div>
                    
                    <div className="bg-black/50 p-4 rounded-lg border border-purple-500/15">
                      <ul className="space-y-2.5">
                        {feature.dependencies.map((dependency, idx) => (
                          <li key={idx} className="text-gray-100 flex items-start">
                            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mr-2.5 mt-0.5 border border-purple-500/10">
                              <span className="text-[10px] font-bold text-purple-200">{idx + 1}</span>
                            </div>
                            <span>{dependency}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
                
                <div className="bg-gradient-to-br from-black/80 to-black/60 p-5 rounded-xl border border-pink-500/30 shadow-lg shadow-pink-500/10 backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute -z-10 bottom-0 left-0 w-1/3 h-1/3 rounded-full bg-blue-600/10 blur-xl"></div>
                  
                  <div className="flex items-center mb-3 border-b border-pink-500/20 pb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/25 to-green-500/25 flex items-center justify-center mr-3 border border-blue-500/20">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-200">
                        <path d="M3 3v18h18"></path>
                        <path d="m19 9-5 5-4-4-3 3"></path>
                      </svg>
                    </div>
                    <h4 className="font-semibold text-base text-blue-200 uppercase tracking-wider">Success Metrics</h4>
                    <span className="ml-3 bg-blue-500/20 text-xs font-bold text-blue-200 px-3 py-1 rounded-full border border-blue-500/20 shadow-inner shadow-blue-500/5">
                      {feature.metrics.length}
                    </span>
                  </div>
                  
                  <div className="bg-black/50 p-4 rounded-lg border border-blue-500/15">
                    <ul className="space-y-2.5">
                      {feature.metrics.map((metric, idx) => (
                        <li key={idx} className="text-gray-100 flex items-start">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-blue-500/20 to-green-500/20 flex items-center justify-center mr-2.5 mt-0.5 border border-blue-500/10">
                            <span className="text-[10px] font-bold text-blue-200">{idx + 1}</span>
                          </div>
                          <span>{metric}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
        {/* Development Roadmap */}
      <section className="bg-black/70 border border-pink-500/25 rounded-2xl shadow-lg shadow-pink-500/10 p-6 backdrop-blur-lg relative overflow-hidden">
        <div className="absolute -z-10 top-0 right-0 w-1/3 h-1/3 rounded-full bg-pink-600/10 blur-xl"></div>
        <div className="absolute -z-10 bottom-1/4 left-1/4 w-1/3 h-1/3 rounded-full bg-red-600/5 blur-xl"></div>
        
        <h2 className="text-2xl font-bold text-pink-300 mb-6 flex items-center relative z-10">
          <span className="bg-pink-500/15 rounded-full p-2 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
              <path d="M12 2v4"></path>
              <path d="M12 18v4"></path>
              <path d="m4.93 4.93 2.83 2.83"></path>
              <path d="m16.24 16.24 2.83 2.83"></path>
              <path d="M2 12h4"></path>
              <path d="M18 12h4"></path>
              <path d="m4.93 19.07 2.83-2.83"></path>
              <path d="m16.24 7.76 2.83-2.83"></path>
            </svg>
          </span>
          Development Roadmap
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {/* MVP Features */}
          <div className="border border-pink-500/15 rounded-xl p-5 bg-black/60 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute -z-10 top-0 right-0 w-1/3 h-1/3 rounded-full bg-pink-600/5 blur-xl"></div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-500/15 to-red-500/15 rounded-full flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-pink-200">MVP Features</h3>
            </div>
            <ul className="space-y-2 ml-2">
              {analysisData.mvp_features.map((feature, index) => (
                <li key={index} className="text-gray-100 flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-pink-400 mr-2 mt-2"></span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Milestone 1 Features */}
          <div className="border border-pink-500/15 rounded-xl p-5 bg-black/60 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute -z-10 bottom-0 left-0 w-1/3 h-1/3 rounded-full bg-red-600/5 blur-xl"></div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-500/15 to-red-500/15 rounded-full flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                  <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"></path>
                  <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"></path>
                  <path d="M4 15v-3a6 6 0 0 1 6-6h0"></path>
                  <path d="M14 6h0a6 6 0 0 1 6 6v3"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-pink-200">Milestone 1 Features</h3>
            </div>
            <ul className="space-y-2 ml-2">
              {analysisData.milestone_1_features.map((feature, index) => (
                <li key={index} className="text-gray-100 flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-pink-400 mr-2 mt-2"></span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Milestone 2 Features */}
          <div className="border border-pink-500/15 rounded-xl p-5 bg-black/60 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute -z-10 center right-0 w-1/4 h-1/4 rounded-full bg-pink-600/5 blur-xl"></div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-500/15 to-red-500/15 rounded-full flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                  <path d="M6 9H4.5a2.5 2.5 0 0 0 0 5H6"></path>
                  <path d="M18 9h1.5a2.5 2.5 0 0 1 0 5H18"></path>
                  <path d="M8 9h8"></path>
                  <path d="M8 15h8"></path>
                  <path d="M8 5v14"></path>
                  <path d="M16 5v14"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-pink-200">Milestone 2 Features</h3>
            </div>
            <ul className="space-y-2 ml-2">
              {analysisData.milestone_2_features.map((feature, index) => (
                <li key={index} className="text-gray-100 flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-pink-400 mr-2 mt-2"></span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
        {/* Validation Experiments */}
      <section className="bg-black/70 border border-pink-500/25 rounded-2xl shadow-lg shadow-pink-500/10 p-6 backdrop-blur-lg relative overflow-hidden">
        <div className="absolute -z-10 top-0 right-0 w-1/3 h-1/3 rounded-full bg-pink-600/10 blur-xl"></div>
        <div className="absolute -z-10 bottom-1/4 left-1/4 w-1/3 h-1/3 rounded-full bg-red-600/5 blur-xl"></div>
        
        <h2 className="text-2xl font-bold text-pink-300 mb-6 flex items-center relative z-10">
          <span className="bg-pink-500/15 rounded-full p-2 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <path d="M12 18v-6"></path>
              <path d="M8 15h8"></path>
            </svg>
          </span>
          Validation Experiments
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          {analysisData.validation_experiments.map((experiment, index) => (
            <div key={index} className="border border-pink-500/15 rounded-xl p-5 bg-black/60 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute -z-10 top-0 right-0 w-1/4 h-1/3 rounded-full bg-pink-600/5 blur-xl"></div>
              <div className="absolute -z-10 bottom-0 left-0 w-1/3 h-1/4 rounded-full bg-red-500/5 blur-xl"></div>
              
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-pink-500/15 to-red-500/15 rounded-full flex items-center justify-center mr-3">
                  <span className="text-pink-200 font-bold">{index + 1}</span>
                </div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-pink-200 to-red-200 bg-clip-text text-transparent">
                  {experiment.name}
                </h3>
              </div>
              
              <div className="bg-black/40 p-4 rounded-lg mb-4 border border-pink-500/10 backdrop-blur-sm">
                <p className="text-gray-100">{experiment.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-black/50 p-3 rounded-lg border border-pink-500/15 backdrop-blur-sm">
                  <div className="flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200 mr-2">
                      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
                      <path d="M5 3v4"></path>
                      <path d="M19 17v4"></path>
                      <path d="M3 5h4"></path>
                      <path d="M17 19h4"></path>
                    </svg>
                    <span className="font-medium text-pink-200">Method</span>
                  </div>
                  <p className="text-gray-100 ml-6">{experiment.method}</p>
                </div>
                
                <div className="bg-black/50 p-3 rounded-lg border border-pink-500/15 backdrop-blur-sm">
                  <div className="flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200 mr-2">
                      <polyline points="9 11 12 14 22 4"></polyline>
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                    </svg>
                    <span className="font-medium text-pink-200">Success Criteria</span>
                  </div>
                  <p className="text-gray-100 ml-6">{experiment.success_criteria}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
        {/* Success Metrics */}
      <section className="bg-black/70 border border-pink-500/25 rounded-2xl shadow-lg shadow-pink-500/10 p-6 backdrop-blur-lg relative overflow-hidden">
        <div className="absolute -z-10 top-0 right-0 w-1/3 h-1/3 rounded-full bg-pink-600/10 blur-xl"></div>
        <div className="absolute -z-10 bottom-1/4 left-1/4 w-1/3 h-1/3 rounded-full bg-red-600/5 blur-xl"></div>
        
        <h2 className="text-2xl font-bold text-pink-300 mb-6 flex items-center relative z-10">
          <span className="bg-pink-500/15 rounded-full p-2 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
              <path d="M12 20V10"></path>
              <path d="M18 20V4"></path>
              <path d="M6 20v-4"></path>
            </svg>
          </span>
          Success Metrics
        </h2>
        
        <div className="bg-black/60 p-5 rounded-xl border border-pink-500/15 backdrop-blur-sm relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(analysisData.success_metrics).map(([key, value], index) => (
              <div key={index} className="bg-black/40 rounded-lg p-4 border border-pink-500/15 relative overflow-hidden">
                <div className="absolute -z-10 top-0 right-0 w-1/4 h-1/4 rounded-full bg-pink-600/5 blur-xl"></div>
                
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-pink-500/15 to-red-500/15 rounded-full flex items-center justify-center mr-3">
                    <span className="text-pink-200 font-bold">{index + 1}</span>
                  </div>
                  <h3 className="font-bold text-pink-200 text-base">{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h3>
                </div>
                <div className="ml-11">
                  <p className="text-gray-100">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>      </section>

      {/* Footer */}
      <footer className="mt-12 border-t border-pink-500/15 pt-6 text-center">
        <div className="flex justify-center items-center mb-4 space-x-3">
          <div className="w-10 h-10 bg-black/60 border border-pink-500/20 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-300">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect width="4" height="12" x="2" y="9"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </div>
          <div className="w-10 h-10 bg-black/60 border border-pink-500/20 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-300">
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
            </svg>
          </div>
          <div className="w-10 h-10 bg-black/60 border border-pink-500/20 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-300">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
            </svg>
          </div>
        </div>
        <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Startup MVP Builder. All rights reserved.</p>
        <p className="text-gray-500 text-xs mt-2">A powerful tool for validating startup ideas and building market-ready MVPs</p>
      </footer>
    </div>
  );
};

export default ProductManagerDisplay;
