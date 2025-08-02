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
    const { achievements } = body;

    if (!achievements || !Array.isArray(achievements)) {
      return NextResponse.json({ error: 'Achievements array is required' }, { status: 400 });
    }

    const enhancedAchievements = await aiService.enhanceAchievements(achievements);
    
    return NextResponse.json({ enhancedAchievements });
  } catch (error) {
    console.error('Error enhancing achievements:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to enhance achievements' },
      { status: 500 }
    );
  }
} 