import { NextRequest, NextResponse } from 'next/server'

export const GET = (req: NextRequest, options: { params: any }) => {
  console.log('🚀 ~ GET ~ options:', options)
  console.log('🚀 ~ GET ~ req:', )
  const captions = [
    { id: 1, text: '這是一個字幕' },
    { id: 2, text: '這是另一個字幕' },
  ]

  return NextResponse.json(captions)
}
