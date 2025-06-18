'use client';

import { getApiErrorMessage } from './apiUtils';

/**
 * Fetch MVP details for a specific session
 * @param sessionId The session ID to fetch details for
 * @returns Promise with the MVP data
 */
export async function fetchMVPDetails(sessionId: string) {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error('API URL is not defined. Make sure the NEXT_PUBLIC_API_URL environment variable is set.');
  }
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/outputs/session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ session_id: sessionId }),
      signal: AbortSignal.timeout(10000) // 10 seconds timeout
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching MVP details:', error);
    throw new Error(getApiErrorMessage(error));
  }
}
