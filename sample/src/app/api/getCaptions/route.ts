import { getCaptions } from '@dofy/youtube-caption-fox'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams
  const videoId = searchParams.get('videoId') || ''
  const lang = searchParams.get('lang') || 'en'

  const captions = await getCaptions(videoId, { lang })

  return NextResponse.json(captions)
}
