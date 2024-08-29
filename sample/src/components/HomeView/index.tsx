'use client'

import { VideoInfo } from '@dofy/youtube-caption-fox'
import { FC, useState } from 'react'
import { FormView } from '../FormView'
import { HeaderView } from '../HeaderView'
import { ResultView } from '../ResultView'
import type { FormData } from '../types'

export const HomeView: FC = () => {
  const [videoInfo, setVideoInfo] = useState<VideoInfo>()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = (data: FormData) => {
    setIsLoading(true)
    const urlSearch = new URLSearchParams(data as any)
    fetch(`/api/getCaptions?${urlSearch.toString()}`)
      .then((response) => response.json())
      .then(setVideoInfo)
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }

  return (
    <main className="mx-auto flex max-w-screen-lg flex-col gap-8 p-8">
      <HeaderView />
      <FormView isLoading={isLoading} onSubmit={onSubmit} />
      {videoInfo && <ResultView video={videoInfo} />}
    </main>
  )
}
