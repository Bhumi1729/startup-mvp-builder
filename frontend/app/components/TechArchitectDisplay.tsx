'use client';

import { useState, useEffect, useRef } from 'react';
import { TechArchitectResponse } from '../utils/agentChain';
import mermaid from 'mermaid';

interface TechArchitectDisplayProps {
  analysisData: TechArchitectResponse;
}

export default function TechArchitectDisplay({ analysisData }: TechArchitectDisplayProps) {
  const [renderKey, setRenderKey] = useState<number>(0);
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'neutral',
      securityLevel: 'loose',
      fontFamily: 'sans-serif',
    });

    if (analysisData?.architecture_diagram && mermaidRef.current) {
      try {
        let diagramContent = analysisData.architecture_diagram.trim();
        if (diagramContent.startsWith('```mermaid')) {
          diagramContent = diagramContent.replace(/```mermaid/g, '').replace(/```/g, '').trim();
        }

        // Remove any lines that start with 'title' or 'description' (case-insensitive)
        diagramContent = diagramContent
          .split('\n')
          .filter(line => {
            const trimmed = line.trim().toLowerCase();
            return !trimmed.startsWith('title') && !trimmed.startsWith('description');
          })
          .join('\n')
          .replace(/\n{2,}/g, '\n') // Remove extra blank lines
          .trim();

        mermaidRef.current.innerHTML = '';

        mermaid.render('mermaid-arch-diagram', diagramContent)
          .then(({ svg }) => {
            mermaidRef.current!.innerHTML = svg;
          })
          .catch((error) => {
            mermaidRef.current!.textContent = 'Error rendering diagram. View as text:\n\n' + diagramContent;
            mermaidRef.current!.className = 'whitespace-pre-line text-sm text-gray-900';
            console.error('Mermaid render error:', error);
          });
      } catch (error) {
        if (mermaidRef.current) {
          mermaidRef.current.textContent = 'Error rendering diagram. View as text:\n\n' + analysisData.architecture_diagram;
          mermaidRef.current.className = 'whitespace-pre-line text-sm text-gray-900';
        }
        console.error('Error rendering Mermaid diagram:', error);
      }
    }
  }, [analysisData, renderKey]);

  if (!analysisData) {
    return <div>No technical blueprint data available.</div>;
  }
  return (
    <div className="space-y-8 w-full">
      
      <section className="bg-black/70 border border-pink-500/25 rounded-2xl shadow-lg shadow-pink-500/10 p-6 backdrop-blur-lg relative overflow-hidden">
        <div className="absolute -z-10 top-0 right-0 w-1/3 h-1/3 rounded-full bg-pink-600/10 blur-xl"></div>
        <div className="absolute -z-10 bottom-1/4 left-1/4 w-1/3 h-1/3 rounded-full bg-red-600/5 blur-xl"></div>
        
        <h2 className="text-2xl font-bold text-pink-300 mb-6 flex items-center relative z-10">
          <span className="bg-gradient-to-br from-pink-500/20 to-red-500/20 rounded-full p-2.5 mr-3 border border-pink-500/30 shadow-md shadow-pink-500/10">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
              <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path>
              <path d="M13 5v2"></path>
              <path d="M13 17v2"></path>
              <path d="M13 11v2"></path>
            </svg>
          </span>
          <div>
            <span className="bg-gradient-to-r from-pink-300 via-white to-red-300 bg-clip-text text-transparent drop-shadow">Technical Blueprint</span>
            <div className="text-sm font-normal text-gray-400 mt-1">Detailed technical architecture for implementation and scaling</div>
          </div>
        </h2>
          <div className="bg-black/60 rounded-xl overflow-hidden border border-pink-500/20 backdrop-blur-sm relative z-10 shadow-lg shadow-pink-500/5">
          <div className="px-6 py-5 border-b border-pink-500/20">
            <h3 className="text-xl font-bold text-pink-300 mb-5 flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500/25 to-red-500/25 flex items-center justify-center mr-3 border border-pink-500/30 shadow-md shadow-pink-500/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                  <path d="M18 16h.01"></path>
                  <path d="M18 8h.01"></path>
                  <path d="M6 8h.01"></path>
                  <path d="M6 16h.01"></path>
                  <path d="M13 12h.01"></path>
                  <path d="M21 2l-5 9-5-9z"></path>
                  <path d="M3 2l5 9 5-9z"></path>
                  <path d="M12 22v-8"></path>
                  <path d="M12 14l-4-4"></path>
                  <path d="M16 10l-4 4"></path>
                </svg>
              </div>
              <div>
                <span className="bg-gradient-to-r from-pink-200 to-red-200 bg-clip-text text-transparent">Technology Stack</span>
                <div className="text-xs font-normal text-gray-400 mt-1">Core technologies for building your product</div>
              </div>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {analysisData.tech_stack && Object.entries(analysisData.tech_stack).map(([category, technologies]: [string, any], index: number) => (
                <div key={index} className="border border-pink-500/30 rounded-xl p-5 bg-black/70 backdrop-blur-sm relative overflow-hidden shadow-lg shadow-pink-500/10 hover:border-pink-500/40 transition-all duration-300 group">
                  <div className="absolute -z-10 top-0 right-0 w-1/2 h-1/2 rounded-full bg-pink-600/10 blur-xl group-hover:bg-pink-600/15 transition-all duration-300"></div>
                  
                  <div className="flex items-center mb-4 border-b border-pink-500/20 pb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-500/25 to-red-500/25 rounded-full flex items-center justify-center mr-3 border border-pink-500/20">
                      <span className="text-lg text-pink-200 font-bold">{index + 1}</span>
                    </div>
                    <h4 className="font-bold text-lg bg-gradient-to-r from-pink-200 to-red-200 bg-clip-text text-transparent">{category}</h4>
                  </div>
                  
                  <ul className="mt-3 space-y-3">
                    {technologies.map((tech: any, i: number) => (
                      <li key={i} className="text-gray-100 p-4 bg-black/60 rounded-lg border border-pink-500/20 shadow-inner shadow-pink-500/5">
                        <div className="flex items-center mb-2 border-b border-pink-500/10 pb-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500/15 to-red-500/15 flex items-center justify-center mr-2 border border-pink-500/10">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                              <path d="m7 11 2-2-2-2"></path>
                              <path d="M11 13h4"></path>
                              <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                            </svg>
                          </div>
                          <span className="font-bold text-pink-200">{tech.name}</span>
                          {tech.version && (
                            <span className="ml-2 bg-pink-500/15 text-xs font-medium text-pink-200 px-2 py-0.5 rounded-full">
                              v{tech.version}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-100 text-sm ml-2">{tech.justification}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>          <div className="px-6 py-5 border-b border-pink-500/20">
            <h3 className="text-xl font-bold text-pink-300 mb-5 flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500/25 to-red-500/25 flex items-center justify-center mr-3 border border-pink-500/30 shadow-md shadow-pink-500/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                  <path d="M8 3v3a2 2 0 0 1-2 2H3"></path>
                  <path d="M21 3h-7a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"></path>
                  <path d="M21 14h-7a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2z"></path>
                  <path d="M8 14v3a2 2 0 0 1-2 2H3"></path>
                  <path d="M3 8v8"></path>
                </svg>
              </div>
              <div>
                <span className="bg-gradient-to-r from-pink-200 to-red-200 bg-clip-text text-transparent">Database Schema</span>
                <div className="text-xs font-normal text-gray-400 mt-1">Data models and relationships for your application</div>
              </div>
            </h3>
            <div className="space-y-6">
              {analysisData.database_schema && analysisData.database_schema.map((schema: any, index: number) => (
                <div key={index} className="border border-pink-500/30 rounded-xl p-5 bg-black/70 backdrop-blur-sm relative overflow-hidden shadow-lg shadow-pink-500/10 hover:border-pink-500/40 transition-all duration-300 group">
                  <div className="absolute -z-10 top-0 right-0 w-1/2 h-1/2 rounded-full bg-pink-600/10 blur-xl group-hover:bg-pink-600/15 transition-all duration-300"></div>
                  <div className="absolute -z-10 bottom-0 left-0 w-1/3 h-1/3 rounded-full bg-red-500/10 blur-xl"></div>
                  
                  <div className="flex items-center mb-4 border-b border-pink-500/20 pb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500/25 to-red-500/25 rounded-full flex items-center justify-center mr-4 border border-pink-500/20 shadow-md shadow-pink-500/10">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                        <path d="M3 6v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2V6"></path>
                        <path d="M16 2H8a2 2 0 0 0-2 2v2h12V4a2 2 0 0 0-2-2Z"></path>
                        <path d="M8 10h8"></path>
                        <path d="M8 14h8"></path>
                        <path d="M8 18h8"></path>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-xl bg-gradient-to-r from-pink-200 to-red-200 bg-clip-text text-transparent">
                        {schema.name}
                      </h4>
                      <div className="text-sm bg-pink-500/20 text-pink-200 px-3 py-1 rounded-full inline-block mt-1 font-medium border border-pink-500/15">
                        {schema.type}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-black/60 p-4 rounded-lg border border-pink-500/20 mb-5 shadow-inner shadow-pink-500/5">
                    <p className="text-gray-100">{schema.description}</p>
                  </div>
                  
                  <div className="bg-black/60 p-5 rounded-lg border border-pink-500/20 shadow-inner shadow-pink-500/5 mb-4">
                    <div className="flex items-center mb-3 border-b border-pink-500/15 pb-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-500/20 to-red-500/20 flex items-center justify-center mr-2.5 border border-pink-500/15">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                          <path d="M3 3v18h18"></path>
                          <path d="m16 6-4 4-2-2-6 6"></path>
                          <path d="M16 10V6h-4"></path>
                        </svg>
                      </div>
                      <h5 className="font-semibold text-pink-200 uppercase tracking-wider text-sm">Table Fields</h5>
                      <span className="ml-3 bg-pink-500/15 text-xs font-bold text-pink-200 px-2.5 py-1 rounded-full border border-pink-500/15 shadow-inner shadow-pink-500/5">
                        {schema.fields?.length || 0}
                      </span>
                    </div>
                    <div className="mt-3 bg-black/50 p-3 rounded-lg border border-pink-500/10">
                      <ul className="text-sm text-gray-100 space-y-2">
                        {schema.fields && schema.fields.map((field: any, i: number) => (
                          <li key={i} className="flex items-start p-2 border-b border-pink-500/10 last:border-0">
                            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-pink-500/15 to-red-500/15 flex items-center justify-center mr-3 mt-0.5 border border-pink-500/10">
                              <span className="text-[10px] font-bold text-pink-200">{i + 1}</span>
                            </div>
                            <span className="font-mono">
                              {typeof field === 'string' ? field : Object.entries(field).map(([key, value]) => `${key}: ${value}`).join(', ')}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {schema.relationships && schema.relationships.length > 0 && (
                    <div className="bg-black/60 p-5 rounded-lg border border-pink-500/20 shadow-inner shadow-pink-500/5">
                      <div className="flex items-center mb-3 border-b border-pink-500/15 pb-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-500/20 to-red-500/20 flex items-center justify-center mr-2.5 border border-pink-500/15">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                            <line x1="4" x2="20" y1="12" y2="12"></line>
                            <line x1="12" x2="12" y1="4" y2="20"></line>
                          </svg>
                        </div>
                        <h5 className="font-semibold text-pink-200 uppercase tracking-wider text-sm">Relationships</h5>
                        <span className="ml-3 bg-pink-500/15 text-xs font-bold text-pink-200 px-2.5 py-1 rounded-full border border-pink-500/15 shadow-inner shadow-pink-500/5">
                          {schema.relationships.length}
                        </span>
                      </div>
                      <div className="mt-3 bg-black/50 p-3 rounded-lg border border-pink-500/10">
                        <ul className="text-sm text-gray-100 space-y-2">
                          {schema.relationships.map((rel: any, i: number) => (
                            <li key={i} className="flex items-start p-2 border-b border-pink-500/10 last:border-0">
                              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-pink-500/15 to-red-500/15 flex items-center justify-center mr-3 mt-0.5 border border-pink-500/10">
                                <span className="text-[10px] font-bold text-pink-200">{i + 1}</span>
                              </div>
                              <span>{rel}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div><div className="px-6 py-5 border-b border-pink-500/20">            <h3 className="text-xl font-bold text-pink-300 mb-5 flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500/25 to-red-500/25 flex items-center justify-center mr-3 border border-pink-500/30 shadow-md shadow-pink-500/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                  <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                  <path d="M7 8h10"></path>
                  <path d="M7 12h10"></path>
                  <path d="M7 16h10"></path>
                </svg>
              </div>
              <div>
                <span className="bg-gradient-to-r from-pink-200 to-red-200 bg-clip-text text-transparent">API Endpoints</span>
                <div className="text-xs font-normal text-gray-400 mt-1">Backend service interfaces for client applications</div>
              </div>
            </h3>
            <div className="space-y-5">
              {analysisData.api_endpoints && analysisData.api_endpoints.map((endpoint: any, index: number) => (
                <div key={index} className="border border-pink-500/30 rounded-xl p-5 bg-black/70 backdrop-blur-sm relative overflow-hidden shadow-lg shadow-pink-500/10 hover:border-pink-500/40 transition-all duration-300 group">
                  <div className="absolute -z-10 top-0 right-0 w-1/2 h-1/2 rounded-full bg-pink-600/10 blur-xl group-hover:bg-pink-600/15 transition-all duration-300"></div>
                  <div className="absolute -z-10 bottom-0 left-0 w-1/3 h-1/3 rounded-full bg-red-500/10 blur-xl"></div>
                  
                  <div className="flex justify-between items-center mb-4 pb-3 border-b border-pink-500/20">
                    <div className="flex items-center">
                      <span className={`text-sm font-bold px-4 py-2 rounded-lg shadow-md ${
                        endpoint.method === 'GET' 
                          ? 'bg-pink-900/40 text-pink-300 border border-pink-500/30 shadow-pink-500/10'
                          : endpoint.method === 'POST'
                          ? 'bg-pink-900/40 text-pink-300 border border-pink-500/30 shadow-pink-500/10'
                          : endpoint.method === 'PUT'
                          ? 'bg-pink-900/40 text-pink-300 border border-pink-500/30 shadow-pink-500/10'
                          : endpoint.method === 'DELETE'
                          ? 'bg-pink-900/40 text-pink-300 border border-pink-500/30 shadow-pink-500/10'
                          : endpoint.method === 'PATCH'
                          ? 'bg-pink-900/40 text-pink-300 border border-pink-500/30 shadow-pink-500/10'
                          : 'bg-pink-900/40 text-pink-300 border border-pink-500/30 shadow-pink-500/10'
                      }`}>
                        {endpoint.method}
                      </span>
                      <span className="font-mono text-base text-pink-200 ml-4 px-4 py-2 bg-black/40 rounded-lg border border-pink-500/15 overflow-x-auto overflow-y-hidden max-w-[400px] inline-block">
                        {endpoint.path}
                      </span>
                    </div>
                    
                    <span className={`px-3 py-1.5 text-sm rounded-lg shadow-md ${
                      endpoint.auth_required 
                        ? 'bg-pink-900/40 text-pink-300 border border-pink-500/30 shadow-pink-500/10' 
                        : 'bg-gray-900/40 text-gray-300 border border-gray-500/30'
                    }`}>
                      {endpoint.auth_required ? 'Auth Required' : 'No Auth'}
                    </span>
                  </div>
                    <div className="bg-black/60 p-4 rounded-lg border border-pink-500/20 shadow-inner shadow-pink-500/5">
                    <div className="flex items-center mb-3 border-b border-pink-500/15 pb-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-500/20 to-red-500/20 flex items-center justify-center mr-2.5 border border-pink-500/15">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                          <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z"></path>
                          <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"></path>
                        </svg>
                      </div>
                      <h5 className="font-semibold text-pink-200 uppercase tracking-wider text-sm">Description</h5>
                    </div>
                    <div className="bg-black/50 p-3 rounded-lg border border-pink-500/10">
                      <p className="text-gray-100">{endpoint.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>          {analysisData.deployment_strategy && (
            <div className="px-6 py-5 border-b border-pink-500/20">              <h3 className="text-xl font-bold text-pink-300 mb-5 flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500/25 to-red-500/25 flex items-center justify-center mr-3 border border-pink-500/30 shadow-md shadow-pink-500/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                    <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"></path>
                    <path d="M12 4v12"></path>
                  </svg>
                </div>
                <div>
                  <span className="bg-gradient-to-r from-pink-200 to-red-200 bg-clip-text text-transparent">Deployment Strategy</span>
                  <div className="text-xs font-normal text-gray-400 mt-1">Infrastructure and operations planning for your application</div>
                </div>
              </h3>
              <div className="border border-pink-500/30 rounded-xl p-5 bg-black/70 backdrop-blur-sm shadow-lg shadow-pink-500/10 hover:border-pink-500/40 transition-all duration-300 group relative overflow-hidden">
                <div className="absolute -z-10 top-0 right-0 w-1/2 h-1/2 rounded-full bg-pink-600/10 blur-xl group-hover:bg-pink-600/15 transition-all duration-300"></div>
                <div className="absolute -z-10 bottom-0 left-0 w-1/3 h-1/3 rounded-full bg-red-500/10 blur-xl"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">                  <div className="bg-black/60 p-4 rounded-lg border border-pink-500/20 shadow-inner shadow-pink-500/5">
                    <div className="flex items-center mb-3 border-b border-pink-500/15 pb-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-500/20 to-red-500/20 flex items-center justify-center mr-2.5 border border-pink-500/15">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
                        </svg>
                      </div>
                      <h5 className="font-semibold text-pink-200 uppercase tracking-wider text-sm">Recommended Approach</h5>
                    </div>
                    <div className="bg-black/50 p-3 rounded-lg border border-pink-500/10">
                      <p className="text-gray-100">{analysisData.deployment_strategy.recommended_approach}</p>
                    </div>
                  </div>
                  
                  <div className="bg-black/60 p-4 rounded-lg border border-pink-500/20 shadow-inner shadow-pink-500/5">
                    <div className="flex items-center mb-3 border-b border-pink-500/15 pb-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-500/20 to-red-500/20 flex items-center justify-center mr-2.5 border border-pink-500/15">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                          <rect width="16" height="16" x="4" y="4" rx="2"></rect>
                          <rect width="4" height="4" x="10" y="10"></rect>
                          <path d="M4 20v-6a2 2 0 0 1 2-2h6"></path>
                          <path d="M14 20h6a2 2 0 0 0 2-2v-6"></path>
                          <path d="M4 4h6a2 2 0 0 1 2 2v6"></path>
                          <path d="M14 10V6a2 2 0 0 1 2-2h4"></path>
                        </svg>
                      </div>
                      <h5 className="font-semibold text-pink-200 uppercase tracking-wider text-sm">Infrastructure</h5>
                    </div>
                    <div className="bg-black/50 p-3 rounded-lg border border-pink-500/10">
                      <p className="text-gray-100">{analysisData.deployment_strategy.infrastructure}</p>
                    </div>
                  </div>
                    {analysisData.deployment_strategy.ci_cd_pipeline && (
                    <div className="bg-black/60 p-4 rounded-lg border border-pink-500/20 shadow-inner shadow-pink-500/5">
                      <div className="flex items-center mb-3 border-b border-pink-500/15 pb-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-500/20 to-red-500/20 flex items-center justify-center mr-2.5 border border-pink-500/15">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                            <path d="M2 12a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V7H2Z"></path>
                            <path d="M6 11V7"></path>
                            <path d="M18 11V7"></path>
                            <path d="M12 11V2"></path>
                          </svg>
                        </div>
                        <h5 className="font-semibold text-pink-200 uppercase tracking-wider text-sm">CI/CD Pipeline</h5>
                      </div>
                      <div className="bg-black/50 p-3 rounded-lg border border-pink-500/10">
                        <ul className="space-y-2">
                          {Object.entries(analysisData.deployment_strategy.ci_cd_pipeline).map(([key, value], i) => (
                            <li key={i} className="flex">
                              <span className="font-semibold text-pink-200 mr-2">{key}:</span> 
                              <span className="text-gray-100">{value as React.ReactNode}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  <div className="bg-black/60 p-4 rounded-lg border border-pink-500/20 shadow-inner shadow-pink-500/5">
                    <div className="flex items-center mb-3 border-b border-pink-500/15 pb-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-500/20 to-red-500/20 flex items-center justify-center mr-2.5 border border-pink-500/15">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                          <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                          <path d="M9 9h6v6H9z"></path>
                          <path d="M6 10h3"></path>
                          <path d="M6 14h3"></path>
                          <path d="M15 10h3"></path>
                          <path d="M15 14h3"></path>
                        </svg>
                      </div>
                      <h5 className="font-semibold text-pink-200 uppercase tracking-wider text-sm">Scaling Strategy</h5>
                    </div>
                    <div className="bg-black/50 p-3 rounded-lg border border-pink-500/10">
                      <p className="text-gray-100 whitespace-pre-line">{analysisData.deployment_strategy.scaling_strategy}</p>
                    </div>
                  </div>
                    {analysisData.deployment_strategy.estimated_costs && (
                    <div className="bg-black/60 p-4 rounded-lg border border-pink-500/20 shadow-inner shadow-pink-500/5">
                      <div className="flex items-center mb-3 border-b border-pink-500/15 pb-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-500/20 to-red-500/20 flex items-center justify-center mr-2.5 border border-pink-500/15">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                            <circle cx="12" cy="12" r="8"></circle>
                            <line x1="12" x2="12" y1="8" y2="12"></line>
                            <line x1="12" x2="14.5" y1="12" y2="14.5"></line>
                          </svg>
                        </div>
                        <h5 className="font-semibold text-pink-200 uppercase tracking-wider text-sm">Estimated Costs</h5>
                      </div>
                      <div className="bg-black/50 p-3 rounded-lg border border-pink-500/10">
                        {typeof analysisData.deployment_strategy.estimated_costs === 'string' ? (
                          <p className="text-gray-100">{analysisData.deployment_strategy.estimated_costs}</p>
                        ) : (
                          <ul className="space-y-2">
                            {Object.entries(analysisData.deployment_strategy.estimated_costs as Record<string, string>).map(([key, value], i) => (
                              <li key={i} className="flex">
                                <span className="font-semibold text-pink-200 mr-2">{key}:</span> 
                                <span className="text-gray-100">{value}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {analysisData.deployment_strategy.monitoring_tools && (
                    <div className="bg-black/60 p-4 rounded-lg border border-pink-500/20 shadow-inner shadow-pink-500/5">
                      <div className="flex items-center mb-3 border-b border-pink-500/15 pb-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-500/20 to-red-500/20 flex items-center justify-center mr-2.5 border border-pink-500/15">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                            <path d="M3 3v18h18"></path>
                            <path d="m19 9-5 5-4-4-3 3"></path>
                          </svg>
                        </div>                        <h5 className="font-semibold text-pink-200 uppercase tracking-wider text-sm">Monitoring Tools</h5>
                      </div>
                      <div className="bg-black/50 p-3 rounded-lg border border-pink-500/10">
                        <div className="grid grid-cols-2 gap-2">
                          {analysisData.deployment_strategy.monitoring_tools.map((tool, i) => (
                            <div key={i} className="bg-black/40 py-1.5 px-3 rounded-lg border border-pink-500/10 text-gray-100">
                              {tool}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                    <div className="bg-black/60 p-4 rounded-lg border border-pink-500/20 shadow-inner shadow-pink-500/5">
                    <div className="flex items-center mb-3 border-b border-pink-500/15 pb-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-500/20 to-red-500/20 flex items-center justify-center mr-2.5 border border-pink-500/15">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                          <path d="M19.5 7A9 9 0 0 0 12 3"></path>
                          <path d="M21 12a9 9 0 0 1-9 9c-2.2 0-4.3-.8-5.9-2.1"></path>
                          <path d="M11 21v-2"></path>
                          <path d="M3 7v2"></path>
                          <path d="m9 3 2 2"></path>
                          <path d="M5 13H3"></path>
                          <path d="m13 5-2-2"></path>
                          <path d="m17 9 2 2"></path>
                          <path d="m13 13 2 2"></path>
                          <path d="m17 15-2 2"></path>
                          <path d="m9 17-2 2"></path>
                          <path d="M8.5 15.5 7 14"></path>
                          <path d="M-4 1v50"></path>
                        </svg>
                      </div>
                      <h5 className="font-semibold text-pink-200 uppercase tracking-wider text-sm">Backup Strategy</h5>
                    </div>                    <div className="bg-black/50 p-3 rounded-lg border border-pink-500/10">
                      <p className="text-gray-100">{analysisData.deployment_strategy.backup_strategy}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}          {analysisData.security_considerations && (
            <div className="px-6 py-5 border-b border-pink-500/20">              <h3 className="text-xl font-bold text-pink-300 mb-5 flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500/25 to-red-500/25 flex items-center justify-center mr-3 border border-pink-500/30 shadow-md shadow-pink-500/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    <circle cx="12" cy="16" r="1"></circle>
                  </svg>
                </div>
                <div>
                  <span className="bg-gradient-to-r from-pink-200 to-red-200 bg-clip-text text-transparent">Security Considerations</span>
                  <div className="text-xs font-normal text-gray-400 mt-1">Protection measures and security protocols for data and application integrity</div>
                </div>
              </h3>              <div className="border border-pink-500/30 rounded-xl p-5 bg-black/70 backdrop-blur-sm relative overflow-hidden shadow-lg shadow-pink-500/10 hover:border-pink-500/40 transition-all duration-300 group">
                <div className="absolute -z-10 top-0 right-0 w-1/2 h-1/2 rounded-full bg-pink-600/10 blur-xl group-hover:bg-pink-600/15 transition-all duration-300"></div>
                <div className="absolute -z-10 bottom-0 left-0 w-1/3 h-1/3 rounded-full bg-red-500/10 blur-xl"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">                  <div className="bg-black/60 p-4 rounded-lg border border-pink-500/20 shadow-inner shadow-pink-500/5">
                    <div className="flex items-center mb-3 border-b border-pink-500/15 pb-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-500/20 to-red-500/20 flex items-center justify-center mr-2.5 border border-pink-500/15">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                          <circle cx="12" cy="11" r="1"></circle>
                          <path d="M12 11v3"></path>
                        </svg>
                      </div>
                      <h5 className="font-semibold text-pink-200 uppercase tracking-wider text-sm">Authentication Method</h5>
                    </div>
                    <div className="bg-black/50 p-3 rounded-lg border border-pink-500/10">
                      <p className="text-gray-100">{analysisData.security_considerations.authentication_method}</p>
                    </div>
                  </div>
                  
                  <div className="bg-black/60 p-4 rounded-lg border border-pink-500/20 shadow-inner shadow-pink-500/5">
                    <div className="flex items-center mb-3 border-b border-pink-500/15 pb-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-500/20 to-red-500/20 flex items-center justify-center mr-2.5 border border-pink-500/15">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                          <circle cx="9" cy="7" r="4"></circle>
                          <line x1="19" x2="19" y1="8" y2="14"></line>
                          <line x1="22" x2="16" y1="11" y2="11"></line>
                        </svg>
                      </div>
                      <h5 className="font-semibold text-pink-200 uppercase tracking-wider text-sm">Authorization Approach</h5>
                    </div>
                    <div className="bg-black/50 p-3 rounded-lg border border-pink-500/10">
                      <p className="text-gray-100">{analysisData.security_considerations.authorization_approach}</p>
                    </div>
                  </div>
                  
                  {analysisData.security_considerations.data_encryption && (                    <div className="bg-black/60 p-4 rounded-lg border border-pink-500/20 shadow-inner shadow-pink-500/5">
                      <div className="flex items-center mb-3 border-b border-pink-500/15 pb-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-500/20 to-red-500/20 flex items-center justify-center mr-2.5 border border-pink-500/15">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                            <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                            <path d="m8 12 2 2 6-6"></path>
                            <path d="M12 12h.01"></path>
                          </svg>
                        </div>
                        <h5 className="font-semibold text-pink-200 uppercase tracking-wider text-sm">Data Encryption</h5>
                      </div>
                      <div className="bg-black/50 p-3 rounded-lg border border-pink-500/10">
                        <ul className="space-y-2">
                          {Object.entries(analysisData.security_considerations.data_encryption).map(([key, value], i) => (
                            <li key={i} className="flex items-start">
                              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-pink-500/15 to-red-500/15 flex items-center justify-center mr-3 mt-0.5 border border-pink-500/10">
                                <span className="text-[10px] font-bold text-pink-200">{i + 1}</span>
                              </div>
                              <div>
                                <span className="font-bold text-pink-200">{key}:</span> 
                                <span className="text-gray-100 ml-1">{value as React.ReactNode}</span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {analysisData.security_considerations.security_best_practices && (                    <div className="bg-black/60 p-4 rounded-lg border border-pink-500/20 shadow-inner shadow-pink-500/5">
                      <div className="flex items-center mb-3 border-b border-pink-500/15 pb-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-500/20 to-red-500/20 flex items-center justify-center mr-2.5 border border-pink-500/15">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                            <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.444.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z"></path>
                          </svg>
                        </div>
                        <h5 className="font-semibold text-pink-200 uppercase tracking-wider text-sm">Security Best Practices</h5>
                        <span className="ml-3 bg-pink-500/15 text-xs font-bold text-pink-200 px-2.5 py-1 rounded-full border border-pink-500/15 shadow-inner shadow-pink-500/5">
                          {analysisData.security_considerations.security_best_practices.length}
                        </span>
                      </div>
                      <div className="bg-black/50 p-3 rounded-lg border border-pink-500/10">
                        <ul className="space-y-2">
                          {analysisData.security_considerations.security_best_practices.map((practice, i) => (
                            <li key={i} className="flex items-start">
                              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-pink-500/15 to-red-500/15 flex items-center justify-center mr-3 mt-0.5 border border-pink-500/10">
                                <span className="text-[10px] font-bold text-pink-200">{i + 1}</span>
                              </div>
                              <span className="text-gray-100">{practice}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {analysisData.security_considerations.compliance_considerations && (                    <div className="bg-black/60 p-4 rounded-lg border border-pink-500/20 shadow-inner shadow-pink-500/5">
                      <div className="flex items-center mb-3 border-b border-pink-500/15 pb-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-500/20 to-red-500/20 flex items-center justify-center mr-2.5 border border-pink-500/15">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                            <path d="M9 11v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2zm12-2h-2a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2z"></path>
                            <path d="M14 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z"></path>
                            <path d="M3 5a2 2 0 1 0 4 0 2 2 0 1 0-4 0z"></path>
                            <path d="M7 9.12A5.002 5.002 0 0 1 12 5h0a5 5 0 0 1 5 5 5 5 0 0 1-5 5h-4"></path>
                          </svg>
                        </div>
                        <h5 className="font-semibold text-pink-200 uppercase tracking-wider text-sm">Compliance Considerations</h5>
                        <span className="ml-3 bg-pink-500/15 text-xs font-bold text-pink-200 px-2.5 py-1 rounded-full border border-pink-500/15 shadow-inner shadow-pink-500/5">
                          {analysisData.security_considerations.compliance_considerations.length}
                        </span>
                      </div>
                      <div className="bg-black/50 p-3 rounded-lg border border-pink-500/10">
                        <ul className="space-y-2">
                          {analysisData.security_considerations.compliance_considerations.map((compliance, i) => (
                            <li key={i} className="flex items-start">
                              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-pink-500/15 to-red-500/15 flex items-center justify-center mr-3 mt-0.5 border border-pink-500/10">
                                <span className="text-[10px] font-bold text-pink-200">{i + 1}</span>
                              </div>
                              <span className="text-gray-100">{compliance}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {analysisData.security_considerations.security_testing && (
                    <div className="bg-black/60 p-4 rounded-lg border border-red-500/20 shadow-inner shadow-red-500/5">
                      <div className="flex items-center mb-3 border-b border-red-500/15 pb-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 flex items-center justify-center mr-2.5 border border-red-500/15">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-200">
                            <path d="M13.1 2s.9 1.1.9 2.9c0 1.8-.9 2.9-.9 2.9"></path>
                            <path d="M19.2 7.8s-1.1.9-2.9.9-2.9-.9-2.9-.9"></path>
                            <path d="M16.3 13.1s-1.1.9-2.9.9-2.9-.9-2.9-.9"></path>
                            <path d="M12 17.1s-.9-1.1-.9-2.9c0-1.8.9-2.9.9-2.9"></path>
                            <path d="M7.8 14.2s-.9-1.1-.9-2.9c0-1.8.9-2.9.9-2.9"></path>
                            <path d="m4.9 9.1 15-5"></path>
                            <circle cx="12" cy="12" r="10"></circle>
                          </svg>
                        </div>
                        <h5 className="font-semibold text-red-200 uppercase tracking-wider text-sm">Security Testing</h5>
                        <span className="ml-3 bg-red-500/15 text-xs font-bold text-red-200 px-2.5 py-1 rounded-full border border-red-500/15 shadow-inner shadow-red-500/5">
                          {analysisData.security_considerations.security_testing.length}
                        </span>
                      </div>
                      <div className="bg-black/50 p-3 rounded-lg border border-red-500/10">
                        <ul className="space-y-2">
                          {analysisData.security_considerations.security_testing.map((test, i) => (
                            <li key={i} className="flex items-start">
                              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-red-500/15 to-orange-500/15 flex items-center justify-center mr-3 mt-0.5 border border-red-500/10">
                                <span className="text-[10px] font-bold text-red-200">{i + 1}</span>
                              </div>
                              <span className="text-gray-100">{test}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}          {analysisData.third_party_services && (
            <div className="px-6 py-5 border-b border-pink-500/20">
              <h3 className="text-xl font-bold text-pink-300 mb-5 flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500/25 to-red-500/25 flex items-center justify-center mr-3 border border-pink-500/30 shadow-md shadow-pink-500/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                    <path d="M16 6H3"></path>
                    <path d="M11 12H3"></path>
                    <path d="M16 18H3"></path>
                    <path d="M19 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                    <path d="M21 6h-4"></path>
                    <path d="M14 12h4"></path>
                    <path d="M21 18h-4"></path>
                    <path d="M14 16a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"></path>
                    <path d="M14 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"></path>
                  </svg>
                </div>
                <div>
                  <span className="bg-gradient-to-r from-pink-200 to-red-200 bg-clip-text text-transparent">Third-Party Services</span>
                  <div className="text-xs font-normal text-gray-400 mt-1">External services and integrations to enhance your application</div>
                </div>
              </h3>
              <div className="space-y-6">
                {Object.entries(analysisData.third_party_services).map(([category, services]: [string, any], index) => (
                  <div key={index} className="border border-pink-500/30 rounded-xl p-5 bg-black/70 backdrop-blur-sm relative overflow-hidden shadow-lg shadow-pink-500/10 hover:border-pink-500/40 transition-all duration-300 group">
                    <div className="absolute -z-10 top-0 right-0 w-1/2 h-1/2 rounded-full bg-pink-600/10 blur-xl group-hover:bg-pink-600/15 transition-all duration-300"></div>
                    <div className="absolute -z-10 bottom-0 left-0 w-1/3 h-1/3 rounded-full bg-red-500/10 blur-xl"></div>
                    
                    <div className="flex items-center mb-4 border-b border-pink-500/20 pb-3">
                      <div className="w-11 h-11 bg-gradient-to-br from-pink-500/25 to-red-500/25 rounded-full flex items-center justify-center mr-4 border border-pink-500/20 shadow-md shadow-pink-500/10">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                          <path d="m22 9-10 5-10-5V7l10 5 10-5V9Z"></path>
                          <path d="m2 7 10 5 10-5"></path>
                          <path d="M2 7v12h20V7"></path>
                          <path d="M12 22V12"></path>
                          <path d="m22 12-10 5-10-5"></path>
                        </svg>
                      </div>
                      <h4 className="font-bold text-xl bg-gradient-to-r from-pink-200 to-red-200 bg-clip-text text-transparent">
                        {category}
                      </h4>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {services.map((service: any, i: number) => (
                        <div key={i} className="bg-black/60 p-4 rounded-lg border border-pink-500/20 shadow-inner shadow-pink-500/5">
                          <div className="flex items-center mb-3 border-b border-pink-500/15 pb-2">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-500/20 to-red-500/20 flex items-center justify-center mr-2.5 border border-pink-500/15">
                              <span className="text-[10px] font-bold text-pink-200">{i + 1}</span>
                            </div>
                            <h5 className="font-semibold text-pink-200 tracking-wide">{service.name}</h5>
                          </div>
                          <div className="mb-3 bg-black/50 p-3 rounded-lg border border-pink-500/10">
                            <p className="text-sm text-gray-100">{service.description}</p>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className={`flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${
                              service.pricing_tier.toLowerCase().includes('free') 
                                ? 'bg-green-900/40 text-green-300 border border-green-500/30' 
                                : service.pricing_tier.toLowerCase().includes('premium') || service.pricing_tier.toLowerCase().includes('enterprise')
                                ? 'bg-pink-900/40 text-pink-300 border border-pink-500/30'
                                : 'bg-pink-900/40 text-pink-300 border border-pink-500/30'
                            }`}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                                <path d="M12 2v20"></path>
                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                              </svg>
                              {service.pricing_tier}
                            </div>
                            <div className={`flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${
                              service.integration_complexity.toLowerCase().includes('easy') || service.integration_complexity.toLowerCase().includes('simple')
                                ? 'bg-green-900/40 text-green-300 border border-green-500/30' 
                                : service.integration_complexity.toLowerCase().includes('complex') || service.integration_complexity.toLowerCase().includes('difficult')
                                ? 'bg-red-900/40 text-red-300 border border-red-500/30'
                                : 'bg-pink-900/40 text-pink-300 border border-pink-500/30'
                            }`}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                                <path d="M14 4c0-1.1.9-2 2-2"></path>
                                <path d="M20 2c1.1 0 2 .9 2 2"></path>
                                <path d="M22 8c0 1.1-.9 2-2 2"></path>
                                <path d="M16 10c-1.1 0-2-.9-2-2"></path>
                                <path d="m3 7 3 3 3-3"></path>
                                <path d="M6 10V4"></path>
                                <path d="M9 12v8"></path>
                                <path d="M15 12v8"></path>
                                <path d="M3 12h18"></path>
                                <path d="M3 20h18"></path>
                              </svg>
                              {service.integration_complexity}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}          {analysisData.development_tools && (
            <div className="px-6 py-5 border-b border-pink-500/20">
              <h3 className="text-xl font-bold text-pink-300 mb-5 flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500/25 to-red-500/25 flex items-center justify-center mr-3 border border-pink-500/30 shadow-md shadow-pink-500/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                    <path d="m7 11 2-2-2-2"></path>
                    <path d="M11 13h4"></path>
                    <path d="M21 10V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2"></path>
                    <path d="M21 15v-5"></path>
                    <path d="M18 13v2"></path>
                  </svg>
                </div>
                <div>
                  <span className="bg-gradient-to-r from-pink-200 to-red-200 bg-clip-text text-transparent">Development Tools</span>
                  <div className="text-xs font-normal text-gray-400 mt-1">Essential software and utilities for the development process</div>
                </div>
              </h3>

              <div className="border border-pink-500/30 rounded-xl p-5 bg-black/70 backdrop-blur-sm relative overflow-hidden shadow-lg shadow-pink-500/10 hover:border-pink-500/40 transition-all duration-300 group">
                <div className="absolute -z-10 top-0 right-0 w-1/2 h-1/2 rounded-full bg-pink-600/10 blur-xl group-hover:bg-pink-600/15 transition-all duration-300"></div>
                <div className="absolute -z-10 bottom-0 left-0 w-1/3 h-1/3 rounded-full bg-red-500/10 blur-xl"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {analysisData.development_tools.map((tool, index) => (
                    <div key={index} className="bg-black/60 p-4 rounded-lg border border-pink-500/20 shadow-inner shadow-pink-500/5 hover:border-pink-500/30 transition-all duration-300">
                      <div className="flex items-center mb-3 border-b border-pink-500/15 pb-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500/20 to-red-500/20 flex items-center justify-center mr-3 border border-pink-500/15">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                            <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4"></path>
                            <path d="M17 8l-5-5-5 5"></path>
                            <path d="M12 4v12"></path>
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-bold text-pink-200 truncate">{tool.name}</h4>
                          <span className="text-xs bg-pink-900/30 border border-pink-500/20 text-pink-300 px-2.5 py-0.5 rounded-full font-medium">
                            {tool.category}
                          </span>
                        </div>
                      </div>
                      
                      <div className="bg-black/50 p-3 rounded-lg border border-pink-500/10 mb-3">
                        <p className="text-sm text-gray-100">{tool.description}</p>
                      </div>

                      <div className={`flex items-center px-3 py-1.5 rounded-full text-xs font-semibold w-fit ${
                        tool.pricing.toLowerCase().includes('free') 
                          ? 'bg-green-900/40 text-green-300 border border-green-500/30' 
                          : tool.pricing.toLowerCase().includes('enterprise') || tool.pricing.toLowerCase().includes('custom')
                          ? 'bg-pink-900/40 text-pink-300 border border-pink-500/30'
                          : 'bg-pink-900/40 text-pink-300 border border-pink-500/30'
                      }`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                          <path d="M12 2v20"></path>
                          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                        </svg>
                        {tool.pricing}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
            <div className="px-6 py-5 border-b border-pink-500/20">
            <h3 className="text-xl font-bold text-pink-300 mb-5 flex items-center">              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500/25 to-red-500/25 flex items-center justify-center mr-3 border border-pink-500/30 shadow-md shadow-pink-500/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                  <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path>
                  <path d="M18 14v4h-8v-4l2-2-2-2v-4h8v4l-2 2 2 2Z"></path>
                </svg>
              </div>
              <div>
                <span className="bg-gradient-to-r from-pink-200 to-red-200 bg-clip-text text-transparent">Implementation Roadmap</span>
                <div className="text-xs font-normal text-gray-400 mt-1">Phased development plan with milestones and deliverables</div>
              </div>
            </h3>            <div className="border border-pink-500/30 rounded-xl p-5 bg-black/70 backdrop-blur-sm relative overflow-hidden shadow-lg shadow-pink-500/10 hover:border-pink-500/40 transition-all duration-300 group">
              <div className="absolute top-0 bottom-0 left-[2.25rem] w-0.5 bg-pink-500/20 z-0"></div>
              <div className="space-y-6 relative z-10">
                {analysisData.implementation_roadmap && analysisData.implementation_roadmap.map((phase: any, index: number) => (                    <div key={index} className="bg-black/60 p-5 rounded-lg border border-pink-500/20 shadow-inner shadow-pink-500/5 pl-14 relative">
                      <div className="absolute left-4 top-5 w-8 h-8 rounded-full bg-gradient-to-br from-pink-500/30 to-red-500/30 flex items-center justify-center border border-pink-500/30 shadow-md shadow-pink-500/10">
                        <span className="font-bold text-pink-200">{index + 1}</span>
                      </div>
                      
                      <div className="flex justify-between items-center mb-4 border-b border-pink-500/15 pb-3">
                        <h4 className="font-bold text-lg bg-gradient-to-r from-pink-200 to-red-200 bg-clip-text text-transparent">
                          {phase.name || phase.phase}
                        </h4>
                        {phase.duration && (
                          <span className="bg-pink-900/30 border border-pink-500/20 text-pink-300 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5">
                              <circle cx="12" cy="12" r="10"></circle>
                              <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            {phase.duration} weeks
                          </span>
                        )}
                      </div>
                      
                      {phase.description && (
                        <div className="bg-black/50 p-3 rounded-lg border border-pink-500/10 mb-4">
                          <p className="text-gray-100">{phase.description}</p>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {phase.features && (
                          <div className="bg-black/50 p-4 rounded-lg border border-indigo-500/10">
                            <div className="flex items-center mb-3 border-b border-indigo-500/15 pb-2">
                              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500/20 to-violet-500/20 flex items-center justify-center mr-2.5 border border-indigo-500/15">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-200">
                                  <path d="M12 2v1"></path>
                                  <path d="m4.93 4.93 1.41 1.41"></path>
                                  <path d="M2 12h1"></path>
                                  <path d="m19.07 4.93-1.41 1.41"></path>
                                  <path d="M21 12h-1"></path>
                                  <path d="M15.947 12.65a4 4 0 0 0-5.925-4.128"></path>
                                  <path d="M13 22H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h4"></path>
                                  <path d="M19 10v7a2 2 0 0 1-2 2h-5"></path>
                                  <path d="M16 19h6"></path>
                                  <path d="M19 16v6"></path>
                                </svg>
                              </div>                              <h5 className="font-semibold text-pink-200 uppercase tracking-wider text-sm">Features</h5>
                              <span className="ml-3 bg-pink-500/15 text-xs font-bold text-pink-200 px-2.5 py-1 rounded-full border border-pink-500/15 shadow-inner shadow-pink-500/5">
                                {phase.features.length}
                              </span>
                            </div>
                            <ul className="space-y-2">
                              {phase.features.map((feature: string, i: number) => (
                                <li key={i} className="flex items-start">
                                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500/15 to-violet-500/15 flex items-center justify-center mr-3 mt-0.5 border border-indigo-500/10">
                                    <span className="text-[10px] font-bold text-indigo-200">{i + 1}</span>
                                  </div>
                                  <span className="text-gray-100">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {(phase.tasks || phase.technical_deliverables) && (
                          <div className="bg-black/50 p-4 rounded-lg border border-indigo-500/10">
                            <div className="flex items-center mb-3 border-b border-indigo-500/15 pb-2">
                              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500/20 to-violet-500/20 flex items-center justify-center mr-2.5 border border-indigo-500/15">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-200">
                                  <path d="M12 22c6 0 8-2 8-8V4H8v10H4v8c0 6 2 8 8 8Z"></path>
                                  <path d="M4 14h8V4"></path>
                                  <path d="M4 14v8"></path>
                                </svg>
                              </div>
                              <h5 className="font-semibold text-indigo-200 uppercase tracking-wider text-sm">
                                {phase.technical_deliverables ? 'Technical Deliverables' : 'Tasks'}
                              </h5>
                              <span className="ml-3 bg-indigo-500/15 text-xs font-bold text-indigo-200 px-2.5 py-1 rounded-full border border-indigo-500/15 shadow-inner shadow-indigo-500/5">
                                {(phase.tasks || phase.technical_deliverables).length}
                              </span>
                            </div>
                            <ul className="space-y-2">
                              {(phase.tasks || phase.technical_deliverables).map((task: string, i: number) => (
                                <li key={i} className="flex items-start">
                                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500/15 to-violet-500/15 flex items-center justify-center mr-3 mt-0.5 border border-indigo-500/10">
                                    <span className="text-[10px] font-bold text-indigo-200">{i + 1}</span>
                                  </div>
                                  <span className="text-gray-100">{task}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
            {analysisData.architecture_diagram && (
            <div className="px-6 py-5">
              <h3 className="text-xl font-bold text-pink-300 mb-5 flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500/25 to-fuchsia-500/25 flex items-center justify-center mr-3 border border-pink-500/30 shadow-md shadow-pink-500/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                    <path d="M2 3h20"></path>
                    <path d="M2 8h4"></path>
                    <path d="M6 8v9"></path>
                    <path d="m2 17 4-5 4 5"></path>
                    <path d="M18 8h4"></path>
                    <path d="M18 8v9"></path>
                    <path d="m18 17 4-5"></path>
                    <path d="m10 13 2-10 2 10"></path>
                    <path d="M10 13h4"></path>
                    <path d="m10 19 2-2 2 2"></path>
                    <path d="m10 19 2 2 2-2"></path>
                  </svg>
                </div>
                <div>
                  <span className="bg-gradient-to-r from-pink-200 to-fuchsia-200 bg-clip-text text-transparent">Architecture Diagram</span>
                  <div className="text-xs font-normal text-gray-400 mt-1">Visual representation of system architecture and component relationships</div>
                </div>
              </h3>
              <div className="border border-pink-500/30 rounded-xl p-5 bg-black/70 backdrop-blur-sm relative overflow-hidden shadow-lg shadow-pink-500/10 hover:border-pink-500/40 transition-all duration-300 group">
                <div className="absolute -z-10 top-0 right-0 w-1/2 h-1/2 rounded-full bg-pink-600/10 blur-xl group-hover:bg-pink-600/15 transition-all duration-300"></div>
                <div className="absolute -z-10 bottom-0 left-0 w-1/3 h-1/3 rounded-full bg-fuchsia-500/10 blur-xl"></div>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500/25 to-fuchsia-500/25 flex items-center justify-center mr-3 border border-pink-500/20">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-200">
                        <path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z"></path>
                        <path d="M12 13v9"></path>
                        <path d="M5 13v9"></path>
                        <path d="M19 13v9"></path>
                      </svg>
                    </div>
                    <h4 className="font-bold text-lg text-pink-200">System Architecture Flow</h4>
                  </div>
                  
                  <button 
                    className="px-4 py-2 bg-pink-900/20 text-pink-300 rounded-lg hover:bg-pink-900/30 text-sm font-medium border border-pink-500/20 transition-colors duration-200 flex items-center"
                    onClick={() => setRenderKey(prev => prev + 1)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M17 3v2"></path>
                      <path d="M21 7v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7"></path>
                      <path d="M7 3v2"></path>
                      <path d="M3 7h18"></path>
                      <path d="M12 10v8"></path>
                      <path d="m9 14 3 3 3-3"></path>
                    </svg>
                    Refresh Diagram
                  </button>
                </div>
                
                <div className="bg-black/60 p-5 rounded-xl border border-pink-500/20 shadow-inner shadow-pink-500/5 overflow-hidden">
                  <div className="mermaid-diagram-container relative">
                    <div ref={mermaidRef} className="mermaid w-full overflow-auto bg-black/50 p-4 rounded-lg"></div>
                  </div>
                </div>
                
                <div className="mt-4 text-sm text-gray-400 bg-pink-900/20 p-3 rounded-lg border border-pink-500/20">
                  <div className="flex items-center mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-pink-300">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 16v-4"></path>
                      <path d="M12 8h.01"></path>
                    </svg>
                    <span className="text-pink-300 font-medium">Diagram Legend</span>
                  </div>
                  <p>This diagram illustrates the relationship between components in your system architecture. Refresh the diagram if components don't render correctly.</p>
                </div>
              </div>
            </div>
          )}
      </section>
      {/* Footer */}
      <footer className="mt-12 border-t border-pink-500/15 pt-6 pb-2 text-center">
        <div className="flex justify-center items-center mb-4 space-x-4">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500/10 to-red-500/10 border border-pink-500/20 rounded-full flex items-center justify-center shadow-md shadow-pink-500/5 hover:shadow-pink-500/10 transition-all duration-300 hover:border-pink-500/30">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-300">
              <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"></path>
            </svg>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500/10 to-red-500/10 border border-pink-500/20 rounded-full flex items-center justify-center shadow-md shadow-pink-500/5 hover:shadow-pink-500/10 transition-all duration-300 hover:border-pink-500/30">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-300">
              <path d="M2 16V4a2 2 0 0 1 2-2h12.926a2 2 0 0 1 1.993 1.85L19 4l-.001 2H22a2 2 0 0 1 1.995 1.85L24 8v6a2 2 0 0 1-1.85 1.995L22 16h-3v3a2 2 0 0 1-1.85 1.995L17 21H6a2 2 0 0 1-1.995-1.85L4 19v-3H2zm18-2V8l-3.001.001L17 16h3zM6 19h11v-3a2 2 0 0 1 1.85-1.995L19 14V6.001L18.999 4H4v12h2z"></path>
            </svg>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500/10 to-red-500/10 border border-pink-500/20 rounded-full flex items-center justify-center shadow-md shadow-pink-500/5 hover:shadow-pink-500/10 transition-all duration-300 hover:border-pink-500/30">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-300">
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </svg>
          </div>
        </div>
        <div className="bg-gradient-to-r from-pink-500/5 via-red-500/5 to-pink-500/5 backdrop-blur-sm p-4 rounded-xl border border-pink-500/10 inline-block">
          <p className="bg-gradient-to-r from-pink-300 via-white to-red-300 bg-clip-text text-transparent text-sm font-medium">© {new Date().getFullYear()} Startup MVP Builder. All rights reserved.</p>
          <p className="text-gray-500 text-xs mt-2">Technical architecture designed for scaling from prototype to production</p>
        </div>
      </footer>
    </div>
  );
}
