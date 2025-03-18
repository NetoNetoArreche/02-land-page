import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  return new Response(JSON.stringify({ message: 'WhatsApp integration removed' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
