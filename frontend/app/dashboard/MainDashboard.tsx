'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Sparkles, Rocket, ChevronRight, RefreshCw } from 'lucide-react';
import { getApiErrorMessage } from '../utils/apiUtils';

interface AgentOutput {
  id: string;
  user_id: string;
  session_id: string;
  market_analyst_response: any;
  product_manager_response: any;
  tech_architect_response: any;
  created_at: string;
}

export default function MainDashboard({ userId }: { userId: string }) {
  const [outputs, setOutputs] = useState<AgentOutput[]>([]);
  const [filteredOutputs, setFilteredOutputs] = useState<AgentOutput[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchOutputs = async () => {
      try {
        setLoading(true);
        
        // Display the API URL that's being used (for debugging)
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'API URL not defined';
        console.log(`Attempting to connect to API at: ${apiUrl}`);
        
        if (!process.env.NEXT_PUBLIC_API_URL) {
          throw new Error('API URL is not defined. Make sure the NEXT_PUBLIC_API_URL environment variable is set.');
        }
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/outputs/user/${userId}`, {
          // Adding a timeout to avoid long waiting periods
          signal: AbortSignal.timeout(10000) // 10 seconds timeout
        });
        
        if (!response.ok) {
          throw new Error(`API error: ${response.statusText}`);
        }
        
        const data = await response.json();
        const outputsData = data.outputs || [];
        setOutputs(outputsData);
        setFilteredOutputs(outputsData);
      } catch (err) {
        // Use our utility function to get a formatted error message
        setError(getApiErrorMessage(err));
        console.error('Error fetching outputs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOutputs();
  }, [userId]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredOutputs(outputs);
    } else {
      const filtered = outputs.filter(output => 
        (output.market_analyst_response?.startup_idea || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOutputs(filtered);
    }
  }, [searchTerm, outputs]);

  const viewDetails = (sessionId: string) => {
    console.log(`Navigating to details for session: ${sessionId}`);
    try {
      // Use both methods for better reliability
      window.location.href = `/dashboard/history/${sessionId}`;
      router.push(`/dashboard/history/${sessionId}`);
    } catch (error) {
      console.error("Navigation error:", error);
      // Fallback to direct navigation if router fails
      window.location.href = `/dashboard/history/${sessionId}`;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const truncateDescription = (text: string, length = 120) => {
    if (!text) return 'No description available';
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  const getMarketScore = (output: AgentOutput) => {
    return output.market_analyst_response?.opportunity_score || 'N/A';
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-7xl">
      <header className="mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-red-600 inline-block text-transparent bg-clip-text mb-2">
          Startup MVP Builder
        </h1>
        <p className="text-gray-300 text-xl">Your startup projects dashboard</p>
      </header>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        {/* Search */}
        <div className="relative w-full md:w-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-pink-500" />
          </div>
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full md:w-80 bg-gray-900/60 border border-pink-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500/50 text-white backdrop-blur-sm"
          />
        </div>

        {/* New MVP Button */}
        <Link 
          href="/dashboard/new" 
          className="group w-full md:w-auto inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-pink-600 to-red-600 rounded-lg text-white font-medium shadow-lg shadow-pink-600/30 hover:shadow-xl hover:shadow-pink-600/40 transition-all duration-300 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 transform origin-left skew-x-[-20deg] translate-x-full group-hover:translate-x-[-110%] transition-transform duration-500"></div>
          <Rocket className="w-5 h-5 mr-2" />
          <span className="relative z-10">Build New MVP</span>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-24">
          <div className="relative">
            <div className="w-16 h-16 border-t-4 border-pink-600 border-solid rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-t-4 border-pink-600/20 border-solid rounded-full blur-sm animate-spin"></div>
          </div>
        </div>
      ) : error ? (
        <div className="bg-red-900/30 border border-red-500/50 text-red-200 p-6 rounded-lg backdrop-blur-sm">
          <div className="flex justify-between items-center mb-4">
            <p className="font-medium text-lg">Error loading your projects</p>
            <button 
              onClick={() => window.location.reload()} 
              className="flex items-center px-3 py-1.5 bg-pink-500/20 text-pink-300 rounded-md hover:bg-pink-500/30 transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </button>
          </div>
          <p className="mb-4">{error}</p>
          
          {error.toLowerCase().includes('backend') && (
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
                <li>Make sure all required environment variables are set correctly in both frontend and backend</li>
                <li>Try refreshing the page after starting the backend server</li>
              </ol>
            </div>
          )}
        </div>
      ) : filteredOutputs.length === 0 ? (
        <div className="text-center py-24 border border-pink-500/30 rounded-xl bg-black/50 backdrop-blur-md">
          <div className="inline-flex rounded-full p-4 bg-pink-500/10 mb-4">
            <Sparkles className="w-8 h-8 text-pink-500" />
          </div>
          <h3 className="text-2xl font-medium mb-2 text-white">No MVPs Yet</h3>
          <p className="text-gray-400 mb-6">You haven't created any MVP projects yet. Let's build your first one!</p>
          <Link 
            href="/dashboard/new" 
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-pink-600 to-red-600 rounded-lg text-white font-medium shadow-lg shadow-pink-600/30 hover:shadow-xl hover:shadow-pink-600/40 transition-all duration-300"
          >
            <Rocket className="w-5 h-5 mr-2" />
            <span>Build My First MVP</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOutputs.map((output) => (
            <div 
              key={output.session_id} 
              className="group relative overflow-hidden rounded-xl border border-pink-500/30 p-6 backdrop-blur-md transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20 cursor-pointer"
              onClick={() => viewDetails(output.session_id)}
              style={{
                background: 'radial-gradient(circle at bottom right, rgba(236,72,153,0.05), rgba(0,0,0,0.6) 70%)'
              }}
            >
              {/* Glass morphism & 3D effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 transform group-hover:translate-y-[-2px] transition-transform duration-300"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs text-gray-400">{formatDate(output.created_at)}</span>
                  <div className="flex items-center px-2.5 py-0.5 rounded-full bg-gradient-to-r from-pink-500/20 to-red-500/20 border border-pink-500/30">
                    <span className="text-xs font-medium text-pink-300">{getMarketScore(output)}/10</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2 group-hover:text-pink-300 transition-colors duration-300">
                  {output.market_analyst_response?.startup_idea || 'Unnamed Project'}
                </h3>
                
                <p className="text-gray-400 text-sm line-clamp-3 mb-5">
                  {truncateDescription(output.market_analyst_response?.description || 'No description available')}
                </p>
                
                <div className="flex justify-end">
                  <Link 
                    href={`/dashboard/history/${output.session_id}`}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the card onClick from firing
                      viewDetails(output.session_id);
                    }}
                    className="inline-flex items-center text-sm font-medium text-pink-500 group-hover:text-pink-400 transition-colors duration-300"
                  >
                    View Details <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
