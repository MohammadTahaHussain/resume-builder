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

  // Simple function to get protected href
  const getProtectedHref = (targetPath) => {
    if (status === 'loading') return '#'
    return status === 'authenticated' ? targetPath : '/auth/signin'
  }

  // Function to handle protected navigation with redirect storage
  const handleProtectedNavigation = (targetPath) => {
    if (status === 'unauthenticated') {
      localStorage.setItem('redirectAfterSignin', targetPath)
    }
  }

  return {
    session,
    status,
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
    login,
    logout,
    getProtectedHref,
    handleProtectedNavigation,
  }
} 