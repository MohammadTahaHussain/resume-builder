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
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-muted-foreground">Redirecting to templates...</p>
      </div>
    </div>
  );
}
