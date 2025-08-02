import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import aiService from '@/lib/ai';

export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const session = await auth();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { resumeData } = body;

    if (!resumeData) {
      return NextResponse.json({ error: 'Resume data is required' }, { status: 400 });
    }

    const analysis = await aiService.analyzeResume(resumeData);
    
    return NextResponse.json({ analysis });
  } catch (error) {
    console.error('Error analyzing resume:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to analyze resume' },
      { status: 500 }
    );
  }
} 