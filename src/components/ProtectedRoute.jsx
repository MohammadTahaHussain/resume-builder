'use client'

import { useAuth } from '@/hooks/useAuth'
import { useEffect } from 'react'

export default function ProtectedRoute({ children, fallback = null }) {
  const { session, status, isAuthenticated } = useAuth()

  useEffect(() => {
    if (status === 'loading') return
    
    if (!isAuthenticated) {
      window.location.href = '/auth/signin'
    }
  }, [isAuthenticated, status])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Redirecting to sign in...</p>
        </div>
      </div>
    )
  }

  return children
} 