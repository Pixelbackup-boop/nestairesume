import { NextResponse } from 'next/server';
import { getAllCareerTips } from '@/lib/blog/posts';

export async function GET() {
  try {
    const posts = await getAllCareerTips();
    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching career tips:', error);
    return NextResponse.json({ posts: [] }, { status: 500 });
  }
}
