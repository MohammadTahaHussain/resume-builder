"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function BuilderPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to templates page to start the new flow
    router.push('/templates');
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to templates...</p>
      </div>
    </div>
  );
}
