import { NextResponse, NextRequest } from 'next/server';

import { getAssistantService } from '@docu/features/Assistant';

export async function POST(request: NextRequest) {
  const { question } = await request.json();

  if (!question) {
    return NextResponse.json(
      { error: 'Missing question message' },
      { status: 400 },
    );
  }

  const assistantService = await getAssistantService();

  const response = await assistantService.getAnswer({
    question,
  });

  console.log(response);

  return NextResponse.json(response);
}
