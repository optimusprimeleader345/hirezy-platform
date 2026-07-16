import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'hirezy-backend',
    timestamp: new Date().toISOString(),
  });
}
