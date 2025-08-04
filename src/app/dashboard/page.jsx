'use client'

import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useState, useEffect, Suspense } from 'react'

function DashboardContent() {
  const { session, logout } = useAuth()
  const [resumes, setResumes] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalResumes: 0,
    totalDownloads: 0,
    templatesUsed: 0
  })

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await fetch('/api/resumes')
        if (response.ok) {
          const data = await response.json()
          setResumes(data)
          
          // Calculate stats
          const totalDownloads = data.reduce((sum, resume) => sum + (resume.downloads || 0), 0)
          const uniqueTemplates = new Set(data.map(resume => resume.template)).size
          
          setStats({
            totalResumes: data.length,
            totalDownloads,
            templatesUsed: uniqueTemplates
          })
        }
      } catch (error) {
        console.error('Error fetching resumes:', error)
      } finally {
        setLoading(false)
      }
    }

    if (session) {
      fetchResumes()
    }
  }, [session])

  const handleDeleteResume = async (resumeId) => {
    if (!confirm('Are you sure you want to delete this resume?')) return
    
    try {
      const response = await fetch(`/api/resumes/${resumeId}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        setResumes(resumes.filter(resume => resume._id !== resumeId))
        setStats(prev => ({ ...prev, totalResumes: prev.totalResumes - 1 }))
      }
    } catch (error) {
      console.error('Error deleting resume:', error)
    }
  }

  return (
    <div className="min-h-screen bg-background">
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
          <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
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
                <h2 className="text-xl font-bold text-card-foreground">{session?.user?.name}</h2>
                <p className="text-muted-foreground">{session?.user?.email}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Sign Out
            </button>
          </div>

          {/* Stats Cards */}
          <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Your Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Resumes</span>
                <span className="font-semibold text-card-foreground">{stats.totalResumes}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Downloads</span>
                <span className="font-semibold text-card-foreground">{stats.totalDownloads}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Templates Used</span>
                <span className="font-semibold text-card-foreground">{stats.templatesUsed}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
            <h3 className="text-lg font-semibold text-card-foreground mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                href="/editor"
                className="block w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
              >
                Create New Resume
              </Link>
              <Link
                href="/templates"
                className="block w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-center"
              >
                Browse Templates
              </Link>
              <Link
                href="/sample-data"
                className="block w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-center"
              >
                Sample Data
              </Link>
            </div>
          </div>
        </div>

        {/* Resumes List */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-card-foreground">Your Resumes</h2>
            <Link
              href="/editor"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create New
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card rounded-lg shadow-lg p-6 border border-border animate-pulse">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : resumes.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2">No resumes yet</h3>
              <p className="text-muted-foreground mb-4">Create your first resume to get started</p>
              <Link
                href="/editor"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Your First Resume
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resumes.map((resume) => (
                <div key={resume._id} className="bg-card rounded-lg shadow-lg p-6 border border-border hover:shadow-xl transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-card-foreground">{resume.title}</h3>
                      <p className="text-sm text-muted-foreground capitalize">{resume.template} Template</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleDeleteResume(resume._id)}
                        className="p-1 text-red-500 hover:text-red-700 transition-colors"
                        title="Delete resume"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                    <span>Created: {new Date(resume.createdAt).toLocaleDateString()}</span>
                    <span>{resume.downloads || 0} downloads</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link
                      href={`/editor?id=${resume._id}`}
                      className="flex-1 px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors text-center"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/preview?id=${resume._id}`}
                      className="flex-1 px-3 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors text-center"
                    >
                      Preview
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 bg-blue-500 rounded mb-2 animate-pulse"></div>
          <div className="h-4 bg-blue-400 rounded w-1/3 animate-pulse"></div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card rounded-lg shadow-lg p-6 border border-border animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent />
      </Suspense>
    </ProtectedRoute>
  )
} 