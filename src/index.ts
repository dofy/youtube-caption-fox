import axios, { AxiosRequestConfig } from 'axios'
import * as cheerio from 'cheerio'

export type AuthOptions = {
  username: string
  password: string
}

export type ProxyOptions = {
  host: string
  port: number
  protocol?: string
  auth?: AuthOptions
}

export type GetCaptionsOptions = {
  proxy?: ProxyOptions | false
  lang?: string // 字幕语言选项，例如 "en" 或 "fr"
}

export type VideoInfo = {
  id: string
  title?: string
  description?: string
  cover?: string
  publishDate?: string
  captions: Caption[]
}

export type Caption = {
  start: number
  dur: number
  text: string
}

export type CaptionTrack = {
  baseUrl: string
  languageCode: string
}

export type PlayerData = {
  videoDetails?: {
    title?: string
    shortDescription?: string
    thumbnail?: { thumbnails?: { url: string }[] }
  }
  microformat?: {
    playerMicroformatRenderer?: { publishDate?: string; uploadDate?: string }
  }
  captions?: {
    playerCaptionsTracklistRenderer?: {
      captionTracks?: CaptionTrack[]
    }
  }
}

// InnerTube (youtubei) player endpoint. The public web API key is long-lived.
const INNERTUBE_KEY = 'AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8'
// iOS InnerTube client. As of 2024 the watch-page `captionTrack.baseUrl` values
// require a proof-of-origin (pot) token and return an empty body without it.
// The iOS client still hands back baseUrls that serve the classic
// `<transcript><text>` XML with no token. Bump clientVersion / userAgent if
// YouTube starts rejecting the request (HTTP 400) or omitting captionTracks.
const IOS_CLIENT = {
  clientName: 'IOS',
  clientVersion: '20.10.4',
  deviceModel: 'iPhone16,2',
  hl: 'en',
  gl: 'US',
}
const IOS_USER_AGENT =
  'com.google.ios.youtube/20.10.4 (iPhone16,2; U; CPU iOS 18_3_2 like Mac OS X)'

export const getCaptions = async (
  videoId: string,
  options?: GetCaptionsOptions
): Promise<VideoInfo> => {
  try {
    const axiosRequestConfig: AxiosRequestConfig = {
      proxy: options?.proxy,
    }

    // 通过 InnerTube player 接口获取视频信息与字幕轨道
    const player = await fetchPlayer(videoId, axiosRequestConfig)

    const details = player.videoDetails ?? {}
    const microformat = player.microformat?.playerMicroformatRenderer ?? {}
    const thumbnails = details.thumbnail?.thumbnails ?? []

    const title = details.title ?? ''
    const description = details.shortDescription ?? ''
    const cover = thumbnails.length ? thumbnails[thumbnails.length - 1].url : ''
    const publishDate = microformat.publishDate ?? microformat.uploadDate ?? ''

    // 查找字幕信息
    const captionsUrl = pickCaptionUrl(player, options?.lang)
    if (!captionsUrl) {
      console.error(`Captions not found for video ID: ${videoId}`)
      return {
        id: videoId,
        title,
        description,
        cover,
        publishDate,
        captions: [],
      }
    }

    // 获取并解析字幕内容
    const captionsResponse = await axios.get(captionsUrl, axiosRequestConfig)
    const captions = parseCaptions(captionsResponse.data)

    return {
      id: videoId,
      title,
      description,
      cover,
      publishDate,
      captions,
    }
  } catch (error) {
    console.error(error)
    return {
      id: videoId,
      title: '',
      description: '',
      cover: '',
      publishDate: '',
      captions: [],
    }
  }
}

async function fetchPlayer(
  videoId: string,
  config: AxiosRequestConfig
): Promise<PlayerData> {
  const response = await axios.post(
    `https://www.youtube.com/youtubei/v1/player?key=${INNERTUBE_KEY}`,
    {
      context: { client: IOS_CLIENT },
      videoId,
      contentCheckOk: true,
      racyCheckOk: true,
    },
    {
      ...config,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': IOS_USER_AGENT,
        'X-YouTube-Client-Name': '5',
        'X-YouTube-Client-Version': IOS_CLIENT.clientVersion,
      },
    }
  )
  return response.data
}

function pickCaptionUrl(player: PlayerData, lang: string = 'en'): string | null {
  // 提取字幕 URL，根据语言筛选
  const captionsTracks =
    player.captions?.playerCaptionsTracklistRenderer?.captionTracks
  if (!captionsTracks || captionsTracks.length === 0) {
    return null
  }

  const track =
    captionsTracks.find((t: CaptionTrack) =>
      t.languageCode.toLowerCase().startsWith(lang.toLowerCase())
    ) || captionsTracks[0]
  return track?.baseUrl || null
}

function parseCaptions(data: string): Caption[] {
  // 使用 Cheerio 解析字幕的 XML 数据
  const $ = cheerio.load(data, { xmlMode: true })
  const captions: Caption[] = []

  $('transcript > text').each((_, element) => {
    const start = parseFloat($(element).attr('start') || '0')
    const dur = parseFloat($(element).attr('dur') || '0')
    const text = $(element).text()

    captions.push({ start, dur, text })
  })

  return captions
}
