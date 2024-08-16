import { ProxyOptions } from '@dofy/youtube-caption-fox/types'

export type FormData = {
  videoId: string
  lang: string
  proxy?: ProxyOptions | false
}
