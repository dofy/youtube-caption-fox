import { getCaptions } from '@dofy/youtube-caption-fox'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const videoId = req.nextUrl.searchParams.get('videoId') || ''
  const lang = req.nextUrl.searchParams.get('lang') || 'en'
  if (!/^[\w-]{11}$/.test(videoId) || !/^[a-zA-Z0-9-]{1,20}$/.test(lang)) {
    return NextResponse.json({ error: 'Invalid video ID or language' }, { status: 400 })
  }
  const video = await getCaptions(videoId, { lang })
  return NextResponse.json(video, { headers: { 'Cache-Control': 'no-store' } })
}
