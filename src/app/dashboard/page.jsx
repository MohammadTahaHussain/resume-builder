'use client'

import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useState, useEffect } from 'react'

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
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Sign Out
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
            <h3 className="text-lg font-bold text-card-foreground mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                href="/editor"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 text-center"
              >
                Create New Resume
              </Link>
              <Link
                href="/editor?template=modern"
                className="block w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 text-center"
              >
                Modern Template
              </Link>
              <Link
                href="/editor?template=classic"
                className="block w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 text-center"
              >
                Classic Template
              </Link>
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-card rounded-lg shadow-lg p-6 border border-border">
            <h3 className="text-lg font-bold text-card-foreground mb-4">Your Activity</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Resumes Created</span>
                <span className="text-2xl font-bold text-blue-600">{stats.totalResumes}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Templates Used</span>
                <span className="text-2xl font-bold text-green-600">{stats.templatesUsed}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">PDF Downloads</span>
                <span className="text-2xl font-bold text-purple-600">{stats.totalDownloads}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Resumes */}
        <div className="mt-8 bg-card rounded-lg shadow-lg p-6 border border-border">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-card-foreground">Your Resumes</h3>
            <Link
              href="/editor"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Create New
            </Link>
          </div>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-muted-foreground">Loading resumes...</p>
            </div>
          ) : resumes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {resumes.map((resume) => (
                <div key={resume._id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow bg-card">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-card-foreground">{resume.title}</h4>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {resume.template}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Last modified: {new Date(resume.updatedAt).toLocaleDateString()}
                  </p>
                  <div className="flex space-x-2">
                    <Link
                      href={`/editor?id=${resume._id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteResume(resume._id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <svg className="w-12 h-12 text-muted-foreground mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-muted-foreground">No resumes yet</p>
              <p className="text-sm text-muted-foreground">Start by creating your first resume!</p>
            </div>
          )}
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