import { NextResponse } from 'next/server';

export async function GET() {
  // Vrací aktuální čas serveru v ISO formátu
  return NextResponse.json({ serverTime: new Date().toISOString() });
}
