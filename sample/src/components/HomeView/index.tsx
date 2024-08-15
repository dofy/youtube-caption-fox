'use client'

import { FC } from 'react'
import { FormView } from '../FormView'
import { HeaderView } from '../HeaderView'
import type { FormData } from '../types'

export const HomeView: FC = () => {
  return (
    <main className="mx-auto flex max-w-screen-lg flex-col gap-8 p-8">
      <HeaderView />
      <div className="flex gap-2">
        {/* avatar */}
        <div className="bg-red-200">avatar</div>
        {/* content */}
        <div className="flex-1 overflow-hidden text-ellipsis text-nowrap bg-blue-100">
          text text text text text text text text text text text text text text
          text text text text text text text text text text text text text text
          text text
        </div>
        {/* button */}
        <div className="bg-green-200">follow</div>
      </div>

      <FormView onSubmit={(data: FormData) => console.log(data)} />
    </main>
  )
}
