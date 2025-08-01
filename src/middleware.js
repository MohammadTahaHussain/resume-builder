import { auth } from "@/lib/auth"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const { nextUrl } = req

  // Only protect routes if we have proper auth configuration
  if (process.env.NEXTAUTH_SECRET && process.env.NEXTAUTH_URL) {
    // Protect the builder route
    if (nextUrl.pathname.startsWith('/builder') && !isLoggedIn) {
      return Response.redirect(new URL('/auth/signin', nextUrl))
    }

    // Protect the dashboard route
    if (nextUrl.pathname.startsWith('/dashboard') && !isLoggedIn) {
      return Response.redirect(new URL('/auth/signin', nextUrl))
    }
  }

  // Allow access to auth pages
  if (nextUrl.pathname.startsWith('/auth')) {
    return null
  }

  return null
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
} 