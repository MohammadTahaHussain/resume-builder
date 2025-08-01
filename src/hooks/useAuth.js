'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const login = async (provider) => {
    try {
      await signIn(provider, { callbackUrl: '/' })
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  const logout = async () => {
    try {
      await signOut({ callbackUrl: '/' })
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const requireAuth = (callback) => {
    if (status === 'loading') {
      return null // Still loading
    }
    
    if (!session) {
      router.push('/auth/signin')
      return null
    }
    
    return callback ? callback(session) : session
  }

  return {
    session,
    status,
    isAuthenticated: !!session,
    isLoading: status === 'loading',
    login,
    logout,
    requireAuth,
  }
} 