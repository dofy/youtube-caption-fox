import {
  Caption,
  getCaptions,
  GetCaptionsOptions,
} from '@dofy/youtube-caption-fox'
import { get } from 'http'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams
  const videoId = searchParams.get('videoId') || ''
  const lang = searchParams.get('lang') || 'en'
  const useProxy = searchParams.get('useProxy') === 'true'
  const proxyHost = searchParams.get('proxyHost')
  const proxyPort = searchParams.get('proxyPort')
  const proxyUsername = searchParams.get('proxyUsername')
  const proxyPassword = searchParams.get('proxyPassword')

  const options: GetCaptionsOptions = {
    lang,
    proxy: useProxy && {
      host: proxyHost || '',
      port: proxyPort ? parseInt(proxyPort) : 0,
      protocol: 'http',
      auth:
        proxyUsername && proxyPassword
          ? { username: proxyUsername, password: proxyPassword }
          : undefined,
    },
  }
  try {
    const captions = await getCaptions(videoId, options)
    return NextResponse.json(captions)
  } catch (error) {
    console.error(error)
    return NextResponse.json(error, { status: 500 })
  }
}
