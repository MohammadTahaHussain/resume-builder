'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'

export default function ProtectedLink({ 
  href, 
  children, 
  className = '', 
  onClick = null,
  ...props 
}) {
  const { getProtectedHref, handleProtectedNavigation } = useAuth()

  const handleClick = () => {
    // Store the target path if user is unauthenticated
    handleProtectedNavigation(href)
    
    // Call custom onClick if provided
    if (onClick) {
      onClick()
    }
  }

  return (
    <Link 
      href={getProtectedHref(href)}
      onClick={handleClick}
      className={className}
      {...props}
    >
      {children}
    </Link>
  )
} 