'use client';

import { useState } from 'react';
import { Sparkles, Rocket, BarChart, Code, ChevronRight } from 'lucide-react';
import { runFullAgentChain } from '../utils/agentChain';

export default function MVPBuilderForm() {
  const [startupIdea, setStartupIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState<any>(null);
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    { 
      title: 'Market Analysis', 
      subtitle: 'Analyzing market opportunities',
      icon: BarChart,
      color: 'from-blue-500 to-indigo-600' 
    },
    { 
      title: 'Product Roadmap', 
      subtitle: 'Creating your product plan',
      icon: Rocket,
      color: 'from-pink-500 to-red-600' 
    },
    { 
      title: 'Technical Blueprint', 
      subtitle: 'Designing your technology stack',
      icon: Code,
      color: 'from-purple-500 to-violet-600' 
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (startupIdea.trim().length < 10) {
      setError('Please provide a more detailed description of your startup idea (at least 10 characters).');
      return;
    }
    
    setLoading(true);
    setError('');
    setResults(null);
    setActiveStep(0);
    
    try {
      // Update the step counter as each agent completes
      const updateStep = (step: number) => {
        setActiveStep(step);
      };
      
      // This will handle all three agents in sequence
      const result = await runFullAgentChain(startupIdea);
      setResults(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while processing your request.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full">
      <h1 className="text-5xl md:text-6xl font-extrabold text-center whitespace-nowrap bg-gradient-to-r from-pink-500 to-red-600 text-transparent bg-clip-text mb-10 leading-[1.25] pb-2">
        Build Stunning MVPs Effortlessly
      </h1>
      <p className="text-lg md:text-xl text-gray-300 text-center mb-10 max-w-2xl">
        Startup MVP Builder can create amazing MVP blueprints with just a few lines of prompt.
      </p>
      <form onSubmit={handleSubmit} className="w-full max-w-2xl flex flex-col items-center gap-6">
        <div className="w-full flex items-center bg-gray-900/80 rounded-full px-6 py-3 shadow-lg border border-pink-500/20 focus-within:ring-2 focus-within:ring-pink-500/40 transition-all">
          <Sparkles className="w-6 h-6 text-pink-400 mr-3" />
          <input
            id="startup-idea"
            type="text"
            value={startupIdea}
            onChange={(e) => setStartupIdea(e.target.value)}
            className="flex-1 bg-transparent outline-none border-none text-white placeholder-gray-400 text-lg"
            placeholder="How can we help your startup today?"
            disabled={loading}
            autoFocus
          />
        </div>
        {error && (
          <div className="bg-red-900/30 border border-red-500/50 text-red-200 p-4 rounded-lg backdrop-blur-sm w-full text-center">
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className={`w-full max-w-xs inline-flex items-center justify-center px-6 py-3 rounded-full text-white font-semibold text-lg transition-all duration-300 shadow-lg relative overflow-hidden ${
            loading 
              ? 'bg-gray-700/50 cursor-not-allowed border border-gray-600/50' 
              : 'bg-gradient-to-r from-pink-600 to-red-600 hover:shadow-xl hover:shadow-pink-600/30 border border-transparent'
          }`}
        >
          {loading ? (
            <>
              <div className="animate-spin mr-2 h-5 w-5 border-t-2 border-white rounded-full"></div>
              Processing...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Build My MVP
            </>
          )}
        </button>
      </form>
      {loading && (
        <div className="space-y-6 mt-10">
          <h2 className="text-xl font-semibold text-gray-200 flex items-center justify-center">
            <Sparkles className="mr-2 w-5 h-5 text-pink-500" />
            Building your MVP
          </h2>
          <div className="space-y-5">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`flex items-start p-4 border rounded-lg backdrop-blur-sm ${
                  activeStep === index 
                    ? 'border-pink-500/50 bg-pink-500/10' 
                    : activeStep > index 
                      ? 'border-green-500/50 bg-green-500/10' 
                      : 'border-gray-700/50 bg-gray-800/30'
                }`}
              >                <div className={`flex items-center justify-center w-10 h-10 rounded-full mr-4 shadow-lg ${
                  activeStep === index 
                    ? `bg-gradient-to-br ${step.color} text-white` 
                    : activeStep > index 
                      ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white' 
                      : 'bg-gray-800/60 text-gray-400'
                }`}>
                  {activeStep > index ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-white">{step.title}</h3>
                  <p className="text-sm text-gray-400">{step.subtitle}</p>
                </div>
                {activeStep === index && (
                  <div className="ml-auto">
                    <div className="animate-pulse w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 to-red-500 shadow-lg shadow-pink-500/30"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {results && (
        <div className="space-y-8 mt-12 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-xl blur-xl"></div>
          
          <h2 className="text-2xl font-bold text-white flex items-center relative z-10">
            <Sparkles className="mr-3 w-6 h-6 text-pink-500" />
            Your MVP Blueprint
          </h2>
          
          <div className="space-y-8 relative z-10">
            {/* Market Analysis Section */}
            <div className="border border-pink-500/30 rounded-xl overflow-hidden backdrop-blur-md"
                style={{
                  background: 'radial-gradient(circle at bottom right, rgba(236,72,153,0.05), rgba(0,0,0,0.6) 70%)'
                }}>
              <div className="bg-gradient-to-r from-blue-500/10 to-indigo-600/10 p-5 border-b border-blue-500/30 flex items-center">
                <BarChart className="w-5 h-5 text-blue-400 mr-2" />
                <h3 className="text-lg font-semibold text-blue-300">Market Analysis</h3>
              </div>
              <div className="p-6 space-y-5">
                <div>
                  <h4 className="font-medium text-gray-200">Executive Summary</h4>
                  <p className="mt-2 text-gray-300">{results.marketAnalysis.executive_summary}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-200">Market Opportunity Score</h4>
                  <div className="mt-2 inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-indigo-600/20 border border-blue-500/30">
                    <span className="text-xl font-bold text-blue-300">{results.marketAnalysis.opportunity_score}/10</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Product Roadmap Section */}
            <div className="border border-pink-500/30 rounded-xl overflow-hidden backdrop-blur-md"
                style={{
                  background: 'radial-gradient(circle at bottom right, rgba(236,72,153,0.05), rgba(0,0,0,0.6) 70%)'
                }}>
              <div className="bg-gradient-to-r from-pink-500/10 to-red-600/10 p-5 border-b border-pink-500/30 flex items-center">
                <Rocket className="w-5 h-5 text-pink-400 mr-2" />
                <h3 className="text-lg font-semibold text-pink-300">Product Roadmap</h3>
              </div>
              <div className="p-6 space-y-5">
                <div>
                  <h4 className="font-medium text-gray-200">MVP Features</h4>
                  <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-300">
                    {results.productRoadmap.mvp_features.map((feature: string, i: number) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-200">User Personas</h4>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {results.productRoadmap.user_personas.slice(0, 2).map((persona: any, i: number) => (
                      <div key={i} className="border border-pink-500/30 rounded-lg p-4 bg-gray-900/40 backdrop-blur-sm">
                        <div className="font-medium text-pink-300">{persona.name}</div>
                        <p className="text-sm text-gray-400 mt-1">{persona.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
              {/* Technical Blueprint Section */}
            <div className="border border-pink-500/30 rounded-xl overflow-hidden backdrop-blur-md"
                style={{
                  background: 'radial-gradient(circle at bottom right, rgba(236,72,153,0.05), rgba(0,0,0,0.6) 70%)'
                }}>
              <div className="bg-gradient-to-r from-purple-500/10 to-violet-600/10 p-5 border-b border-purple-500/30 flex items-center">
                <Code className="w-5 h-5 text-purple-400 mr-2" />
                <h3 className="text-lg font-semibold text-purple-300">Technical Blueprint</h3>
              </div>
              <div className="p-6 space-y-5">
                <div>
                  <h4 className="font-medium text-gray-200">Recommended Tech Stack</h4>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(results.techBlueprint.tech_stack).slice(0, 4).map(([category, techs]: [string, any], i: number) => (
                      <div key={i} className="border border-purple-500/30 rounded-lg p-4 bg-gray-900/40 backdrop-blur-sm">
                        <div className="font-medium text-purple-300">{category}</div>
                        <ul className="list-disc pl-5 mt-1 text-gray-300">
                          {techs.slice(0, 3).map((tech: any, j: number) => (
                            <li key={j} className="text-sm">{tech.name}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
              <div className="flex justify-center pt-6">
              <button
                onClick={() => window.location.href = `/dashboard/history/${results.techBlueprint.session_id}`}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-600 to-red-600 rounded-lg text-white font-medium shadow-lg shadow-pink-600/30 hover:shadow-xl hover:shadow-pink-600/40 transition-all duration-300 relative overflow-hidden"
              >
                <span className="mr-2">View Complete Report</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
