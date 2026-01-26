import { NextResponse } from 'next/server';
import { getAllResumeExamples } from '@/lib/resume-examples/posts';

export async function GET() {
  try {
    const examples = await getAllResumeExamples();
    return NextResponse.json({ examples });
  } catch (error) {
    console.error('Error fetching resume examples:', error);
    return NextResponse.json({ examples: [] }, { status: 500 });
  }
}
