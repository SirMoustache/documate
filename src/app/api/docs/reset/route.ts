import { getAssistantService } from '@docu/features/Assistant';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const assistantService = await getAssistantService();
  const result = await assistantService.reset();

  return NextResponse.json(result);
}
