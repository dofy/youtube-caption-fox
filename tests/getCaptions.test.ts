import { getCaptions } from '../src/index'

describe('getCaptions', () => {
  it('should fetch captions for a valid YouTube video ID', async () => {
    const videoId = '5I1jTJ9sYeA'

    const { captions } = await getCaptions(videoId, { lang: 'en' })
    expect(captions).toBeDefined()
    expect(captions.length).toBeGreaterThan(0)
    expect(captions[0]).toHaveProperty('start')
    expect(captions[0]).toHaveProperty('dur')
    expect(captions[0]).toHaveProperty('text')
  })

  it('should return an empty array if no captions are found', async () => {
    const videoId = 'video-without-captions'

    const captions = await getCaptions(videoId, { lang: 'en' })

    expect(captions).toEqual([])
  })

  it('should fetch captions in a different language if specified', async () => {
    const videoId = '5I1jTJ9sYeA'
    const { captions } = await getCaptions(videoId, { lang: 'zh' })

    expect(captions).toBeDefined()
    expect(captions.length).toBeGreaterThan(0)
    expect(captions[0]).toHaveProperty('start')
    expect(captions[0]).toHaveProperty('dur')
    expect(captions[0]).toHaveProperty('text')
  })

  it('should fetch captions using a proxy if specified', async () => {
    const videoId = '5I1jTJ9sYeA'
    const proxy = {
      host: 'proxy.example.com',
      port: 8080,
      auth: {
        username: 'username',
        password: 'password',
      },
    }

    const { captions } = await getCaptions(videoId, { proxy })

    expect(captions).toBeDefined()
    expect(captions.length).toBeGreaterThan(0)
    expect(captions[0]).toHaveProperty('start')
    expect(captions[0]).toHaveProperty('dur')
    expect(captions[0]).toHaveProperty('text')
  })
})
