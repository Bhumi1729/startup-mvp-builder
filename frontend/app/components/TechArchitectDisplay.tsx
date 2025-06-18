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
      <section className="bg-black/80 border border-pink-500/30 rounded-2xl shadow-xl shadow-pink-500/10 p-6 backdrop-blur-md">
        <h2 className="text-2xl font-bold text-pink-400 mb-4">Technical Blueprint</h2>
        <div className="bg-black/60 rounded-xl overflow-hidden">
          <div className="px-6 py-5 border-b border-pink-500/20">
            <h3 className="text-lg font-bold text-pink-600 mb-3">Technology Stack</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {analysisData.tech_stack && Object.entries(analysisData.tech_stack).map(([category, technologies]: [string, any], index: number) => (
                <div key={index} className="border border-pink-500/20 rounded-xl p-4 bg-black/40">
                  <h4 className="font-bold text-pink-600">{category}</h4>
                  <ul className="mt-2 space-y-2">
                    {technologies.map((tech: any, i: number) => (
                      <li key={i} className="text-sm text-gray-100">
                        <span className="font-bold text-pink-200">{tech.name}</span>
                        {tech.version && <span className="text-gray-100"> {tech.version}</span>}
                        <p className="text-gray-100 text-xs mt-1">{tech.justification}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="px-6 py-5 border-b border-pink-500/20">
            <h3 className="text-lg font-bold text-pink-600 mb-3">Database Schema</h3>
            <div className="space-y-4">
              {analysisData.database_schema && analysisData.database_schema.map((schema: any, index: number) => (
                <div key={index} className="border border-pink-500/20 rounded-xl p-4 bg-black/40">
                  <h4 className="font-bold text-pink-600">{schema.name} <span className="text-sm text-gray-100">({schema.type})</span></h4>
                  <p className="mt-1 text-sm text-gray-100">{schema.description}</p>
                  <div className="mt-3">
                    <h5 className="text-sm font-bold text-pink-200">Fields:</h5>
                    <ul className="mt-1 text-sm text-gray-100 list-disc pl-4">
                      {schema.fields && schema.fields.map((field: any, i: number) => (
                        <li key={i}>
                          {typeof field === 'string' ? field : Object.entries(field).map(([key, value]) => `${key}: ${value}`).join(', ')}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="px-6 py-5 border-b border-pink-500/20">
            <h3 className="text-lg font-bold text-pink-600 mb-3">API Endpoints</h3>
            <div className="space-y-4">
              {analysisData.api_endpoints && analysisData.api_endpoints.map((endpoint: any, index: number) => (
                <div key={index} className="border border-pink-500/20 rounded-xl p-4 bg-black/40">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      endpoint.method === 'GET' 
                        ? 'bg-blue-500/20 text-blue-300' 
                        : endpoint.method === 'POST'
                        ? 'bg-green-500/20 text-green-300'
                        : endpoint.method === 'PUT'
                        ? 'bg-yellow-500/20 text-yellow-300'
                        : endpoint.method === 'DELETE'
                        ? 'bg-pink-500/20 text-pink-300'
                        : 'bg-gray-700/40 text-gray-200'
                    }`}>
                      {endpoint.method}
                    </span>
                    <span className="font-mono text-sm text-gray-100">{endpoint.path}</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-100">{endpoint.description}</p>
                  <div className="mt-2 text-sm">
                    <span className="font-bold text-pink-200">Auth Required: </span>
                    <span className={endpoint.auth_required ? 'text-green-400' : 'text-gray-100'}>
                      {endpoint.auth_required ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {analysisData.deployment_strategy && (
            <div className="px-6 py-5 border-b border-pink-500/20">
              <h3 className="text-lg font-bold text-pink-600 mb-3">Deployment Strategy</h3>
              <div className="border border-pink-500/20 rounded-xl p-4 bg-black/40">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-bold text-pink-200">Recommended Approach</h4>
                    <p className="text-sm text-gray-100">{analysisData.deployment_strategy.recommended_approach}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-pink-200">Infrastructure</h4>
                    <p className="text-sm text-gray-100">{analysisData.deployment_strategy.infrastructure}</p>
                  </div>
                  {analysisData.deployment_strategy.ci_cd_pipeline && (
                    <div>
                      <h4 className="font-bold text-pink-200">CI/CD Pipeline</h4>
                      <ul className="mt-1 text-sm text-gray-100 list-disc pl-4">
                        {Object.entries(analysisData.deployment_strategy.ci_cd_pipeline).map(([key, value], i) => (
                          <li key={i}><span className="font-bold">{key}:</span> {value}</li>
                        ))}
                      </ul>
                    </div>
                  )}                  <div>
                    <h4 className="font-bold text-pink-200">Scaling Strategy</h4>
                    <p className="text-sm text-gray-100 whitespace-pre-line">{analysisData.deployment_strategy.scaling_strategy}</p>
                  </div>{analysisData.deployment_strategy.estimated_costs && (
                    <div>
                      <h4 className="font-bold text-pink-200">Estimated Costs</h4>
                      {typeof analysisData.deployment_strategy.estimated_costs === 'string' ? (
                        <p className="text-sm text-gray-100">{analysisData.deployment_strategy.estimated_costs}</p>
                      ) : (
                        <ul className="mt-1 text-sm text-gray-100 list-disc pl-4">
                          {Object.entries(analysisData.deployment_strategy.estimated_costs as Record<string, string>).map(([key, value], i) => (
                            <li key={i}><span className="font-bold">{key}:</span> {value}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                  {analysisData.deployment_strategy.monitoring_tools && (
                    <div>
                      <h4 className="font-bold text-pink-200">Monitoring Tools</h4>
                      <ul className="mt-1 text-sm text-gray-100 list-disc pl-4">
                        {analysisData.deployment_strategy.monitoring_tools.map((tool, i) => (
                          <li key={i}>{tool}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-pink-200">Backup Strategy</h4>
                    <p className="text-sm text-gray-100">{analysisData.deployment_strategy.backup_strategy}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {analysisData.security_considerations && (
            <div className="px-6 py-5 border-b border-pink-500/20">
              <h3 className="text-lg font-bold text-pink-600 mb-3">Security Considerations</h3>
              <div className="border border-pink-500/20 rounded-xl p-4 bg-black/40">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-bold text-pink-200">Authentication Method</h4>
                    <p className="text-sm text-gray-100">{analysisData.security_considerations.authentication_method}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-pink-200">Authorization Approach</h4>
                    <p className="text-sm text-gray-100">{analysisData.security_considerations.authorization_approach}</p>
                  </div>
                  {analysisData.security_considerations.data_encryption && (
                    <div>
                      <h4 className="font-bold text-pink-200">Data Encryption</h4>
                      <ul className="mt-1 text-sm text-gray-100 list-disc pl-4">
                        {Object.entries(analysisData.security_considerations.data_encryption).map(([key, value], i) => (
                          <li key={i}><span className="font-bold">{key}:</span> {value}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {analysisData.security_considerations.security_best_practices && (
                    <div>
                      <h4 className="font-bold text-pink-200">Security Best Practices</h4>
                      <ul className="mt-1 text-sm text-gray-100 list-disc pl-4">
                        {analysisData.security_considerations.security_best_practices.map((practice, i) => (
                          <li key={i}>{practice}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {analysisData.security_considerations.compliance_considerations && (
                    <div>
                      <h4 className="font-bold text-pink-200">Compliance Considerations</h4>
                      <ul className="mt-1 text-sm text-gray-100 list-disc pl-4">
                        {analysisData.security_considerations.compliance_considerations.map((compliance, i) => (
                          <li key={i}>{compliance}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {analysisData.security_considerations.security_testing && (
                    <div>
                      <h4 className="font-bold text-pink-200">Security Testing</h4>
                      <ul className="mt-1 text-sm text-gray-100 list-disc pl-4">
                        {analysisData.security_considerations.security_testing.map((test, i) => (
                          <li key={i}>{test}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {analysisData.third_party_services && (
            <div className="px-6 py-5 border-b border-pink-500/20">
              <h3 className="text-lg font-bold text-pink-600 mb-3">Third-Party Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(analysisData.third_party_services).map(([category, services]: [string, any], index) => (
                  <div key={index} className="border border-pink-500/20 rounded-xl p-4 bg-black/40">
                    <h4 className="font-bold text-pink-600">{category}</h4>
                    <div className="space-y-3 mt-2">
                      {services.map((service: any, i: number) => (
                        <div key={i} className="border-t pt-2">
                          <p className="font-bold text-pink-500">{service.name}</p>
                          <p className="text-sm text-gray-100">{service.description}</p>
                          <div className="flex mt-1 text-xs space-x-2">
                            <span className="font-bold text-pink-200">Pricing: {service.pricing_tier}</span>
                            <span>|</span>
                            <span className="font-bold text-pink-200">Integration: {service.integration_complexity}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {analysisData.development_tools && (
            <div className="px-6 py-5 border-b border-pink-500/20">
              <h3 className="text-lg font-bold text-pink-600 mb-3">Development Tools</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {analysisData.development_tools.map((tool, index) => (
                  <div key={index} className="border border-pink-500/20 rounded-xl p-4 bg-black/40">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-pink-200">{tool.name}</h4>
                      <span className="text-xs font-bold px-2 py-1 rounded bg-gray-700/40 text-gray-200">{tool.category}</span>
                    </div>
                    <p className="text-sm text-gray-100 mt-1">{tool.description}</p>
                    <p className="text-xs text-gray-100 mt-1 font-bold">Pricing: {tool.pricing}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="px-6 py-5 border-b border-pink-500/20">
            <h3 className="text-lg font-bold text-pink-600 mb-3">Implementation Roadmap</h3>
            <div className="space-y-4">
              {analysisData.implementation_roadmap && analysisData.implementation_roadmap.map((phase: any, index: number) => (
                <div key={index} className="border border-pink-500/20 rounded-xl p-4 bg-black/40">
                  <h4 className="font-bold text-pink-600">{phase.name || phase.phase} 
                    {phase.duration && <span className="text-sm text-gray-100"> ({phase.duration} weeks)</span>}
                  </h4>
                  {phase.description && <p className="text-sm text-gray-100 mt-1">{phase.description}</p>}
                  
                  {phase.features && (
                    <div className="mt-3">
                      <h5 className="text-sm font-bold text-pink-200">Features:</h5>
                      <ul className="mt-1 text-sm text-gray-100 list-disc pl-4">
                        {phase.features.map((feature: string, i: number) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {(phase.tasks || phase.technical_deliverables) && (
                    <div className="mt-3">
                      <h5 className="text-sm font-bold text-pink-200">
                        {phase.technical_deliverables ? 'Technical Deliverables:' : 'Tasks:'}
                      </h5>
                      <ul className="mt-1 text-sm text-gray-100 list-disc pl-4">
                        {(phase.tasks || phase.technical_deliverables).map((task: string, i: number) => (
                          <li key={i}>{task}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {analysisData.architecture_diagram && (
            <div className="px-6 py-5">
              <h3 className="text-lg font-bold text-pink-600 mb-3">Architecture Diagram</h3>
              <div className="border border-pink-500/20 rounded-xl p-4 bg-black/40">
                <button 
                  className="mb-4 px-3 py-1 bg-blue-500/20 text-blue-300 rounded hover:bg-blue-600/10 text-sm"
                  onClick={() => setRenderKey(prev => prev + 1)}
                >
                  Refresh Diagram
                </button>
                <div className="mermaid-diagram-container relative">
                  <div ref={mermaidRef} className="mermaid w-full overflow-auto"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
