import { NextRequest, NextResponse } from 'next/server';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function POST(request: NextRequest) {
  if (!OPENAI_API_KEY) {
    return NextResponse.json(
      { error: 'OpenAI API key not configured' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { section, content } = body;

    if (!content || !section) {
      return NextResponse.json(
        { error: 'Missing required fields: content and section' },
        { status: 400 }
      );
    }

    const prompts: Record<string, string> = {
      summary: `Enhance and improve this professional summary for a CV. Make it more impactful, concise, and professional. Only return the enhanced summary, no additional text:\n\n${content}`,
      experience: `Enhance and improve this work experience description for a CV. Make it more impactful with action verbs and quantifiable results where possible. Only return the enhanced description, no additional text:\n\n${content}`,
      description: `Enhance and improve this project/education description for a CV. Make it more compelling and professional. Only return the enhanced description, no additional text:\n\n${content}`,
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompts[section] || prompts.description,
          },
        ],
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      console.error('OpenAI API error:', await response.text());
      return NextResponse.json(
        { error: 'Failed to enhance content with AI' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const enhanced = data.choices[0]?.message?.content || content;

    return NextResponse.json({
      enhanced,
      suggestions: [
        'Added more action verbs',
        'Improved clarity',
        'Enhanced professional tone',
      ],
    });
  } catch (error) {
    console.error('Enhancement error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
