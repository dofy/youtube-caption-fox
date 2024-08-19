'use client'

// import { AuthOptions, ProxyOptions } from '@dofy/youtube-caption-fox'
import { AuthOptions, ProxyOptions } from '@dofy/youtube-caption-fox'
import { FC, useState } from 'react'
import { FormData } from '../types'

interface FormViewProps {
  onSubmit: (data: FormData) => void
}

const DefaultFormData: FormData = {
  videoId: '',
  lang: '',
  proxy: false,
}

export const FormView: FC<FormViewProps> = ({ onSubmit }) => {
  const [viaProxy, setViaProxy] = useState(false)
  const [proxyConfig, setProxyConfig] = useState<ProxyOptions>({
    host: '',
    port: 8080,
  })
  const [submitData, setSubmitData] = useState<FormData>(DefaultFormData)

  const handleSubmit = () => {
    const fullData = {
      ...submitData,
      proxy: viaProxy && proxyConfig,
    }
    onSubmit(fullData)
  }

  const updateSubmitData = (key: keyof FormData, value: string) => {
    setSubmitData((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const updateProxyConfig = (
    key: keyof ProxyOptions,
    value: string | number
  ) => {
    setProxyConfig((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const updateAuthData = (key: keyof AuthOptions, value: string) => {
    setProxyConfig((prev) => ({
      ...prev,
      auth: {
        ...prev.auth!,
        [key]: value,
      },
    }))
  }

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
          placeholder="e.g. 5I1jTJ9sYeA"
          value={submitData.videoId}
          onChange={(evt) => updateSubmitData('videoId', evt.target.value)}
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
          placeholder="e.g. en for English, zh for Chinese, ja for Japanese"
          value={submitData.lang}
          onChange={(evt) => updateSubmitData('lang', evt.target.value)}
          className="rounded-lg bg-white/70 p-2 focus:outline-none focus:ring-2 focus:ring-black/50"
        />
      </div>
      <div className="flex flex-col gap-4 rounded-lg bg-black/5 p-4">
        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            id="useProxy"
            checked={viaProxy}
            className="h-5 w-5"
            onChange={(evt) => setViaProxy(evt.target.checked)}
          />
          <label htmlFor="useProxy" className="text-lg">
            Use Proxy
          </label>
        </div>

        <section className={`flex-col gap-4 ${viaProxy ? 'flex' : 'hidden'}`}>
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
              placeholder='e.g. "http://proxy.example.com"'
              value={proxyConfig?.host}
              onChange={(evt) => updateProxyConfig('host', evt.target.value)}
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
              type="decimal"
              id="proxyPort"
              placeholder="e.g. 8080"
              value={proxyConfig.port}
              onChange={(evt) => updateProxyConfig('port', evt.target.value)}
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
              placeholder="e.g. proxyuser"
              value={proxyConfig.auth?.username}
              onChange={(evt) => updateAuthData('username', evt.target.value)}
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
              placeholder="e.g. password"
              value={proxyConfig.auth?.password}
              onChange={(evt) => updateAuthData('password', evt.target.value)}
              className="flex-1 rounded-lg bg-white/70 p-2 focus:outline-none focus:ring-2 focus:ring-black/50"
            />
          </div>
        </section>
      </div>
      <div className="flex">
        <button
          onClick={handleSubmit}
          className="flex-1 rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </div>
    </section>
  )
}
