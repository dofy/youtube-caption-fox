'use client'

import type { VideoInfo } from '@dofy/youtube-caption-fox'
import Link from 'next/link'
import { useEffect, useRef, useState, type FormEvent } from 'react'

function videoIdFromInput(value: string): string | null {
  const input = value.trim()
  if (/^[\w-]{11}$/.test(input)) return input
  try {
    const url = new URL(input)
    const host = url.hostname.toLowerCase().replace(/^www\./, '')
    let id: string | null = null
    if (host === 'youtu.be') id = url.pathname.split('/')[1]
    if (host === 'youtube.com' || host === 'm.youtube.com') {
      id = url.searchParams.get('v') || url.pathname.match(/^\/(?:shorts|embed|live)\/([^/]+)/)?.[1] || null
    }
    return id && /^[\w-]{11}$/.test(id) ? id : null
  } catch {
    return null
  }
}

function timestamp(seconds: number): string {
  const total = Math.floor(seconds)
  const hours = Math.floor(total / 3600)
  const minutes = Math.floor((total % 3600) / 60)
  const rest = total % 60
  return hours ? `${hours}:${String(minutes).padStart(2, '0')}:${String(rest).padStart(2, '0')}` : `${minutes}:${String(rest).padStart(2, '0')}`
}

function HighlightedText({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>
  const normalized = text.toLocaleLowerCase()
  const parts: React.ReactNode[] = []
  let start = 0
  let match = normalized.indexOf(query)
  while (match !== -1) {
    parts.push(text.slice(start, match), <mark key={match}>{text.slice(match, match + query.length)}</mark>)
    start = match + query.length
    match = normalized.indexOf(query, start)
  }
  parts.push(text.slice(start))
  return <>{parts}</>
}

export function HomeView() {
  const [input, setInput] = useState('https://www.youtube.com/watch?v=5I1jTJ9sYeA')
  const [lang, setLang] = useState('en')
  const [customLang, setCustomLang] = useState('')
  const [query, setQuery] = useState('')
  const [copyStatus, setCopyStatus] = useState('')
  const [isSticky, setIsSticky] = useState(false)
  const toolbarSentinel = useRef<HTMLDivElement>(null)
  const [video, setVideo] = useState<VideoInfo | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const sentinel = toolbarSentinel.current
    if (!sentinel) { setIsSticky(false); return }
    const observer = new IntersectionObserver(([entry]) => {
      setIsSticky(!entry.isIntersecting && entry.boundingClientRect.top < 0)
    }, { threshold: 0 })
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [video])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const id = videoIdFromInput(input)
    if (!id) { setError('请输入有效的 YouTube 视频链接或 11 位视频 ID。'); return }
    const selectedLang = lang === 'custom' ? customLang.trim() : lang
    if (!/^[a-zA-Z0-9-]{1,20}$/.test(selectedLang)) { setError('请输入有效的语言代码，例如 en、zh 或 pt-BR。'); return }
    setError('')
    setQuery('')
    setCopyStatus('')
    setVideo(null)
    setLoading(true)
    try {
      const params = new URLSearchParams({ videoId: id, lang: selectedLang })
      const response = await fetch(`/api/getCaptions?${params}`)
      if (!response.ok) throw new Error('请求失败，请检查网络后重试。')
      setVideo(await response.json())
    } catch {
      setError('请求失败，请检查网络后重试。')
    } finally {
      setLoading(false)
    }
  }

  const search = query.trim().toLocaleLowerCase()
  const filteredCaptions = video?.captions.filter(caption => caption.text.toLocaleLowerCase().includes(search)) ?? []
  const transcript = video?.captions.map(caption => `[${timestamp(caption.start)}] ${caption.text}`).join('\n') ?? ''

  async function copyTranscript() {
    try {
      await navigator.clipboard.writeText(transcript)
      setCopyStatus('已复制全部字幕')
    } catch {
      setCopyStatus('复制失败，请使用下载功能')
    }
  }

  function downloadTranscript() {
    if (!video) return
    const url = URL.createObjectURL(new Blob([transcript], { type: 'text/plain;charset=utf-8' }))
    const link = document.createElement('a')
    link.href = url
    link.download = `captions-${video.id}.txt`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main className="shell">
      <header className="topbar">
        <Link className="brand" href="/" aria-label="Caption Fox 首页"><span className="brand-mark">▶</span> Caption Fox</Link>
        <a className="github" href="https://github.com/dofy/youtube-caption-fox" target="_blank" rel="noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.68.08-.68 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.94.1-.73.39-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.56 0-1.23.44-2.23 1.16-3.02-.12-.29-.5-1.44.11-2.98 0 0 .95-.3 3.1 1.15a10.8 10.8 0 0 1 5.64 0c2.15-1.46 3.09-1.15 3.09-1.15.62 1.54.23 2.69.12 2.98.72.79 1.16 1.79 1.16 3.02 0 4.32-2.64 5.27-5.15 5.55.4.35.76 1.04.76 2.1v3.07c0 .3.2.65.77.54A11.25 11.25 0 0 0 12 .75Z" /></svg>GitHub</a>
      </header>
      <section className="intro">
        <p className="intro-note"><span className="pulse" /> YouTube 字幕提取工具</p>
        <h1>让视频里的话，<br /><span>变成看得见的文字。</span></h1>
        <p className="intro-copy">粘贴视频链接，获取带时间戳的字幕。<br />适合阅读、整理和进一步处理。</p>
      </section>
      <form className="search-panel" onSubmit={submit}>
        <div className="fields">
          <label className="video-field">视频链接或 ID<input value={input} onChange={event => setInput(event.target.value)} placeholder="粘贴 YouTube 链接" required /></label>
          <label className="language-field">字幕语言<select value={lang} onChange={event => setLang(event.target.value)}><option value="en">英语 · en</option><option value="zh">中文 · zh</option><option value="ja">日语 · ja</option><option value="ko">韩语 · ko</option><option value="es">西班牙语 · es</option><option value="fr">法语 · fr</option><option value="de">德语 · de</option><option value="custom">其他语言…</option></select></label>
          <button disabled={loading} type="submit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M7 10h3m-3 4h5m2-4h3m-3 4h3" strokeLinecap="round"/></svg>{loading ? '正在提取…' : '提取字幕'}</button>
        </div>
        {lang === 'custom' && <label className="custom-language">其他语言代码<input value={customLang} onChange={event => setCustomLang(event.target.value)} placeholder="例如 pt-BR" maxLength={20} /></label>}
        <p className="hint">找不到指定语言时会使用视频的第一个可用字幕。</p>
        {error && <p className="error" role="alert">{error}</p>}
      </form>
      {video ? (
        <section className="results" aria-live="polite">
          <div className="result-head"><div><p className="result-kicker">提取结果</p><h2>{video.title ? <a className="video-title-link" href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noreferrer">{video.title}</a> : '未能获取视频信息'}</h2></div><span className="count">{video.captions.length} 条字幕</span></div>
          {video.captions.length ? <>
            <div className="toolbar-sentinel" ref={toolbarSentinel} aria-hidden="true" />
            <div className={`caption-toolbar${isSticky ? ' is-sticky' : ''}`}>
              {isSticky && <div className="toolbar-info"><strong title={video.title}>{video.title || '字幕结果'}</strong><span>{search ? `${filteredCaptions.length} / ${video.captions.length} 条匹配` : `${video.captions.length} 条字幕`}</span></div>}
              <div className="toolbar-actions">
                <label className="caption-search"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4" strokeLinecap="round"/></svg><input type="search" aria-label="搜索字幕" placeholder="搜索字幕" value={query} onChange={event => setQuery(event.target.value)} /></label>
                <button className="tool-button" type="button" onClick={copyTranscript}>复制全部</button>
                <button className="tool-button" type="button" onClick={downloadTranscript}>下载 TXT</button>
              </div>
              <span className="copy-status" role="status">{copyStatus}</span>
            </div>
            {filteredCaptions.length ? <ol className="captions">{filteredCaptions.map((caption, index) => <li key={`${caption.start}-${index}`}><a href={`https://www.youtube.com/watch?v=${video.id}&t=${Math.floor(caption.start)}s`} target="_blank" rel="noreferrer" aria-label={`在 YouTube 中打开 ${timestamp(caption.start)}`}>{timestamp(caption.start)}</a><span><HighlightedText text={caption.text} query={search} /></span></li>)}</ol> : <p className="empty">没有找到匹配的字幕，试试其他关键词。</p>}
          </> : <p className="empty">没有获取到字幕。视频可能没有字幕，也可能是网络或 YouTube 请求失败；请检查链接和网络后重试。</p>}
        </section>
      ) : <section className="empty-preview"><div className="preview-icon">“ ”</div><div><h2>字幕会显示在这里</h2><p>点击上方按钮，试试预填的视频。</p></div></section>}
      <footer>Caption Fox <span>·</span> 本地演示</footer>
    </main>
  )
}
