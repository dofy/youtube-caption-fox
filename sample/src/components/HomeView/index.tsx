'use client'

import { FC } from 'react'
import { FormView } from '../FormView'
import { HeaderView } from '../HeaderView'
import { ResultView } from '../ResultView'
import type { FormData } from '../types'

export const HomeView: FC = () => {
  return (
    <main className="mx-auto flex max-w-screen-lg flex-col gap-8 p-8">
      <HeaderView />
      <FormView onSubmit={(data: FormData) => console.log(data)} />
      <ResultView />
    </main>
  )
}
