'use client';

/**
 * Utility function to check if the backend API is running
 * @returns Promise<boolean> True if the API is running, false otherwise
 */
export async function isBackendRunning(): Promise<boolean> {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    console.error('NEXT_PUBLIC_API_URL environment variable is not defined');
    return false;
  }
  
  try {
    // Try to connect to the root endpoint of the API or a health check endpoint
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/health`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000) // 5 second timeout
    });
    
    return response.ok;
  } catch (error) {
    console.error('Backend API check failed:', error);
    return false;
  }
}

/**
 * Get a formatted API error message with troubleshooting instructions
 * @param error The error object or message
 * @returns Formatted error message with troubleshooting steps
 */
export function getApiErrorMessage(error: unknown): string {
  let message = 'An unknown error occurred';
  
  if (error instanceof TypeError && error.message.includes('fetch')) {
    message = 'Failed to connect to the backend API. Please make sure the backend server is running on https://startup-mvp-builder.onrender.com.';
  } else if (error instanceof DOMException && error.name === 'AbortError') {
    message = 'API request timed out. Please check if the backend server is running.';
  } else if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === 'string') {
    message = error;
  }
  
  return message;
}
