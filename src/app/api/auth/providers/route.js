import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET() {
  const providers = {}
  
  // Check if Google provider is configured
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    providers.google = {
      id: 'google',
      name: 'Google',
      type: 'oauth',
      signinUrl: '/api/auth/signin/google',
      callbackUrl: '/api/auth/callback/google',
    }
  }
  
  // Check if GitHub provider is configured
  // if (process.env.GITHUB_ID && process.env.GITHUB_SECRET) {
  //   providers.github = {
  //     id: 'github',
  //     name: 'GitHub',
  //     type: 'oauth',
  //     signinUrl: '/api/auth/signin/github',
  //     callbackUrl: '/api/auth/callback/github'
  //   }
  // }
  
  return NextResponse.json(providers)
} 