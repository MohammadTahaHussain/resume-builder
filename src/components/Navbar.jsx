'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { navigationItems } from '../constants/app';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { data: session, status } = useSession();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  // Filter navigation items based on authentication status
  const filteredNavigationItems = navigationItems.filter(item => {
    if (item.requiresAuth) {
      return status === 'authenticated';
    }
    return true;
  });

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 shadow-lg border-b border-blue-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-white font-bold text-xl">ResumeAI</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {filteredNavigationItems.map((item) => (
              <Link 
                key={item.name}
                href={item.href} 
                className="text-white hover:text-blue-200 transition-colors duration-200 font-medium"
                title={item.description}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth & CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {status === 'loading' ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            ) : session ? (
              <div className="relative">
                <button
                  onClick={toggleProfile}
                  className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors duration-200"
                >
                  {session.user?.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name}
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  <span className="font-medium">{session.user?.name}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-fit px-2 bg-card rounded-md shadow-lg py-1 z-50 border border-border">
                    <div className="px-4 py-2 text-sm text-card-foreground border-b border-border">
                      <p className="font-medium">{session.user?.name}</p>
                      <p className="text-muted-foreground">{session.user?.email}</p>
                    </div>
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-card-foreground hover:bg-accent hover:text-accent-foreground"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/editor"
                      className="block px-4 py-2 text-sm text-card-foreground hover:bg-accent hover:text-accent-foreground"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Create Resume
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-card-foreground hover:bg-accent hover:text-accent-foreground"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link 
                  href="/auth/signin" 
                  className="text-white hover:text-blue-200 transition-colors duration-200 font-medium"
                >
                  Sign In
                </Link>
                <Link 
                  href="/editor" 
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-2 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Start Building
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="text-white hover:text-blue-200 focus:outline-none focus:text-blue-200"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-blue-700/50 rounded-lg mt-2">
              {filteredNavigationItems.map((item) => (
                <Link 
                  key={item.name}
                  href={item.href} 
                  className="text-white hover:text-blue-200 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {status === 'loading' ? (
                <div className="flex justify-center py-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                </div>
              ) : session ? (
                <div className="border-t border-blue-600 pt-2">
                  <div className="px-3 py-2 text-white">
                    <p className="font-medium">{session.user?.name}</p>
                    <p className="text-blue-200 text-sm">{session.user?.email}</p>
                  </div>
                  <Link 
                    href="/dashboard" 
                    className="text-white hover:text-blue-200 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    href="/editor" 
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-2 rounded-full font-semibold transition-all duration-200 block text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Create Resume
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-white hover:text-blue-200 block rounded-md text-base font-medium transition-colors duration-200"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="pt-2">
                  <Link 
                    href="/auth/signin" 
                    className="text-white hover:text-blue-200 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link 
                    href="/editor" 
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-2 rounded-full font-semibold transition-all duration-200 block text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Start Building
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 