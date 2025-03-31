import React from 'react';

interface TestResultProps {
  name: string;
  status: 'success' | 'warning' | 'error';
  message?: string;
}

export function TestResult({ name, status, message }: TestResultProps) {
  return (
    <div className="border-l-4 p-4 mb-4 flex items-start" 
      style={{ 
        borderColor: status === 'success' ? '#10b981' : status === 'warning' ? '#f59e0b' : '#ef4444',
        backgroundColor: status === 'success' ? 'rgba(16, 185, 129, 0.1)' : status === 'warning' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(239, 68, 68, 0.1)'
      }}
    >
      <div className="mr-3 mt-0.5">
        {status === 'success' ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        ) : status === 'warning' ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        )}
      </div>
      <div>
        <h3 className="font-medium" style={{ 
          color: status === 'success' ? '#10b981' : status === 'warning' ? '#f59e0b' : '#ef4444'
        }}>
          {name}
        </h3>
        {message && <p className="mt-1 text-sm text-taupe-elegant">{message}</p>}
      </div>
    </div>
  );
}
