'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface AgentOutput {
  id: string;
  user_id: string;
  session_id: string;
  market_analyst_response: any;
  product_manager_response: any;
  tech_architect_response: any;
  created_at: string;
}

export default function HistoryComponent({ userId }: { userId: string }) {
  const [outputs, setOutputs] = useState<AgentOutput[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchOutputs = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/outputs/user/${userId}`);
        
        if (!response.ok) {
          throw new Error(`API error: ${response.statusText}`);
        }
        
        const data = await response.json();
        setOutputs(data.outputs || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching outputs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOutputs();
  }, [userId]);

  const viewDetails = (sessionId: string) => {
    router.push(`/dashboard/history/${sessionId}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Your Previous MVPs</h2>
        <Link href="/dashboard" className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
          Create New MVP
        </Link>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
          {error}
        </div>
      ) : outputs.length === 0 ? (
        <div className="text-center py-12 border rounded-md">
          <h3 className="text-lg font-medium mb-2">No MVPs Yet</h3>
          <p className="text-gray-500">You haven't created any MVPs yet. Go back to the dashboard to create your first one.</p>
        </div>
      ) : (
        <div className="border rounded-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Startup Idea</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market Score</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {outputs.map((output) => (
                <tr key={output.session_id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(output.created_at)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {output.market_analyst_response?.startup_idea || 'Unnamed Project'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {output.market_analyst_response?.opportunity_score || 'N/A'}/10
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    <button
                      onClick={() => viewDetails(output.session_id)}
                      className="text-indigo-600 hover:text-indigo-900 font-medium"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
