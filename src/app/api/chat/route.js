// src/app/api/chat/route.js

import { NextResponse } from 'next/server';
import ChatMessage from '@/schema/models/chatModel';

export async function POST(req) {
  try {
    const body = await req.json();
    const { content, sender } = body;

    // Create new message
    const message = new ChatMessage(
      Date.now(),
      content,
      sender,
      new Date()
    );

    // Here you would typically save to your database
    // For now, we'll just return the message
    return NextResponse.json({ 
      success: true, 
      message: message.toJSON() 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

//eslint-disable-next-line
export async function GET(req) {
  try {
    // Here you would typically fetch messages from your database
    // For now, we'll return an empty array
    return NextResponse.json({ 
      success: true, 
      messages: [] 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}