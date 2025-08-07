import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import Resume from '@/models/Resume'

export const runtime = 'nodejs'

export async function GET(request) {
  try {
    const session = await auth()
    console.log('session getting resumes=>',session);
    
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
    console.log('body=>',body);
    const { title, template, data } = body

    await connectDB()
    
    // Transform the data to match our schema
    const transformedData = {
      personal: {
        ...data.personal
      },
      experience: data.experience || [],
      education: data.education || [],
      skills: data.skills || [],
      projects: data.projects || [],
      certifications: data.certifications || [],
      awards: data.awards || [],
      achievements: (data.achievements || []).map(achievement => {
        // If achievement is a string, convert to object format
        if (typeof achievement === 'string') {
          return { title: achievement, description: '' };
        }
        // If it's already an object, return as is
        return achievement;
      }),
      publications: data.publications || [],
      memberships: data.memberships || [],
      clearance: data.clearance || [],
      references: data.references || [],
      teaching: data.teaching || [],
      additional: data.additional || [],
      languages: (data.languages || []).map(language => {
        // If language is a string, convert to object format
        if (typeof language === 'string') {
          return { language: language, proficiency: 'Fluent' };
        }
        // If it's already an object, return as is
        return language;
      }),
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