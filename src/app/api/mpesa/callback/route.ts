import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const callbackData = await request.json();
    console.log('M-Pesa Callback Received:', JSON.stringify(callbackData, null, 2));
    
    // Here you would typically save the transaction result to your database
    // For now, we'll just log it to the server console.

    return NextResponse.json({ message: 'Callback received successfully' });
  } catch (error: any) {
    console.error('M-Pesa Callback Error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
