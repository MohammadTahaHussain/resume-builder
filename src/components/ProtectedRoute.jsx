'use client'

import { useAuth } from '@/hooks/useAuth'
import { useEffect, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { usePathname, useSearchParams} from 'next/navigation'

function ProtectedRouteContent({ children, fallback = null }) {
  const { session, status, isAuthenticated } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const params = useSearchParams()

  useEffect(() => {
    // Only redirect if we're sure the user is not authenticated
    if (status === 'unauthenticated') {
      // Store the current pathname in localStorage before redirecting
      const currentPath = pathname + (params.toString() ? `?${params.toString()}` : '')
      localStorage.setItem('redirectAfterSignin', currentPath)
      router.push('/auth/signin')
    }
  }, [status, router, pathname, params])

  // Show loading while checking authentication
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

  // Show fallback or loading while not authenticated
  if (!isAuthenticated) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // User is authenticated, show the protected content
  return children
}

function ProtectedRouteSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading authentication...</p>
      </div>
    </div>
  )
}

export default function ProtectedRoute({ children, fallback = null }) {
  return (
    <Suspense fallback={<ProtectedRouteSkeleton />}>
      <ProtectedRouteContent children={children} fallback={fallback} />
    </Suspense>
  )
} 