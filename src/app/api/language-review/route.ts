'use server';
import { NextResponse } from 'next/server';
import { reviewLanguage } from '@/src/ai/flows/language-review';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = await reviewLanguage({
      content: body.content,
      language: body.language,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Language review API error:', error);
    return NextResponse.json(
      { error: 'Failed to review language content' },
      { status: 500 }
    );
  }
}
