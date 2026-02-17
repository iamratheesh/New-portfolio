import { NextResponse } from 'next/server';
import { isEmail } from '@/lib/validations';

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.email || !isEmail(body.email)) {
    return NextResponse.json(
      { error: 'Invalid email' },
      { status: 400 }
    );
  }

  return NextResponse.json({ success: true });
}
