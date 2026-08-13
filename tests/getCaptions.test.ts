import { describe, it, expect } from '@jest/globals'
import { getCaptions } from '../src/index'

const VIDEO_ID = '5I1jTJ9sYeA'
const NET_TIMEOUT = 30000

describe('getCaptions', () => {
  it(
    'should fetch English captions for a valid YouTube video ID',
    async () => {
      const { captions } = await getCaptions(VIDEO_ID, { lang: 'en' })
      expect(captions.length).toBeGreaterThan(0)
      expect(captions[0]).toHaveProperty('start')
      expect(captions[0]).toHaveProperty('dur')
      expect(captions[0]).toHaveProperty('text')
    },
    NET_TIMEOUT
  )

  it(
    'should fetch captions in a different language if specified',
    async () => {
      const { captions } = await getCaptions(VIDEO_ID, { lang: 'zh' })
      expect(captions.length).toBeGreaterThan(0)
      expect(captions[0]).toHaveProperty('text')
    },
    NET_TIMEOUT
  )

  it(
    'should return video metadata alongside captions',
    async () => {
      const info = await getCaptions(VIDEO_ID, { lang: 'en' })
      expect(info.id).toBe(VIDEO_ID)
      expect(typeof info.title).toBe('string')
      expect(info.title!.length).toBeGreaterThan(0)
    },
    NET_TIMEOUT
  )

  it(
    'should return an empty caption list if no captions are found',
    async () => {
      const { captions } = await getCaptions('video-without-captions', {
        lang: 'en',
      })
      expect(captions).toEqual([])
    },
    NET_TIMEOUT
  )

  it(
    'should accept an explicit proxy:false and still fetch captions',
    async () => {
      const { captions } = await getCaptions(VIDEO_ID, {
        lang: 'en',
        proxy: false,
      })
      expect(captions.length).toBeGreaterThan(0)
    },
    NET_TIMEOUT
  )
})
