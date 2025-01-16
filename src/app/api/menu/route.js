// src/app/api/Menu/route.js
import { NextResponse } from 'next/server';
import { Meal } from '@/schema/models/vendorSchemas/Meal';
import User from '@/schema/models/User';

// GET handler for fetching meals
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    let query = {};
    if (category && category !== 'all') {
      query.category = category;
    }

    const meals = await Meal.find(query).sort({ createdAt: -1 });
    return NextResponse.json(meals);
  } catch (error) {
    console.error('Error fetching meals:', error);
    return NextResponse.json(
      { error: 'Error fetching meals' },
      { status: 500 }
    );
  }
}

// POST handler for recent items
export async function POST(request) {
  try {
    const { userId, item } = await request.json();
    
    const user = await User.findOne({ username: userId });
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    user.recent.unshift(item);
    await user.save();
    
    return NextResponse.json({ 
      message: 'Item added to recent',
      recent: user.recent 
    });
  } catch (error) {
    console.error('Error adding recent item:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}

// DELETE handler for clearing recent items
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    user.recent = [];
    await user.save();
    
    return NextResponse.json({ message: 'Recent cleared' });
  } catch (error) {
    console.error('Error clearing recent items:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}