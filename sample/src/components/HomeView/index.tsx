'use client'

import { FC, useState } from 'react'
import { FormView } from '../FormView'
import { HeaderView } from '../HeaderView'
import { ResultView } from '../ResultView'
import type { FormData } from '../types'
import { Caption } from '@dofy/youtube-caption-fox'

export const HomeView: FC = () => {
  const [captions, setCaptions] = useState<Caption[]>([])

  const onSubmit = (data: FormData) => {
    fetch(`/api/getCaptions?videoId=${data.videoId}&lang=${data.lang}`)
      .then((response) => response.json())
      .then(setCaptions)
      .catch(console.error)
  }

  return (
    <main className="mx-auto flex max-w-screen-lg flex-col gap-8 p-8">
      <HeaderView />
      <FormView onSubmit={onSubmit} />
      <ResultView captions={captions} />
    </main>
  )
}
