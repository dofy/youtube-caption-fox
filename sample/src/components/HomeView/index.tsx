'use client'

import { FC, useState } from 'react'
import { FormView } from '../FormView'
import { HeaderView } from '../HeaderView'
import { ResultView } from '../ResultView'
import type { FormData } from '../types'
import { Caption } from '@dofy/youtube-caption-fox'

export const HomeView: FC = () => {
  const [captions, setCaptions] = useState<Caption[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = (data: FormData) => {
    setIsLoading(true)
    const urlSearch = new URLSearchParams(data as any)
    fetch(`/api/getCaptions?${urlSearch.toString()}`)
      .then((response) => response.json())
      .then(setCaptions)
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }

  return (
    <main className="mx-auto flex max-w-screen-lg flex-col gap-8 p-8">
      <HeaderView />
      <FormView isLoading={isLoading} onSubmit={onSubmit} />
      <ResultView captions={captions} />
    </main>
  )
}
