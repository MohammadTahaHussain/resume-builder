import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import Resume from '@/models/Resume'

export const runtime = 'nodejs'

export async function GET(request, { params }) {
  try {
    const session = await auth();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user?.id || session.user?._id
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID not found in session' }, { status: 400 });
    }

    const { id } = await params

    await connectDB();
    
    const resume = await Resume.findOne({ 
      _id: id, 
      userId 
    })

    console.log('resume=>',resume);
    
    if (!resume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }

    // Migrate old skills format to new format if needed
    if (resume.data.skills && Array.isArray(resume.data.skills) && resume.data.skills.length > 0) {
      const firstSkill = resume.data.skills[0];
      if (typeof firstSkill === 'object' && firstSkill.skills) {
        // Convert old nested format to new simple array format
        const migratedSkills = resume.data.skills.flatMap(skillGroup => skillGroup.skills || []);
        resume.data.skills = migratedSkills;
        
        // Save the migrated data
        await Resume.findByIdAndUpdate(id, { 
          'data.skills': migratedSkills 
        });
      }
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
      personal: {
        name: body.data?.personal?.name || '',
        title: body.data?.personal?.title || '',
        email: body.data?.personal?.email || '',
        phone: body.data?.personal?.phone || '',
        location: body.data?.personal?.location || '',
        summary: body.data?.personal?.summary || '',
        linkedin: body.data?.personal?.linkedin || '',
        website: body.data?.personal?.website || '',
      },
      experience: body.data?.experience || [],
      education: body.data?.education || [],
      skills: body.data?.skills || [],
      projects: body.data?.projects || [],
      certifications: body.data?.certifications || [],
      awards: body.data?.awards || [],
      achievements: (body.data?.achievements || []).map(achievement => {
        // If achievement is a string, convert to object format
        if (typeof achievement === 'string') {
          return { title: achievement, description: '' };
        }
        // If it's already an object, return as is
        return achievement;
      }),
      publications: body.data?.publications || [],
      memberships: body.data?.memberships || [],
      clearance: body.data?.clearance || [],
      references: body.data?.references || [],
      teaching: body.data?.teaching || [],
      additional: body.data?.additional || [],
      languages: (body.data?.languages || []).map(language => {
        // If language is a string, convert to object format
        if (typeof language === 'string') {
          return { language: language, proficiency: 'Fluent' };
        }
        // If it's already an object, return as is
        return language;
      }),
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