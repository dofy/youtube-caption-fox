'use client'

import { FC } from 'react'
import { FormView } from '../FormView'
import { HeaderView } from '../HeaderView'
import { ResultView } from '../ResultView'
import type { FormData } from '../types'
import { getCaptions } from '@dofy/youtube-caption-fox'

export const HomeView: FC = () => {
  const onSubmit = (data: FormData) => {
    getCaptions(data.videoId, { lang: data.lang })
      .then((captions) => {
        console.log(captions)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <main className="mx-auto flex max-w-screen-lg flex-col gap-8 p-8">
      <HeaderView />
      <FormView onSubmit={onSubmit} />
      <ResultView />
    </main>
  )
}
