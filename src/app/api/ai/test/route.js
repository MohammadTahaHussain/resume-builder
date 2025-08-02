import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export const runtime = 'nodejs';

export async function GET(request) {
  try {
    const session = await auth();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ 
        error: 'API key not configured',
        status: 'missing_key'
      }, { status: 500 });
    }

    // Test the API key with a simple request
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': apiKey
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: 'Hello, this is a test message. Please respond with "API is working!"'
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 50,
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ 
        error: `API test failed: ${response.status}`,
        details: errorText,
        status: 'api_error'
      }, { status: 500 });
    }

    const data = await response.json();
    
    return NextResponse.json({ 
      success: true,
      message: 'API is working!',
      response: data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response text',
      status: 'working'
    });
  } catch (error) {
    console.error('Error testing AI API:', error);
    return NextResponse.json(
      { 
        error: error.message || 'Failed to test AI API',
        status: 'error'
      },
      { status: 500 }
    );
  }
} 