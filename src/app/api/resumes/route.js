import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import Resume from '@/models/Resume'

export const runtime = 'nodejs'

export async function GET(request) {
  try {
    const session = await auth()
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user?.id || session.user?._id
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID not found in session' }, { status: 400 })
    }

    await connectDB()
    
    const resumes = await Resume.find({ userId })
      .sort({ updatedAt: -1 })
      .select('-data')
    
    return NextResponse.json(resumes)
  } catch (error) {
    console.error('Error fetching resumes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch resumes' },
      { status: 500 }
    )
  }
}

export async function POST(request) {
  try {
    const session = await auth()
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check for user ID in both id and _id fields
    const userId = session.user?.id || session.user?._id
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID not found in session' }, { status: 400 })
    }

    const body = await request.json()
    const { title, template, data } = body

    await connectDB()
    
    // Transform the data to match our schema
    const transformedData = {
      personal: data.personal || {},
      experience: data.experience || [],
      education: data.education || [],
      skills: transformSkills(data.skills),
      projects: data.projects || [],
      certifications: data.certifications || [],
      languages: data.languages || [],
      interests: data.interests || []
    }
    
    const resume = new Resume({
      userId: userId,
      title: title || 'My Resume',
      template: template || 'modern',
      data: transformedData,
    })
    
    await resume.save()
    
    return NextResponse.json(resume, { status: 201 })
  } catch (error) {
    console.error('Error creating resume:', error)
    return NextResponse.json(
      { error: 'Failed to create resume' },
      { status: 500 }
    )
  }
}

// Helper function to transform skills data
function transformSkills(skills) {
  if (!skills) return []
  
  // If skills is already in the correct format (array of objects)
  if (Array.isArray(skills) && skills.length > 0 && typeof skills[0] === 'object') {
    return skills
  }
  
  // If skills is a simple array of strings, convert to our schema format
  if (Array.isArray(skills) && skills.length > 0 && typeof skills[0] === 'string') {
    return [{
      category: 'Technical Skills',
      skills: skills
    }]
  }
  
  return []
} 