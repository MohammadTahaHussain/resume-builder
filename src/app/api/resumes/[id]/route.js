import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import Resume from '@/models/Resume'

export const runtime = 'nodejs'

export async function GET(request, { params }) {
  try {
    const session = await auth()
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user?.id || session.user?._id
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID not found in session' }, { status: 400 })
    }

    const { id } = params

    await connectDB()
    
    const resume = await Resume.findOne({ 
      _id: id, 
      userId 
    })
    
    if (!resume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 })
    }
    
    return NextResponse.json(resume)
  } catch (error) {
    console.error('Error fetching resume:', error)
    return NextResponse.json(
      { error: 'Failed to fetch resume' },
      { status: 500 }
    )
  }
}

export async function PUT(request, { params }) {
  try {
    const session = await auth()
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user?.id || session.user?._id
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID not found in session' }, { status: 400 })
    }

    const { id } = params
    const body = await request.json()

    await connectDB()
    
    // Transform the data to match our schema
    const transformedData = {
      personal: body.data?.personal || {},
      experience: body.data?.experience || [],
      education: body.data?.education || [],
      skills: transformSkills(body.data?.skills),
      projects: body.data?.projects || [],
      certifications: body.data?.certifications || [],
      languages: body.data?.languages || [],
      interests: body.data?.interests || []
    }
    
    const resume = await Resume.findOneAndUpdate(
      { _id: id, userId },
      { 
        ...body,
        data: transformedData,
        lastModified: new Date(),
        updatedAt: new Date()
      },
      { new: true }
    )
    
    if (!resume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 })
    }
    
    return NextResponse.json(resume)
  } catch (error) {
    console.error('Error updating resume:', error)
    return NextResponse.json(
      { error: 'Failed to update resume' },
      { status: 500 }
    )
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await auth()
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user?.id || session.user?._id
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID not found in session' }, { status: 400 })
    }

    const { id } = params

    await connectDB()
    
    const resume = await Resume.findOneAndDelete({ 
      _id: id, 
      userId 
    })
    
    if (!resume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 })
    }
    
    return NextResponse.json({ message: 'Resume deleted successfully' })
  } catch (error) {
    console.error('Error deleting resume:', error)
    return NextResponse.json(
      { error: 'Failed to delete resume' },
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