'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getCurrentUser, signOut, type UserProfile } from '@/lib/auth'
import { consumeAuthRedirectTarget } from '@/lib/authRedirectHelper'
import BrandLogo from '@/components/common/BrandLogo'
const NAV_LINKS=[['만드는 방법','#guide'],['활용 사례','#usecases'],['가격','#pricing']]
export default function HeaderNav(){const router=useRouter();const[open,setOpen]=useState(false);const[user,setUser]=useState<UserProfile|null>(null);useEffect(()=>{getCurrentUser().then(u=>{setUser(u);const target=consumeAuthRedirectTarget();if(u&&target&&target!=='/')router.replace(target)})},[router]);const logout=async()=>{await signOut();setUser(null)};return <header className="site-header"><div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"><BrandLogo /><nav className="hidden items-center gap-8 md:flex">{NAV_LINKS.map(([label,href])=><a key={href} href={href} className="nav-link">{label}</a>)}</nav><div className="hidden items-center gap-5 md:flex">{user?<><Link href="/dashboard" className="nav-link">{user.name}</Link><button onClick={logout} className="nav-link">로그아웃</button></>:<Link href="/login" className="nav-link">로그인</Link>}<Link href="/builder" className="header-cta">시작하기 <span aria-hidden="true">→</span></Link></div><button className="menu-button md:hidden" onClick={()=>setOpen(!open)} aria-label={open?'메뉴 닫기':'메뉴 열기'}>{open?'×':'☰'}</button></div>{open&&<nav className="mobile-nav md:hidden">{NAV_LINKS.map(([label,href])=><a key={href} href={href} onClick={()=>setOpen(false)}>{label}</a>)}<Link href="/builder" onClick={()=>setOpen(false)} className="header-cta">시작하기 →</Link></nav>}</header>}
