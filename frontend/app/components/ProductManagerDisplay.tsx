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
    <div className="space-y-8 w-full">
      {/* Startup Idea Header */}
      <section className="bg-black/80 border border-pink-500/30 rounded-2xl shadow-xl shadow-pink-500/10 p-6 backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-pink-400 mb-2">Product Roadmap</h1>
            <h2 className="text-xl font-semibold text-pink-300 mb-1">{analysisData.startup_idea}</h2>
          </div>
        </div>
      </section>
      
      {/* User Personas Section */}
      <section className="bg-black/80 border border-pink-500/30 rounded-2xl shadow-xl shadow-pink-500/10 p-6 backdrop-blur-md">
        <h2 className="text-2xl font-bold text-pink-400 mb-4">User Personas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {analysisData.user_personas.map((persona, index) => (
            <div key={index} className="border border-pink-500/20 rounded-xl p-4 bg-black/60 backdrop-blur">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-pink-200">{persona.name}</h3>
                <span className="px-2 py-1 bg-pink-500/10 text-pink-400 text-xs rounded-full font-semibold">
                  {persona.tech_savviness} Tech Savviness
                </span>
              </div>
              <p className="text-gray-100 mb-3">{persona.description}</p>
              
              {/* Demographics */}
              <div className="mb-4">
                <h4 className="font-bold text-base mb-2 text-pink-200">Demographics</h4>
                <div className="bg-black/40 p-3 rounded">
                  {Object.entries(persona.demographics).map(([key, value]) => (
                    <div key={key} className="mb-1 text-sm">
                      <span className="font-medium text-pink-200">{key.charAt(0).toUpperCase() + key.slice(1)}: </span>
                      <span className="text-gray-100">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
                {/* Pain Points */}
              <div className="mb-3">
                <h4 className="font-bold text-base mb-1 text-pink-200">Pain Points</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {persona.pain_points.map((point, idx) => (
                    <li key={idx} className="text-gray-100">{point}</li>
                  ))}
                </ul>
              </div>
                {/* Goals */}
              <div className="mb-3">
                <h4 className="font-bold text-base mb-1 text-pink-200">Goals</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {persona.goals.map((goal, idx) => (
                    <li key={idx} className="text-gray-100">{goal}</li>
                  ))}
                </ul>
              </div>
                {/* Behaviors */}
              <div className="mb-3">
                <h4 className="font-bold text-base mb-1 text-pink-200">Behaviors</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {persona.behaviors.map((behavior, idx) => (
                    <li key={idx} className="text-gray-100">{behavior}</li>
                  ))}
                </ul>
              </div>
                {/* Needs */}
              <div>
                <h4 className="font-bold text-base mb-1 text-pink-200">Needs</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {persona.needs.map((need, idx) => (
                    <li key={idx} className="text-gray-100">{need}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Features Section */}
      <section className="bg-black/80 border border-pink-500/30 rounded-2xl shadow-xl shadow-pink-500/10 p-6 backdrop-blur-md">
        <h2 className="text-2xl font-bold text-pink-400 mb-4">Features</h2>
        <div className="space-y-6">
          {analysisData.features.map((feature, index) => (
            <div key={index} className="border border-pink-500/20 rounded-xl p-4 bg-black/60 backdrop-blur">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-pink-200">{feature.name}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(feature.priority)}`}>
                  {feature.priority} Priority
                </span>              </div>
              <p className="text-gray-100 mb-4">{feature.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <span className="text-sm font-medium text-pink-200">Effort: </span>
                  <span className="text-sm text-gray-100">{feature.effort}/10</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-pink-200">Impact: </span>
                  <span className="text-sm text-gray-100">{feature.impact}/10</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-pink-200">Technical Complexity: </span>
                  <span className="text-sm text-gray-100">{feature.technical_complexity}/10</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">                {/* User Stories */}
                <div className="mb-3">
                  <h4 className="font-bold text-base mb-1 text-pink-200">User Stories</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    {feature.user_stories.map((story, idx) => (
                    <li key={idx} className="text-gray-100">{story}</li>
                    ))}
                  </ul>
                </div>
                  {/* Target Personas */}
                <div className="mb-3">
                  <h4 className="font-bold text-base mb-1 text-pink-200">Target Personas</h4>
                  <div className="flex flex-wrap gap-2">
                    {feature.target_personas.map((persona, idx) => (
                      <span key={idx} className="bg-pink-500/10 text-pink-200 px-2 py-1 rounded text-xs font-bold">
                        {persona}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Dependencies and Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">                {feature.dependencies.length > 0 && (
                  <div>
                    <h4 className="font-bold text-base mb-1 text-pink-200">Dependencies</h4>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      {feature.dependencies.map((dependency, idx) => (
                        <li key={idx} className="text-gray-100">{dependency}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div>
                  <h4 className="font-bold text-base mb-1 text-pink-200">Metrics</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    {feature.metrics.map((metric, idx) => (
                      <li key={idx} className="text-gray-100">{metric}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Development Roadmap */}
      <section className="bg-black/80 border border-pink-500/30 rounded-2xl shadow-xl shadow-pink-500/10 p-6 backdrop-blur-md">
        <h2 className="text-2xl font-bold text-pink-400 mb-4">Development Roadmap</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* MVP Features */}
          <div className="border border-pink-500/20 rounded-xl p-4 bg-black/60">
            <h3 className="text-lg font-semibold mb-3 text-pink-300">MVP Features</h3>            <ul className="list-disc pl-5 space-y-2">
              {analysisData.mvp_features.map((feature, index) => (
                <li key={index} className="text-gray-100">{feature}</li>
              ))}
            </ul>
          </div>
          
          {/* Milestone 1 Features */}
          <div className="border border-pink-500/20 rounded-xl p-4 bg-black/60">
            <h3 className="text-lg font-semibold mb-3 text-pink-300">Milestone 1 Features</h3>
            <ul className="list-disc pl-5 space-y-2">
              {analysisData.milestone_1_features.map((feature, index) => (
                <li key={index} className="text-gray-100">{feature}</li>
              ))}
            </ul>
          </div>
          
          {/* Milestone 2 Features */}
          <div className="border border-pink-500/20 rounded-xl p-4 bg-black/60">
            <h3 className="text-lg font-semibold mb-3 text-pink-300">Milestone 2 Features</h3>
            <ul className="list-disc pl-5 space-y-2">
              {analysisData.milestone_2_features.map((feature, index) => (
                <li key={index} className="text-gray-100">{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      
      {/* Validation Experiments */}
      <section className="bg-black/80 border border-pink-500/30 rounded-2xl shadow-xl shadow-pink-500/10 p-6 backdrop-blur-md">
        <h2 className="text-2xl font-bold text-pink-400 mb-4">Validation Experiments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {analysisData.validation_experiments.map((experiment, index) => (
            <div key={index} className="border border-pink-500/20 rounded-xl p-4 bg-black/60">
              <h3 className="font-bold text-pink-200 mb-2">{experiment.name}</h3>
              <p className="text-gray-100 mb-3">{experiment.description}</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-pink-200">Method: </span>
                  <span className="text-gray-100">{experiment.method}</span>
                </div>
                <div>
                  <span className="font-medium text-pink-200">Success Criteria: </span>
                  <span className="text-gray-100">{experiment.success_criteria}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Success Metrics */}
      <section className="bg-black/80 border border-pink-500/30 rounded-2xl shadow-xl shadow-pink-500/10 p-6 backdrop-blur-md">
        <h2 className="text-2xl font-bold text-pink-400 mb-4">Success Metrics</h2>
        <div className="bg-black/60 p-5 rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(analysisData.success_metrics).map(([key, value], index) => (
              <div key={index} className="border-l-4 border-pink-500 pl-4 py-1">
                <h3 className="font-bold text-pink-200">{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h3>
                <p className="text-gray-100">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductManagerDisplay;
