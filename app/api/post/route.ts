import { NextRequest, NextResponse } from 'next/server';
import { generateCaption } from '@/lib/generateCaption';
// import your Bluesky client here when ready

export async function POST(req: NextRequest) {
  const { restaurant, menuItems, poll } = await req.json();

  const caption = generateCaption(restaurant, menuItems);

  // TODO: attach image (uploaded separately) + poll if platform supports it
  // Example shape:
  // await blueskyClient.post({ text: caption, imageCid, poll });

  return NextResponse.json({ ok: true, caption });
}
