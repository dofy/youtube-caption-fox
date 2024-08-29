'use client'

import { VideoInfo } from '@dofy/youtube-caption-fox'
import { FC } from 'react'

interface ResultViewProps {
  video: VideoInfo
}

export const ResultView: FC<ResultViewProps> = ({ video }) => {
  const { title, captions } = video

  return (
    <section className="flex flex-col gap-4 rounded-lg bg-blue-200/30 p-4">
      <h2 className="text-2xl font-semibold">Result</h2>
      <h3 className="text-xl font-semibold">{title}</h3>
      {captions.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {captions.map((caption, index) => (
            <li key={index} className="flex items-baseline gap-4">
              <span className="font-mono">{caption.start.toFixed(3)}</span>
              <span className="font-mono">{caption.dur.toFixed(3)}</span>
              <span className="text-lg">{caption.text}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-lg font-semibold">No captions found</p>
      )}
    </section>
  )
}
