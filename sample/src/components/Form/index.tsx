'use client'
import { useState } from 'react'

interface FormViewProps {
  onSubmit: (videoId: string) => void
}

export const FormView = () => {
  const [videoId, setVideoId] = useState('')

  return (
    <section className="flex flex-col gap-4 rounded-lg bg-blue-400/30 p-4">
      <h3 className="text-2xl font-semibold">Form</h3>
      <div className="flex flex-col gap-2 rounded-lg bg-black/5 p-4">
        <label htmlFor="videoId" className="text-lg font-medium">
          Video ID
        </label>
        <input
          type="text"
          id="videoId"
          value={videoId}
          onChange={(e) => setVideoId(e.target.value)}
          className="rounded-lg bg-white/70 p-2 focus:outline-none focus:ring-2 focus:ring-black/50"
        />
      </div>
      <div className="flex flex-col gap-2 rounded-lg bg-black/5 p-4">
        <label htmlFor="lang" className="text-lg">
          Language
        </label>
        <input
          type="text"
          id="lang"
          className="rounded-lg bg-white/70 p-2 focus:outline-none focus:ring-2 focus:ring-black/50"
        />
      </div>
      <div className="flex flex-col gap-4 rounded-lg bg-black/5 p-4">
        <div className="flex gap-2">
          <input type="checkbox" id="useProxy" />
          <label htmlFor="useProxy" className="text-lg">
            Use Proxy
          </label>
        </div>
        <div className="flex items-center gap-4">
          <label
            htmlFor="proxyHost"
            className="min-w-[150px] text-right text-lg"
          >
            Proxy Host
          </label>
          <input
            type="text"
            id="proxyHost"
            className="flex-1 rounded-lg bg-white/70 p-2 focus:outline-none focus:ring-2 focus:ring-black/50"
          />
        </div>
        <div className="flex items-center gap-4">
          <label
            htmlFor="proxyPort"
            className="min-w-[150px] text-right text-lg"
          >
            Proxy Port
          </label>
          <input
            type="text"
            id="proxyPort"
            className="flex-1 rounded-lg bg-white/70 p-2 focus:outline-none focus:ring-2 focus:ring-black/50"
          />
        </div>
        <div className="flex items-center gap-4">
          <label
            htmlFor="proxyUser"
            className="min-w-[150px] text-right text-lg"
          >
            Proxy User
          </label>
          <input
            type="text"
            id="proxyUser"
            className="flex-1 rounded-lg bg-white/70 p-2 focus:outline-none focus:ring-2 focus:ring-black/50"
          />
        </div>
        <div className="flex items-center gap-4">
          <label
            htmlFor="proxyPass"
            className="min-w-[150px] text-right text-lg"
          >
            Proxy Password
          </label>
          <input
            type="password"
            id="proxyPass"
            className="flex-1 rounded-lg bg-white/70 p-2 focus:outline-none focus:ring-2 focus:ring-black/50"
          />
        </div>
      </div>
    </section>
  )
}
