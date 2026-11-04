import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Caption Fox | YouTube 字幕提取',
  description: '获取 YouTube 视频字幕及时间戳。',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>
}
