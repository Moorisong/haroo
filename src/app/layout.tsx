import type { Metadata, Viewport } from 'next'
import KakaoScript from '@/components/common/KakaoScript'
import './globals.css'

export const metadata: Metadata = {
  title: '하루(Haroo) - 5분 만에 완성하는 나만의 웹사이트 & 모바일 웹앱',
  description:
    '소상공인부터 지식창업가까지, 45종 블록 조립으로 5분 만에 전문가 수준의 웹사이트와 PWA 모바일 웹앱을 완성하세요. 월 29,000원부터 시작.',
  keywords: ['웹사이트 제작', 'PWA', '소상공인', '모바일 웹앱', '홈페이지 제작', '하루'],
  openGraph: {
    title: '하루(Haroo) - 5분 만에 완성하는 나만의 웹사이트 & 모바일 웹앱',
    description: '45종 블록 조립으로 5분 만에 전문가 수준의 웹사이트와 PWA 모바일 웹앱을 완성하세요.',
    locale: 'ko_KR',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#FFFFFF',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className="bg-white">
      <body className="font-pretendard antialiased bg-white text-slate-900">
        {children}
        <KakaoScript />
      </body>
    </html>
  )
}
