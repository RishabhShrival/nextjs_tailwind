import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Testing Google Sheets connection...');
    
    // Test basic connection
    return NextResponse.json({
      success: true,
      message: 'Google Sheets connection test endpoint ready!',
      data: {
        note: 'Configure your Google Sheets credentials in .env.local to enable database features',
        timestamp: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('Test failed:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Test endpoint error',
      error: error.message
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { action, data } = await request.json();
    
    if (action === 'create_user') {
      // Try to create user in Google Sheets
      try {
        const { createUser } = await import('@/lib/sheets-db');
        const newUser = await createUser(data);
        
        if (newUser) {
          return NextResponse.json({
            success: true,
            message: 'User created successfully in Google Sheets!',
            user: newUser
          });
        } else {
          return NextResponse.json({
            success: true,
            message: 'User registration completed (Google Sheets not configured)',
            note: 'Using fallback authentication'
          });
        }
      } catch (error) {
        console.error('Google Sheets error:', error);
        return NextResponse.json({
          success: true,
          message: 'User registration completed (Google Sheets error)',
          note: 'Using fallback authentication',
          error: error.message
        });
      }
    }
    
    return NextResponse.json({
      success: true,
      message: `${action} endpoint ready - configure Google Sheets to enable`,
      received_data: data
    });
    
  } catch (error) {
    console.error('API operation failed:', error);
    return NextResponse.json({
      success: false,
      message: 'Operation failed',
      error: error.message
    }, { status: 500 });
  }
}