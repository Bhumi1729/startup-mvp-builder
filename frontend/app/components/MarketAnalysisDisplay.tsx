'use client';

import React from 'react';
import { MarketAnalystResponse } from '../utils/agentChain';

interface MarketAnalysisDisplayProps {
  analysisData: MarketAnalystResponse;
}

const MarketAnalysisDisplay: React.FC<MarketAnalysisDisplayProps> = ({ analysisData }) => {
  if (!analysisData) return null;
  return (
    <div className="space-y-8 w-full">      {/* Startup Idea and Analysis Date */}
      <section className="bg-gradient-to-br from-black/90 to-black/70 border border-pink-500/30 rounded-2xl shadow-lg shadow-pink-500/10 p-8 backdrop-blur-lg relative overflow-hidden">
        <div className="absolute -z-10 top-1/2 left-1/4 w-1/2 h-1/2 rounded-full bg-pink-600/10 blur-2xl"></div>
        <div className="absolute -z-10 top-0 right-0 w-1/3 h-1/3 rounded-full bg-red-500/10 blur-xl"></div>
        
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 relative z-10">
          <div className="flex-1">            <div className="inline-flex items-center px-3 py-1 mb-4 bg-pink-500/15 rounded-full text-xs text-pink-200 font-semibold backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
              MARKET ANALYSIS REPORT
            </div><h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-300 to-red-300 bg-clip-text text-transparent mb-2">
              Market Analysis Report
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl">
              Comprehensive market analysis and competitive insights for your startup idea.
            </p>
          </div>
          
          {analysisData.analysis_date && (
            <div className="flex flex-col items-end">              <div className="bg-black/60 backdrop-blur-md p-3 rounded-lg border border-pink-500/15">
                <div className="text-sm text-gray-400 mb-1">Analysis Date</div>
                <div className="text-white font-medium">
                  {new Date(analysisData.analysis_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>        {/* Executive Summary */}
      <section className="bg-black/70 border border-pink-500/25 rounded-2xl shadow-lg shadow-pink-500/10 p-6 backdrop-blur-lg relative overflow-hidden">
        <div className="absolute -z-10 bottom-0 right-1/4 w-1/3 h-1/2 rounded-full bg-red-500/10 blur-xl"></div>
        <h2 className="text-2xl font-bold text-pink-400 mb-6 flex items-center relative z-10">
          <span className="bg-pink-500/20 rounded-full p-2 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-300">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <path d="M14 2v6h6"></path>
              <path d="M16 13H8"></path>
              <path d="M16 17H8"></path>
              <path d="M10 9H8"></path>
            </svg>
          </span>
          Executive Summary
        </h2>        <div className="relative z-10 bg-black/50 rounded-xl p-5 backdrop-blur-sm border border-pink-500/15">
          <blockquote className="border-l-4 border-pink-500/30 pl-4 italic text-lg text-white leading-relaxed">
            {analysisData.executive_summary}
          </blockquote>
        </div>
      </section>        {/* Market Sizing */}
      <section className="bg-black/70 border border-pink-500/25 rounded-2xl shadow-lg shadow-pink-500/10 p-6 backdrop-blur-lg relative overflow-hidden">
        <div className="absolute -z-10 top-0 left-1/3 w-1/3 h-1/2 rounded-full bg-pink-600/5 blur-xl"></div>
        <h2 className="text-2xl font-bold text-pink-400 mb-6 flex items-center relative z-10">
          <span className="bg-pink-500/20 rounded-full p-2 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-300">
              <path d="M3 3v18h18"></path>
              <path d="m19 9-5 5-4-4-3 3"></path>
            </svg>
          </span>
          Market Sizing
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-black/40 rounded-xl p-4 backdrop-blur-sm border border-pink-500/20 flex flex-col">
            <h3 className="text-lg font-bold text-pink-300 mb-2">Total Addressable Market</h3>
            <div className="text-3xl font-bold text-white mt-auto">{analysisData.market_sizing.total_addressable_market || "N/A"}</div>
          </div>
          <div className="bg-black/40 rounded-xl p-4 backdrop-blur-sm border border-pink-500/20 flex flex-col">
            <h3 className="text-lg font-bold text-pink-300 mb-2">Serviceable Addressable Market</h3>
            <div className="text-3xl font-bold text-white mt-auto">{analysisData.market_sizing.serviceable_addressable_market || "N/A"}</div>
          </div>
          <div className="bg-black/40 rounded-xl p-4 backdrop-blur-sm border border-pink-500/20 flex flex-col">
            <h3 className="text-lg font-bold text-pink-300 mb-2">Serviceable Obtainable Market</h3>
            <div className="text-3xl font-bold text-white mt-auto">{analysisData.market_sizing.serviceable_obtainable_market || "N/A"}</div>
          </div>
          <div className="bg-black/40 rounded-xl p-4 backdrop-blur-sm border border-pink-500/20 flex flex-col">
            <h3 className="text-lg font-bold text-pink-300 mb-2">Market Growth Rate</h3>
            <div className="text-3xl font-bold text-white mt-auto">{analysisData.market_sizing.market_growth_rate || "N/A"}</div>
          </div>
          {analysisData.market_sizing.geographic_distribution && (
            <div className="md:col-span-2 bg-black/40 rounded-xl p-4 backdrop-blur-sm border border-pink-500/20">
              <h3 className="text-lg font-bold text-pink-300 mb-3">Geographic Distribution</h3>
              <div className="flex flex-wrap gap-3">
                {Object.entries(analysisData.market_sizing.geographic_distribution).map(([key, value]) => (
                  <div key={key} className="px-3 py-2 bg-black/50 rounded-lg border border-pink-500/10">
                    <span className="font-medium text-pink-200">{key}:</span> <span className="text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>      {/* Market Trends */}
      <section className="bg-black/70 border border-pink-500/25 rounded-2xl shadow-lg shadow-pink-500/10 p-6 backdrop-blur-lg relative overflow-hidden">
        <div className="absolute -z-10 top-1/3 right-1/3 w-1/3 h-1/2 rounded-full bg-pink-600/5 blur-xl"></div>
        <div className="absolute -z-10 bottom-0 left-0 w-1/4 h-1/4 rounded-full bg-red-500/10 blur-xl"></div>
        <h2 className="text-2xl font-bold text-pink-400 mb-6 flex items-center relative z-10">
          <span className="bg-pink-500/20 rounded-full p-2 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-300">
              <path d="m6 16 6-12 6 12"></path>
              <path d="M8 12h8"></path>
            </svg>
          </span>
          Market Trends
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          <div className="bg-black/40 rounded-xl p-4 backdrop-blur-sm border border-pink-500/20">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500/30 to-red-500/30 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                  <path d="M12 2v20"></path>
                  <path d="m6 16 6-12 6 12"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-pink-300">Emerging Trends</h3>
            </div>
            <ul className="space-y-2 ml-10">
              {analysisData.market_trends.emerging_trends.map((trend, index) => (
                <li key={index} className="text-gray-100 flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-pink-400 mr-2 mt-2"></span>
                  <span>{trend}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-black/40 rounded-xl p-4 backdrop-blur-sm border border-pink-500/20">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500/30 to-red-500/30 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-pink-300">Technology Trends</h3>
            </div>
            <ul className="space-y-2 ml-10">
              {analysisData.market_trends.technology_trends.map((trend, index) => (
                <li key={index} className="text-gray-100 flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-pink-400 mr-2 mt-2"></span>
                  <span>{trend}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-black/40 rounded-xl p-4 backdrop-blur-sm border border-pink-500/20">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500/30 to-red-500/30 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-pink-300">Consumer Behavior</h3>
            </div>
            <ul className="space-y-2 ml-10">
              {analysisData.market_trends.consumer_behavior.map((behavior, index) => (
                <li key={index} className="text-gray-100 flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-pink-400 mr-2 mt-2"></span>
                  <span>{behavior}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-black/40 rounded-xl p-4 backdrop-blur-sm border border-pink-500/20">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500/30 to-red-500/30 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                  <path d="m2 9 3-3 3 3"></path>
                  <path d="M13 18H7a2 2 0 0 1-2-2v-7"></path>
                  <path d="M22 6V4a2 2 0 0 0-2-2h-7.93a2 2 0 0 0-1.66.9l-.41.59"></path>
                  <path d="M17 10h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-5.7"></path>
                  <path d="M11 20a3 3 0 1 1 0-6a3 3 0 0 1 0 6Z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-pink-300">Regulatory Factors</h3>
            </div>
            <ul className="space-y-2 ml-10">
              {analysisData.market_trends.regulatory_factors.map((factor, index) => (
                <li key={index} className="text-gray-100 flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-pink-400 mr-2 mt-2"></span>
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>      {/* Competitors */}
      <section className="bg-black/70 border border-pink-500/25 rounded-2xl shadow-lg shadow-pink-500/10 p-6 backdrop-blur-lg relative overflow-hidden">
        <div className="absolute -z-10 top-0 right-0 w-1/3 h-1/3 rounded-full bg-pink-600/10 blur-xl"></div>
        <div className="absolute -z-10 bottom-1/4 left-1/4 w-1/3 h-1/3 rounded-full bg-red-600/5 blur-xl"></div>
        <h2 className="text-2xl font-bold text-pink-400 mb-6 flex items-center relative z-10">
          <span className="bg-pink-500/20 rounded-full p-2 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-300">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </span>
          Competitive Landscape
        </h2>
          <div className="bg-black/50 rounded-xl p-5 backdrop-blur-sm border border-pink-500/15 mb-6">
          <h3 className="text-lg font-bold text-pink-200 mb-2">Market Overview</h3>
          <p className="text-gray-100 relative z-10">{analysisData.competitive_landscape_summary}</p>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500/30 to-red-500/30 flex items-center justify-center mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                <path d="M12 20v-6M6 20V10M18 20V4"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-pink-300">Market Leaders</h3>
          </div>
          <div className="flex flex-wrap gap-2 ml-10">
            {analysisData.market_leaders.map((leader, index) => (
              <span key={index} className="bg-black/50 px-3 py-2 rounded-lg border border-pink-500/20 text-white backdrop-blur-sm">
                {leader}
              </span>
            ))}
          </div>
        </div>
          <div className="flex items-center mb-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500/30 to-red-500/30 flex items-center justify-center mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
              <path d="M13 5H19V11"></path>
              <path d="M19 5L11 13L7 9L2 14"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-pink-300">Competitors Analysis</h3>
        </div>
        <div className="space-y-6 relative z-10">          {analysisData.competitors.map((competitor, index) => (            <div key={index} className="border border-pink-500/25 rounded-xl p-5 bg-black/60 backdrop-blur-lg relative overflow-hidden">
              <div className="absolute -z-10 top-0 right-0 w-1/4 h-1/2 rounded-full bg-pink-600/10 blur-xl"></div>
              <div className="absolute -z-10 bottom-0 left-0 w-1/3 h-1/3 rounded-full bg-red-500/10 blur-xl"></div><div className="flex justify-between items-center mb-3 relative z-10">
                <div className="flex items-center">                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500/15 to-red-500/15 rounded-full flex items-center justify-center mr-3">
                    <span className="text-pink-200 font-bold">{competitor.name.charAt(0)}</span>
                  </div><h4 className="text-lg font-bold bg-gradient-to-r from-pink-200 to-red-200 bg-clip-text text-transparent">
                    {competitor.name}
                  </h4>
                </div>
                <div className="flex items-center">                  <div className="text-sm bg-black/60 text-pink-100 py-1.5 px-4 rounded-full backdrop-blur-lg border border-pink-500/15">
                    <span className="font-semibold text-pink-300">Score:</span> {competitor.competitive_score}/10
                  </div>
                </div>
              </div>
              
              {competitor.website && (
                <a href={competitor.website} target="_blank" rel="noopener noreferrer" 
                   className="text-pink-400 hover:text-pink-300 transition-colors text-sm mb-3 inline-flex items-center relative z-10 bg-black/30 px-3 py-1 rounded-md border border-pink-500/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                  </svg>
                  {competitor.website}
                </a>
              )}
                <div className="bg-black/30 p-4 rounded-lg mb-4 relative z-10 border border-pink-500/10 backdrop-blur-sm">
                  <p className="text-gray-100">{competitor.description}</p>
                </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3 relative z-10">
                <div className="bg-black/40 p-3 rounded-lg backdrop-blur-sm border border-pink-500/20">
                  <h5 className="font-bold text-sm text-pink-300 mb-1">Pricing Model</h5>
                  <p className="text-gray-100">{competitor.pricing_model || "Not available"}</p>
                </div>
                <div className="bg-black/40 p-3 rounded-lg backdrop-blur-sm border border-pink-500/20">
                  <h5 className="font-bold text-sm text-pink-300 mb-1">Pricing Details</h5>
                  <p className="text-gray-100">{competitor.pricing_details || "Not available"}</p>
                </div>
                <div className="bg-black/40 p-3 rounded-lg backdrop-blur-sm border border-pink-500/20">
                  <h5 className="font-bold text-sm text-pink-300 mb-1">Target Audience</h5>
                  <p className="text-gray-100">{competitor.target_audience || "Not available"}</p>
                </div>                <div className="bg-black/40 p-3 rounded-lg backdrop-blur-sm border border-pink-500/20">
                  <h5 className="font-bold text-sm text-pink-300 mb-1">Market Share</h5>
                  <p className="text-gray-100">{competitor.market_share || "Not available"}</p>
                </div>
                {competitor.funding_info && (
                  <div className="bg-black/40 p-3 rounded-lg backdrop-blur-sm border border-pink-500/20">
                    <h5 className="font-bold text-sm text-pink-300 mb-1">Funding</h5>
                    <p className="text-gray-100">{competitor.funding_info}</p>
                  </div>
                )}
                {competitor.founded_year && (
                  <div className="bg-black/40 p-3 rounded-lg backdrop-blur-sm border border-pink-500/20">
                    <h5 className="font-bold text-sm text-pink-300 mb-1">Founded</h5>
                    <p className="text-gray-100">{competitor.founded_year}</p>
                  </div>
                )}                {competitor.team_size && (
                  <div className="bg-black/40 p-3 rounded-lg backdrop-blur-sm border border-pink-500/20">
                    <h5 className="font-bold text-sm text-pink-300 mb-1">Team Size</h5>
                    <p className="text-gray-100">{competitor.team_size}</p>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 relative z-10">
                <div className="bg-black/40 p-4 rounded-lg backdrop-blur-sm border border-pink-500/20">
                  <h5 className="font-bold text-sm text-pink-300 mb-2">Key Features</h5>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    {competitor.features.map((feature, idx) => (
                      <li key={idx} className="text-gray-100">{feature}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="grid grid-cols-2 gap-4">                  <div className="bg-black/40 p-3 rounded-lg backdrop-blur-sm border border-pink-500/10 border-l-2 border-l-green-500/40">
                    <h5 className="font-bold text-sm text-pink-300 mb-2">Strengths</h5>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      {competitor.strengths.map((strength, idx) => (
                        <li key={idx} className="text-gray-100">{strength}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-black/40 p-3 rounded-lg backdrop-blur-sm border border-pink-500/10 border-l-2 border-l-red-500/40">
                    <h5 className="font-bold text-sm text-pink-300 mb-2">Weaknesses</h5>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      {competitor.weaknesses.map((weakness, idx) => (
                        <li key={idx} className="text-gray-100">{weakness}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
                {/* Social Presence and User Reviews */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                {competitor.social_presence && Object.keys(competitor.social_presence).length > 0 && (
                  <div className="bg-black/40 p-3 rounded-lg backdrop-blur-sm border border-pink-500/20">
                    <h5 className="font-bold text-sm text-pink-300 mb-2">Social Presence</h5>                    <div className="bg-black/60 p-3 rounded-md">
                      {Object.entries(competitor.social_presence).map(([platform, followers]) => (
                        <div key={platform} className="text-sm mb-1 text-gray-100">
                          <span className="font-bold text-pink-300">{platform}:</span> {followers}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                  {competitor.user_reviews && Object.keys(competitor.user_reviews).length > 0 && (
                  <div className="bg-black/40 p-3 rounded-lg backdrop-blur-sm border border-pink-500/20">
                    <h5 className="font-bold text-sm text-pink-300 mb-2">User Reviews</h5>
                    <div className="bg-black/60 p-3 rounded-md">
                      {Object.entries(competitor.user_reviews).map(([key, value]) => (
                        <div key={key} className="text-sm mb-1 text-gray-100">
                          <span className="font-bold text-pink-300">{key}:</span> {String(value)}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>      {/* Opportunity Analysis */}
      <section className="bg-black/70 border border-pink-500/25 rounded-2xl shadow-lg shadow-pink-500/10 p-6 backdrop-blur-lg relative overflow-hidden">
        <div className="absolute -z-10 top-1/3 left-0 w-1/2 h-1/2 rounded-full bg-pink-600/5 blur-xl"></div>
        <div className="absolute -z-10 bottom-0 right-0 w-1/3 h-1/3 rounded-full bg-red-500/10 blur-xl"></div>
        <div className="flex justify-between items-center mb-6 relative z-10">
          <h2 className="text-2xl font-bold text-pink-400 flex items-center">
            <span className="bg-pink-500/20 rounded-full p-2 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-300">
                <path d="m22 12-4-4v3H3v2h15v3z"></path>
              </svg>
            </span>
            Opportunity Analysis
          </h2>          <div className="flex items-center space-x-1 bg-gradient-to-r from-pink-500/15 to-red-500/15 py-2 px-4 rounded-full backdrop-blur-sm border border-pink-500/15">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-300 mr-1">
              <path d="M12 2v20"></path>
              <path d="m17 8-5-6-5 6"></path>
              <path d="M5 16h14"></path>
            </svg>
            <span className="text-lg font-bold text-pink-200">Opportunity Score: </span>
            <span className="text-xl font-bold bg-gradient-to-r from-pink-300 to-red-300 bg-clip-text text-transparent">
              {analysisData.opportunity_score}/10
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          <div className="bg-black/40 rounded-xl p-4 backdrop-blur-sm border border-pink-500/20 h-full">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500/30 to-red-500/30 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                  <path d="M16 16v-8"></path>
                  <path d="M12 16V4"></path>
                  <path d="M8 16v-4"></path>
                  <path d="M22 20H2"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-pink-300">Market Gaps</h3>
            </div>
            <ul className="space-y-2 ml-10">
              {analysisData.opportunity_analysis.market_gaps.map((gap, index) => (
                <li key={index} className="text-gray-100 flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-pink-400 mr-2 mt-2"></span>
                  <span>{gap}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-black/40 rounded-xl p-4 backdrop-blur-sm border border-pink-500/20 h-full">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500/30 to-red-500/30 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                  <path d="M17 8h4v4"></path>
                  <path d="M3 16v-4h4"></path>
                  <path d="M21 12a9 9 0 0 1-9 9"></path>
                  <path d="M3 12a9 9 0 0 1 9-9"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-pink-300">Underserved Segments</h3>
            </div>
            <ul className="space-y-2 ml-10">
              {analysisData.opportunity_analysis.underserved_segments.map((segment, index) => (
                <li key={index} className="text-gray-100 flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-pink-400 mr-2 mt-2"></span>
                  <span>{segment}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-black/40 rounded-xl p-4 backdrop-blur-sm border border-pink-500/20 h-full">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500/30 to-red-500/30 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                  <path d="M22 12c0 5.5-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2s10 4.5 10 10Z"></path>
                  <path d="m15 9-6 6"></path>
                  <path d="m9 9 6 6"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-pink-300">Differentiation Opportunities</h3>
            </div>
            <ul className="space-y-2 ml-10">
              {analysisData.opportunity_analysis.differentiation_opportunities.map((opportunity, index) => (
                <li key={index} className="text-gray-100 flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-pink-400 mr-2 mt-2"></span>
                  <span>{opportunity}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-black/40 rounded-xl p-4 backdrop-blur-sm border border-pink-500/20 h-full">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500/30 to-red-500/30 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                  <path d="M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.85 1 4.55a2.92 2.92 0 0 0 2.609 1.5c.74 0 1.214-.34 1.391-.567"></path>
                  <path d="m12.5 3.33 2 2.67h-3l2 2.67"></path>
                  <path d="M19 16v-1a2 2 0 0 0-2-2h-1.2"></path>
                  <path d="M7 16.8v1.4a2 2 0 0 0 2 1.8h6a2 2 0 0 0 2-2v-1"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-pink-300">Success Factors</h3>
            </div>
            <ul className="space-y-2 ml-10">
              {analysisData.opportunity_analysis.success_factors.map((factor, index) => (
                <li key={index} className="text-gray-100 flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-pink-400 mr-2 mt-2"></span>
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {analysisData.opportunity_analysis.barrier_to_entry && (
            <div className="md:col-span-2">
              <div className="bg-black/40 rounded-xl p-5 backdrop-blur-sm border border-pink-500/20">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500/30 to-red-500/30 flex items-center justify-center mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                      <path d="M22 12H2"></path>
                      <path d="M16 12v5a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-5"></path>
                      <path d="M8 7V5c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-pink-300">Barriers to Entry</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-10">
                  {Object.entries(analysisData.opportunity_analysis.barrier_to_entry).map(([key, value]) => (
                    <div key={key} className="bg-black/50 p-3 rounded-lg border border-pink-500/10">
                      <div className="font-bold text-pink-300 mb-1">{key}</div>
                      <div className="text-gray-100">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>      {/* Risk Analysis */}
      <section className="bg-black/70 border border-pink-500/25 rounded-2xl shadow-lg shadow-pink-500/10 p-6 backdrop-blur-lg relative overflow-hidden">
        <div className="absolute -z-10 bottom-1/4 left-1/4 w-1/2 h-1/3 rounded-full bg-red-500/10 blur-xl"></div>
        <div className="absolute -z-10 top-0 right-1/4 w-1/3 h-1/3 rounded-full bg-pink-600/5 blur-xl"></div>
        <h2 className="text-2xl font-bold text-pink-400 mb-6 flex items-center relative z-10">
          <span className="bg-pink-500/20 rounded-full p-2 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-300">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
              <path d="M12 9v4"></path>
              <path d="M12 17h.01"></path>
            </svg>
          </span>
          Risk Analysis
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          <div className="bg-black/40 rounded-xl p-4 backdrop-blur-sm border border-pink-500/20">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500/30 to-red-500/30 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                  <path d="M9 8h6"></path>
                  <path d="M9 12h6"></path>
                  <path d="M9 16h6"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-pink-300">Market Risks</h3>
            </div>
            <ul className="space-y-2 ml-10">
              {analysisData.risk_analysis.market_risks.map((risk, index) => (
                <li key={index} className="text-gray-100 flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400 mr-2 mt-2"></span>
                  <span>{risk}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-black/40 rounded-xl p-4 backdrop-blur-sm border border-pink-500/20">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500/30 to-red-500/30 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                  <path d="m22 2-7 20-4-9-9-4Z"></path>
                  <path d="M22 2 11 13"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-pink-300">Competitive Risks</h3>
            </div>
            <ul className="space-y-2 ml-10">
              {analysisData.risk_analysis.competitive_risks.map((risk, index) => (
                <li key={index} className="text-gray-100 flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400 mr-2 mt-2"></span>
                  <span>{risk}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-black/40 rounded-xl p-4 backdrop-blur-sm border border-pink-500/20">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500/30 to-red-500/30 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-pink-300">Technology Risks</h3>
            </div>
            <ul className="space-y-2 ml-10">
              {analysisData.risk_analysis.technology_risks.map((risk, index) => (
                <li key={index} className="text-gray-100 flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400 mr-2 mt-2"></span>
                  <span>{risk}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-black/40 rounded-xl p-4 backdrop-blur-sm border border-pink-500/20">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500/30 to-red-500/30 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                  <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z"></path>
                  <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"></path>
                  <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-pink-300">Regulatory Risks</h3>
            </div>
            <ul className="space-y-2 ml-10">
              {analysisData.risk_analysis.regulatory_risks.map((risk, index) => (
                <li key={index} className="text-gray-100 flex items-start">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-400 mr-2 mt-2"></span>
                  <span>{risk}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 relative z-10">
          <div className="bg-black/40 rounded-xl p-5 backdrop-blur-sm border border-pink-500/20">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500/30 to-red-500/30 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                  <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"></path>
                  <path d="M7 7h.01"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-pink-300">Mitigation Strategies</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-10">
              {analysisData.risk_analysis.mitigation_strategies.map((strategy, index) => (
                <div key={index} className="bg-black/50 p-3 rounded-lg border border-pink-500/10 border-l-2 border-l-pink-500/40">
                  <div className="flex items-start">                    <span className="flex w-5 h-5 rounded-full bg-gradient-to-br from-pink-500/40 to-red-400/40 items-center justify-center mt-0.5 mr-2 flex-shrink-0">
                      <span className="text-xs text-white">{index + 1}</span>
                    </span>
                    <span className="text-gray-100">{strategy}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>      {/* Strategic Recommendations */}
      <section className="bg-black/70 border border-pink-500/25 rounded-2xl shadow-lg shadow-pink-500/10 p-6 backdrop-blur-lg relative overflow-hidden">
        <div className="absolute -z-10 top-0 left-0 w-full h-1/4 bg-gradient-to-r from-pink-500/5 to-red-500/5 blur-xl"></div>
        <div className="absolute -z-10 bottom-0 right-0 w-1/3 h-1/3 rounded-full bg-pink-600/10 blur-xl"></div>
        <h2 className="text-2xl font-bold text-pink-400 mb-6 flex items-center relative z-10">
          <span className="bg-pink-500/20 rounded-full p-2 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-300">
              <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
              <path d="M5 8V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2h-5"></path>
              <path d="M7 21H3a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h4"></path>
              <path d="M5 14.5a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0-5 0Z"></path>
              <path d="M13 17.5a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0-5 0Z"></path>
            </svg>
          </span>
          Strategic Recommendations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          <div className="bg-black/40 rounded-xl p-4 backdrop-blur-sm border border-pink-500/20">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500/30 to-red-500/30 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                  <path d="M18 21a8 8 0 0 0-16 0"></path>
                  <circle cx="10" cy="8" r="5"></circle>
                  <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-pink-300">Target Audience Segments</h3>
            </div>
            <div className="space-y-3 ml-10">
              {analysisData.target_audience_segments.map((segment, index) => (
                <div key={index} className="bg-black/50 rounded-lg p-4 backdrop-blur-sm border border-pink-500/20 hover:border-pink-500/40 transition-colors">
                  <div className="flex items-center mb-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-pink-500/20 to-red-500/20 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                      <span className="text-pink-300 text-xs font-bold">{index + 1}</span>
                    </div>
                    <h4 className="font-bold text-pink-300">{segment.name}</h4>
                  </div>
                  <p className="text-sm text-gray-100 ml-8">{segment.description}</p>
                  {segment.size && 
                    <div className="mt-2 ml-8 inline-block bg-black/40 px-3 py-1 rounded-md border border-pink-500/20">
                      <span className="text-xs font-medium text-pink-300">Segment Size:</span> 
                      <span className="text-sm text-white ml-1">{segment.size}</span>
                    </div>
                  }
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-black/40 rounded-xl p-4 backdrop-blur-sm border border-pink-500/20">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500/30 to-red-500/30 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                  <path d="M12 2v20"></path>
                  <path d="M2 5h20"></path>
                  <path d="M3 3v2"></path>
                  <path d="M7 3v2"></path>
                  <path d="M11 3v2"></path>
                  <path d="M15 3v2"></path>
                  <path d="M19 3v2"></path>
                  <path d="m3 10 2 2"></path>
                  <path d="m19 10-2 2"></path>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-pink-300">Go-to-Market Insights</h3>
            </div>
            <div className="ml-10 space-y-2 bg-black/50 p-3 rounded-lg border border-pink-500/10">
              {analysisData.go_to_market_insights.map((insight, index) => (
                <div key={index} className="flex items-start bg-black/30 p-3 rounded-lg border border-pink-500/10 backdrop-blur-sm">
                  <span className="w-5 h-5 rounded-full bg-gradient-to-br from-pink-500/30 to-red-500/30 flex items-center justify-center mr-2 flex-shrink-0 text-xs text-white">{index + 1}</span>
                  <span className="text-gray-100">{insight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 relative z-10 bg-black/40 rounded-xl p-4 backdrop-blur-sm border border-pink-500/20">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500/30 to-red-500/30 flex items-center justify-center mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-pink-300">Strategic Recommendations</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-10">
            {analysisData.strategic_recommendations.map((recommendation, index) => (
              <div key={index} className="bg-black/50 p-3 rounded-lg border border-pink-500/10">
                <div className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-pink-500/30 to-red-500/30 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                    <span className="text-xs text-white">{index + 1}</span>
                  </div>
                  <span className="text-gray-100">{recommendation}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 relative z-10 bg-black/40 rounded-xl p-4 backdrop-blur-sm border border-pink-500/20">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500/30 to-red-500/30 flex items-center justify-center mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                <path d="M10 22v-8h4v8"></path>
                <path d="M2 22v-4.172a2 2 0 0 1 .586-1.414L12 6l9.414 10.414a2 2 0 0 1 .586 1.414V22"></path>
                <path d="M14 6v-.5A2.5 2.5 0 0 0 11.5 3h-3A2.5 2.5 0 0 0 6 5.5V6"></path>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-pink-300">Next Steps</h3>
          </div>
          <div className="ml-10 space-y-3">
            {analysisData.next_steps.map((step, index) => (
              <div key={index} className="flex items-start p-3 bg-gradient-to-r from-black/70 to-black/50 rounded-lg border border-pink-500/20 backdrop-blur-sm">
                <span className="bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 shadow-md shadow-pink-500/20">
                  {index + 1}
                </span>
                <p className="text-gray-100">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>      {/* Report Footer */}
      <footer className="mt-12 pt-6 border-t border-pink-500/15 text-center relative z-10">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center space-x-1 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-300">
              <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
              <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
              <path d="M9 17h6"></path>
              <path d="M9 13h6"></path>
            </svg>
            <span className="text-sm font-medium bg-gradient-to-r from-pink-300 to-red-300 bg-clip-text text-transparent">
              Market Analysis Report
            </span>
          </div>
          <p className="text-xs text-gray-400">
            This market analysis is based on data available as of {analysisData.analysis_date ? new Date(analysisData.analysis_date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }) : 'the analysis date'}. Market conditions may change over time.
          </p>          <div className="mt-3 flex items-center space-x-1 text-xs text-gray-500">
            <span>Generated with</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-300">
              <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
            </svg>
            <span>by Startup MVP Builder</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MarketAnalysisDisplay;
