'use client'

import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'
import ProtectedRoute from '@/components/ProtectedRoute'

function DashboardContent() {
  const { session, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-blue-100">
            Welcome back, {session?.user?.name || 'User'}!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User Profile Card */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center space-x-4 mb-4">
              {session?.user?.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name}
                  className="w-16 h-16 rounded-full border-4 border-blue-100"
                />
              ) : (
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              <div>
                <h2 className="text-xl font-bold text-gray-900">{session?.user?.name}</h2>
                <p className="text-gray-600">{session?.user?.email}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Sign Out
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                href="/builder"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 text-center"
              >
                Create New Resume
              </Link>
              <Link
                href="/builder?template=modern"
                className="block w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 text-center"
              >
                Modern Template
              </Link>
              <Link
                href="/builder?template=classic"
                className="block w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 text-center"
              >
                Classic Template
              </Link>
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Your Activity</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Resumes Created</span>
                <span className="text-2xl font-bold text-blue-600">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Templates Used</span>
                <span className="text-2xl font-bold text-green-600">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">PDF Downloads</span>
                <span className="text-2xl font-bold text-purple-600">0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
          <div className="text-center py-8">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-500">No recent activity</p>
            <p className="text-sm text-gray-400">Start by creating your first resume!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
} 