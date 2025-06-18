'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import MarketAnalysisDisplay from '../../../components/MarketAnalysisDisplay';
import ProductManagerDisplay from '../../../components/ProductManagerDisplay';
import TechArchitectDisplay from '../../../components/TechArchitectDisplay';
import { getApiErrorMessage } from '../../../utils/apiUtils';
import { fetchMVPDetails } from '../../../utils/mvpUtils';
import { 
  MarketAnalystResponse, 
  ProductManagerResponse, 
  TechArchitectResponse 
} from '../../../utils/agentChain';

interface AgentOutput {
  id: string;
  user_id: string;
  session_id: string;
  market_analyst_response: MarketAnalystResponse;
  product_manager_response: ProductManagerResponse;
  tech_architect_response: TechArchitectResponse;
  created_at: string;
}

export default function DetailComponent({ userId, sessionId }: { userId: string; sessionId: string }) {
  const [output, setOutput] = useState<AgentOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('market');
  const [fullWidth, setFullWidth] = useState(true);useEffect(() => {
    const loadMVPDetails = async () => {
      try {
        setLoading(true);
        console.log(`Loading MVP details for session: ${sessionId}`);
        
        const data = await fetchMVPDetails(sessionId);
        console.log("API response:", data); // Log the response for debugging
        setOutput(data);
      } catch (err) {
        // Use our utility function to get a formatted error message
        setError(getApiErrorMessage(err));
        console.error('Error fetching output:', err);
      } finally {
        setLoading(false);
      }
    };    loadMVPDetails();
  }, [sessionId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <div className="relative">
          <div className="w-16 h-16 border-t-4 border-pink-600 border-solid rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-t-4 border-pink-600/20 border-solid rounded-full blur-sm animate-spin"></div>
        </div>
        <p className="mt-4 text-gray-300">Loading MVP details...</p>
      </div>
    );
  }

  if (error || !output) {
    return (
      <div className="space-y-6">
        <Link href="/dashboard" className="inline-flex items-center text-pink-500 hover:text-pink-400 transition-colors duration-200">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Dashboard
        </Link>
        
        <div className="bg-red-900/30 border border-red-500/50 text-red-200 p-6 rounded-lg backdrop-blur-sm">
          <div className="flex justify-between items-center mb-4">
            <p className="font-medium text-lg">Error loading MVP details</p>
            <button 
              onClick={() => window.location.reload()} 
              className="flex items-center px-3 py-1.5 bg-pink-500/20 text-pink-300 rounded-md hover:bg-pink-500/30 transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </button>
          </div>
          <p className="mb-4">{error || 'No data found for this session'}</p>
          
          {error && error.toLowerCase().includes('backend') && (
            <div className="mt-4 p-4 bg-black/40 border border-pink-500/30 rounded-lg">
              <p className="font-medium text-pink-300 mb-2">Troubleshooting Steps:</p>
              <ol className="list-decimal list-inside space-y-2 text-gray-300">
                <li>Make sure the backend server is running. Open a terminal and run the following commands:</li>
                <div className="bg-gray-900 p-3 rounded mt-1 mb-2 font-mono text-sm">
                  <p>cd backend_fastapi</p>
                  <p>.\start_server.ps1</p>
                </div>
                <li>Or use the helper script from the frontend directory:</li>
                <div className="bg-gray-900 p-3 rounded mt-1 mb-2 font-mono text-sm">
                  <p>.\start-backend.ps1</p>
                </div>
                <li>Verify that the API URL in the frontend .env.local file is set correctly to point to http://localhost:8000</li>
                <li>Try refreshing the page after starting the backend server</li>
              </ol>
            </div>
          )}
        </div>
      </div>
    );
  }
  const { market_analyst_response, product_manager_response, tech_architect_response } = output;
  const startupIdea = market_analyst_response?.startup_idea || 'Unnamed Project';
  return (
    <div className="space-y-6 w-full">
      <Link 
        href="/dashboard" 
        className="inline-flex items-center text-pink-500 hover:text-pink-400 transition-colors duration-200"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Dashboard
      </Link>
      <div className="relative">
        <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-pink-500 to-red-600 text-transparent bg-clip-text mb-8">
          {startupIdea}
        </h1>
        <p className="text-gray-300 mb-6">Created on {formatDate(output.created_at)}</p>
      </div>      {/* Tabs */}
      <div className="border-b border-pink-500/30 mb-4">
        <div className="flex justify-between items-center">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('market')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                activeTab === 'market'
                  ? 'border-pink-500 text-pink-400'
                  : 'border-transparent text-gray-400 hover:text-pink-400 hover:border-pink-400'
              }`}
            >
              Market Analysis
            </button>
            <button
              onClick={() => setActiveTab('product')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                activeTab === 'product'
                  ? 'border-pink-500 text-pink-400'
                  : 'border-transparent text-gray-400 hover:text-pink-400 hover:border-pink-400'
              }`}
            >
              Product Roadmap
            </button>
            <button
              onClick={() => setActiveTab('tech')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                activeTab === 'tech'
                  ? 'border-pink-500 text-pink-400'
                  : 'border-transparent text-gray-400 hover:text-pink-400 hover:border-pink-400'
              }`}
            >
              Technical Blueprint
            </button>
          </nav>
        </div>
      </div>      {/* Tab Content */}
      <div className="pt-4">
        <div className="space-y-8 w-full">
          {activeTab === 'market' && (
            <div className="relative bg-black/70 border border-pink-500/40 rounded-2xl shadow-xl shadow-pink-500/20 p-6 backdrop-blur-lg before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-br before:from-pink-500/10 before:to-red-600/10 before:rounded-2xl before:backdrop-blur-xl before:pointer-events-none">
              <div className="absolute -z-10 top-0 left-1/4 w-1/2 h-1/2 rounded-full bg-pink-600/20 blur-3xl"></div>
              <div className="absolute -z-10 bottom-0 right-1/4 w-1/2 h-1/2 rounded-full bg-red-500/20 blur-3xl"></div>
              <MarketAnalysisDisplay analysisData={market_analyst_response} />
            </div>
          )}
          {activeTab === 'product' && (
            <div className="bg-black/80 border border-pink-500/30 rounded-2xl shadow-xl shadow-pink-500/10 p-6 backdrop-blur-md">
              <ProductManagerDisplay analysisData={product_manager_response} />
            </div>
          )}
          {activeTab === 'tech' && (
            <div className="bg-black/80 border border-pink-500/30 rounded-2xl shadow-xl shadow-pink-500/10 p-6 backdrop-blur-md">
              <TechArchitectDisplay analysisData={tech_architect_response} />
            </div>
          )}
        </div>
      </div>
    </div>  );
}

function ProductManagerTab({ data }: { data: ProductManagerResponse }) {
  if (!data) {
    return <div>No product roadmap data available.</div>;
  }

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Product Roadmap</h2>
        
        <div className="bg-white shadow overflow-hidden rounded-md">
          <div className="px-6 py-5 border-b">
            <h3 className="text-lg font-medium mb-3">User Personas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.user_personas && data.user_personas.map((persona: any, index: number) => (
                <div key={index} className="border rounded-md p-4">
                  <h4 className="font-medium">{persona.name}</h4>
                  <p className="mt-1 text-sm text-gray-600">{persona.description}</p>
                  
                  {persona.pain_points && persona.pain_points.length > 0 && (
                    <div className="mt-2">
                      <h5 className="text-sm font-medium text-gray-700">Pain Points:</h5>
                      <ul className="mt-1 text-sm text-gray-600 list-disc pl-4">
                        {persona.pain_points.map((point: string, i: number) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="px-6 py-5 border-b">
            <h3 className="text-lg font-medium mb-3">MVP Features</h3>
            <ul className="list-disc pl-6 space-y-1">
              {data.mvp_features && data.mvp_features.map((feature: string, index: number) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          
          <div className="px-6 py-5">
            <h3 className="text-lg font-medium mb-3">Features Detail</h3>
            <div className="space-y-4">
              {data.features && data.features.map((feature: any, index: number) => (
                <div key={index} className="border rounded-md p-4">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold">{feature.name}</h4>
                    <div className="flex space-x-2">
                      <span className={`text-sm rounded-full px-3 py-1 ${
                        feature.priority === 'High' 
                          ? 'bg-red-100 text-red-800' 
                          : feature.priority === 'Medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {feature.priority}
                      </span>
                    </div>
                  </div>
                  <p className="mt-1 text-gray-600">{feature.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div>
                      <span className="text-sm font-medium text-gray-700">Effort: </span>
                      <span className="text-sm text-gray-600">{feature.effort}/10</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-700">Impact: </span>
                      <span className="text-sm text-gray-600">{feature.impact}/10</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function TechArchitectTab({ data }: { data: TechArchitectResponse }) {
  if (!data) {
    return <div>No technical blueprint data available.</div>;
  }
  
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Technical Blueprint</h2>
        
        <div className="bg-white shadow overflow-hidden rounded-md">
          <div className="px-6 py-5 border-b">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Technology Stack</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.tech_stack && Object.entries(data.tech_stack).map(([category, technologies]: [string, any], index: number) => (
                <div key={index} className="border rounded-md p-4">
                  <h4 className="font-bold text-gray-900">{category}</h4>
                  <ul className="mt-2 space-y-2">
                    {technologies.map((tech: any, i: number) => (
                      <li key={i} className="text-sm text-gray-900">
                        <span className="font-bold text-gray-900">{tech.name}</span>
                        {tech.version && <span className="text-gray-900"> {tech.version}</span>}
                        <p className="text-gray-900 text-xs mt-1">{tech.justification}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          
          <div className="px-6 py-5 border-b">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Database Schema</h3>
            <div className="space-y-4">
              {data.database_schema && data.database_schema.map((schema: any, index: number) => (
                <div key={index} className="border rounded-md p-4">
                  <h4 className="font-bold text-gray-900">{schema.name} <span className="text-sm text-gray-900">({schema.type})</span></h4>
                  <p className="mt-1 text-sm text-gray-900">{schema.description}</p>
                  
                  <div className="mt-3">
                    <h5 className="text-sm font-bold text-gray-900">Fields:</h5>
                    <ul className="mt-1 text-sm text-gray-900 list-disc pl-4">
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
          
          <div className="px-6 py-5 border-b">
            <h3 className="text-lg font-bold text-gray-900 mb-3">API Endpoints</h3>
            <div className="space-y-4">
              {data.api_endpoints && data.api_endpoints.map((endpoint: any, index: number) => (
                <div key={index} className="border rounded-md p-4">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      endpoint.method === 'GET' 
                        ? 'bg-blue-100 text-blue-800' 
                        : endpoint.method === 'POST'
                        ? 'bg-green-100 text-green-800'
                        : endpoint.method === 'PUT'
                        ? 'bg-yellow-100 text-yellow-800'
                        : endpoint.method === 'DELETE'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      {endpoint.method}
                    </span>
                    <span className="font-mono text-sm text-gray-900">{endpoint.path}</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-900">{endpoint.description}</p>
                  <div className="mt-2 text-sm">
                    <span className="font-bold text-gray-900">Auth Required: </span>
                    <span className={endpoint.auth_required ? 'text-green-600' : 'text-gray-900'}>
                      {endpoint.auth_required ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {data.deployment_strategy && (
            <div className="px-6 py-5 border-b">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Deployment Strategy</h3>
              <div className="border rounded-md p-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-bold text-gray-900">Recommended Approach</h4>
                    <p className="text-sm text-gray-900">{data.deployment_strategy.recommended_approach}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Infrastructure</h4>
                    <p className="text-sm text-gray-900">{data.deployment_strategy.infrastructure}</p>
                  </div>
                  {data.deployment_strategy.ci_cd_pipeline && (
                    <div>
                      <h4 className="font-bold text-gray-900">CI/CD Pipeline</h4>
                      <ul className="mt-1 text-sm text-gray-900 list-disc pl-4">
                        {Object.entries(data.deployment_strategy.ci_cd_pipeline).map(([key, value], i) => (
                          <li key={i}><span className="font-bold">{key}:</span> {value}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-gray-900">Scaling Strategy</h4>
                    <p className="text-sm text-gray-900">{data.deployment_strategy.scaling_strategy}</p>
                  </div>
                  {data.deployment_strategy.estimated_costs && (
                    <div>
                      <h4 className="font-bold text-gray-900">Estimated Costs</h4>
                      <ul className="mt-1 text-sm text-gray-900 list-disc pl-4">
                        {Object.entries(data.deployment_strategy.estimated_costs).map(([key, value], i) => (
                          <li key={i}><span className="font-bold">{key}:</span> {value}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {data.deployment_strategy.monitoring_tools && (
                    <div>
                      <h4 className="font-bold text-gray-900">Monitoring Tools</h4>
                      <ul className="mt-1 text-sm text-gray-900 list-disc pl-4">
                        {data.deployment_strategy.monitoring_tools.map((tool, i) => (
                          <li key={i}>{tool}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-gray-900">Backup Strategy</h4>
                    <p className="text-sm text-gray-900">{data.deployment_strategy.backup_strategy}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {data.security_considerations && (
            <div className="px-6 py-5 border-b">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Security Considerations</h3>
              <div className="border rounded-md p-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-bold text-gray-900">Authentication Method</h4>
                    <p className="text-sm text-gray-900">{data.security_considerations.authentication_method}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Authorization Approach</h4>
                    <p className="text-sm text-gray-900">{data.security_considerations.authorization_approach}</p>
                  </div>
                  {data.security_considerations.data_encryption && (
                    <div>
                      <h4 className="font-bold text-gray-900">Data Encryption</h4>
                      <ul className="mt-1 text-sm text-gray-900 list-disc pl-4">
                        {Object.entries(data.security_considerations.data_encryption).map(([key, value], i) => (
                          <li key={i}><span className="font-bold">{key}:</span> {value}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {data.security_considerations.security_best_practices && (
                    <div>
                      <h4 className="font-bold text-gray-900">Security Best Practices</h4>
                      <ul className="mt-1 text-sm text-gray-900 list-disc pl-4">
                        {data.security_considerations.security_best_practices.map((practice, i) => (
                          <li key={i}>{practice}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {data.security_considerations.compliance_considerations && (
                    <div>
                      <h4 className="font-bold text-gray-900">Compliance Considerations</h4>
                      <ul className="mt-1 text-sm text-gray-900 list-disc pl-4">
                        {data.security_considerations.compliance_considerations.map((compliance, i) => (
                          <li key={i}>{compliance}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {data.security_considerations.security_testing && (
                    <div>
                      <h4 className="font-bold text-gray-900">Security Testing</h4>
                      <ul className="mt-1 text-sm text-gray-900 list-disc pl-4">
                        {data.security_considerations.security_testing.map((test, i) => (
                          <li key={i}>{test}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {data.third_party_services && (
            <div className="px-6 py-5 border-b">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Third-Party Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(data.third_party_services).map(([category, services]: [string, any], index) => (
                  <div key={index} className="border rounded-md p-4">
                    <h4 className="font-bold text-gray-900">{category}</h4>
                    <div className="space-y-3 mt-2">
                      {services.map((service: any, i: number) => (
                        <div key={i} className="border-t pt-2">
                          <p className="font-bold text-gray-900">{service.name}</p>
                          <p className="text-sm text-gray-900">{service.description}</p>
                          <div className="flex mt-1 text-xs space-x-2">
                            <span className="font-bold text-gray-900">Pricing: {service.pricing_tier}</span>
                            <span>|</span>
                            <span className="font-bold text-gray-900">Integration: {service.integration_complexity}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.development_tools && (
            <div className="px-6 py-5 border-b">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Development Tools</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.development_tools.map((tool, index) => (
                  <div key={index} className="border rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-gray-900">{tool.name}</h4>
                      <span className="text-xs font-bold px-2 py-1 rounded bg-gray-100 text-gray-900">{tool.category}</span>
                    </div>
                    <p className="text-sm text-gray-900 mt-1">{tool.description}</p>
                    <p className="text-xs text-gray-900 mt-1 font-bold">Pricing: {tool.pricing}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="px-6 py-5 border-b">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Implementation Roadmap</h3>
            <div className="space-y-4">
              {data.implementation_roadmap && data.implementation_roadmap.map((phase: any, index: number) => (
                <div key={index} className="border rounded-md p-4">
                  <h4 className="font-bold text-gray-900">{phase.name || phase.phase} 
                    {phase.duration && <span className="text-sm text-gray-900"> ({phase.duration} weeks)</span>}
                  </h4>
                  {phase.description && <p className="text-sm text-gray-900 mt-1">{phase.description}</p>}
                  
                  {phase.features && (
                    <div className="mt-3">
                      <h5 className="text-sm font-bold text-gray-900">Features:</h5>
                      <ul className="mt-1 text-sm text-gray-900 list-disc pl-4">
                        {phase.features.map((feature: string, i: number) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {(phase.tasks || phase.technical_deliverables) && (
                    <div className="mt-3">
                      <h5 className="text-sm font-bold text-gray-900">
                        {phase.technical_deliverables ? 'Technical Deliverables:' : 'Tasks:'}
                      </h5>
                      <ul className="mt-1 text-sm text-gray-900 list-disc pl-4">
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
          
          {data.architecture_diagram && (
            <div className="px-6 py-5">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Architecture Diagram</h3>
              <div className="border rounded-md p-4">
                <div className="prose max-w-none">
                  <div className="text-sm text-gray-900 whitespace-pre-line">{data.architecture_diagram}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
