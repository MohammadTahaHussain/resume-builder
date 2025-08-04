// File: app/api/.../route.js

import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth'; // Make sure this path is correct
import aiService from '@/lib/ai';

export const runtime = 'nodejs';

export async function GET(request) {
  try {
    // 1. Get the session using the auth() helper
    const session = await auth();

    // 2. Protect the route: if no session, return 401
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized: No active session found.' }, { status: 401 });
    }

    // Optional: You can log the user ID for your records
    console.log(`AI service accessed by user: ${session.user.id}`);

    // 3. Proceed with your main logic
    const response = await aiService.generate('Hello, this is a test message. Please respond with "AI is working correctly!"');
    
    return NextResponse.json({ response });

  } catch (error) {
    // Log the detailed error on the server
    console.error('Error in AI API route:', error);

    // Return a generic error message to the client
    return NextResponse.json(
      { error: 'An internal server error occurred.' },
      { status: 500 }
    );
  }
}