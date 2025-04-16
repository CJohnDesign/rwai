"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { isVercel, getMainUrl } from '../../../lib/url-utils';

export default function AppDebugPage() {
  const [hostname, setHostname] = useState<string>('');
  const [isClient, setIsClient] = useState<boolean>(false);
  const [isVercelEnv, setIsVercelEnv] = useState<boolean>(false);
  const [mainUrl, setMainUrl] = useState<string>('');
  const [apiStatus, setApiStatus] = useState<{loading: boolean, data: any | null, error: string | null}>({
    loading: false,
    data: null,
    error: null
  });

  // Test the API
  const testApi = async () => {
    setApiStatus({loading: true, data: null, error: null});
    try {
      const response = await fetch('/api/test-subdomain');
      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }
      const data = await response.json();
      setApiStatus({loading: false, data, error: null});
    } catch (error) {
      setApiStatus({
        loading: false, 
        data: null, 
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  useEffect(() => {
    setIsClient(true);
    
    if (typeof window !== 'undefined') {
      setHostname(window.location.host);
      setIsVercelEnv(isVercel());
      setMainUrl(getMainUrl());
      
      // Auto-test the API
      testApi();
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">App Subdomain Debug Page</h1>
      
      {!isClient && (
        <div className="p-4 mb-4 bg-yellow-100 text-yellow-800 rounded">
          Loading client-side data...
        </div>
      )}
      
      <div className="space-y-6">
        <div className="p-4 border rounded bg-gray-50">
          <h2 className="text-lg font-bold mb-2">App Subdomain Environment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div><span className="font-medium">App Hostname:</span> {hostname}</div>
            <div><span className="font-medium">Vercel Environment:</span> {isVercelEnv ? 'Yes' : 'No'}</div>
            <div><span className="font-medium">Node Environment:</span> {process.env.NODE_ENV}</div>
            <div><span className="font-medium">Current URL:</span> {isClient ? window.location.href : 'N/A'}</div>
          </div>
        </div>
        
        <div className="p-4 border rounded bg-gray-50">
          <h2 className="text-lg font-bold mb-2">Navigation Testing</h2>
          <div className="flex flex-col space-y-2">
            <div><span className="font-medium">Main Site URL:</span> {mainUrl}</div>
            <div className="flex space-x-2">
              <a 
                href={mainUrl}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Visit Main Site
              </a>
              <Link 
                href="/models"
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Models Page
              </Link>
            </div>
          </div>
        </div>
        
        <div className="p-4 border rounded bg-gray-50">
          <h2 className="text-lg font-bold mb-2">API Test</h2>
          {apiStatus.loading ? (
            <div>Loading API data...</div>
          ) : apiStatus.error ? (
            <div className="text-red-500">Error: {apiStatus.error}</div>
          ) : apiStatus.data ? (
            <div>
              <div className="mb-2 text-green-600">API responded successfully!</div>
              <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
                {JSON.stringify(apiStatus.data, null, 2)}
              </pre>
            </div>
          ) : null}
          
          <button 
            onClick={testApi}
            className="mt-2 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Test API Again
          </button>
        </div>
      </div>
    </div>
  );
} 