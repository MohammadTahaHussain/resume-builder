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
    const { jobTitle, currentSkills = [] } = body;

    if (!jobTitle) {
      return NextResponse.json({ error: 'Job title is required' }, { status: 400 });
    }

    const suggestedSkills = await aiService.suggestSkills(jobTitle, currentSkills);
    
    return NextResponse.json({ suggestedSkills });
  } catch (error) {
    console.error('Error suggesting skills:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to suggest skills' },
      { status: 500 }
    );
  }
} 