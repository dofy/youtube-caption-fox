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
  captions?: {
    playerCaptionsTracklistRenderer?: {
      captionTracks?: CaptionTrack[]
    }
  }
}
