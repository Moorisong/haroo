import type { Metadata, Viewport } from 'next'
import KakaoScript from '@/components/common/KakaoScript'
import './globals.css'

export const metadata: Metadata = {
  title: '하루 | 5분 만에 만드는 나만의 모바일 웹 & 앱',
  description: '코딩 없이 블록을 조립해 나만의 모바일 웹과 바로가기 앱을 5분 만에 완성하세요.',
  keywords: ['하루', '모바일 웹', '앱 만들기', '노코드', '소상공인 홈페이지'],
  openGraph: { title: '하루 | 나만의 모바일 웹 & 앱', description: '필요한 블록만 톡톡 꽂아 5분 만에 완성하세요.', locale: 'ko_KR', type: 'website' },
}
export const viewport: Viewport = { colorScheme: 'light', themeColor: '#FBFBF9', width: 'device-width', initialScale: 1, maximumScale: 1 }
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko" className="bg-background"><body className="font-pretendard antialiased bg-background text-foreground">{children}<KakaoScript /></body></html>
}
