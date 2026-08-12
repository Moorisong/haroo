'use client'

import { Server, Cpu, Users, Activity } from 'lucide-react'
import WaitlistKakaoBroadcastBtn from '@/components/admin/WaitlistKakaoBroadcastBtn'

interface InfraStatsData {
  totalContainers: number
  runningContainers: number
  stoppedContainers: number
  failedContainers: number
  avgCpuUsage: number
  avgMemoryUsage: number
  buildSuccessRate: number
  awsCosts: { service: string; cost: number; description: string }[]
  waitlistCount: number
}

const MOCK_INFRA_DATA: InfraStatsData = {
  totalContainers: 142,
  runningContainers: 135,
  stoppedContainers: 6,
  failedContainers: 1,
  avgCpuUsage: 18.4,
  avgMemoryUsage: 42.1,
  buildSuccessRate: 99.3,
  awsCosts: [
    { service: 'AWS EC2 (t4g.small / Docker)', cost: 45000, description: '프로젝트 컨테이너 분산 호스팅' },
    { service: 'AWS S3 (이미지 및 정적 에셋)', cost: 12000, description: '업로드 이미지 & 압축 번들' },
    { service: 'AWS CloudFront (글로벌 CDN)', cost: 8000, description: '전세계 Edge 캐싱 및 Fast SSL' },
    { service: 'AWS Route53 & ACM', cost: 3000, description: 'DNS 및 SSL 자동 발급' },
  ],
  waitlistCount: 342, // Waitlist 행 수
}

export default function AdminInfraDetailed() {
  const i = MOCK_INFRA_DATA
  const totalAwsCost = i.awsCosts.reduce((acc, cur) => acc + cur.cost, 0)

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Server className="text-purple-500" size={20} />
            인프라 상태 및 대기자 시스템
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            AWS 리소스 모니터링 비용 및 배포 상태(status), Waitlist(사전 예약 대기자) 테이블 수집 현황입니다.
          </p>
        </div>
        <div className="text-right bg-purple-50 px-4 py-2 rounded-xl border border-purple-100">
          <p className="text-[11px] text-purple-700 font-medium">컨테이너 정상 가동률</p>
          <p className="text-xl font-black text-purple-900">
            {((i.runningContainers / i.totalContainers) * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      {/* 인프라 KPI 카드 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
          <span className="text-xs font-semibold text-slate-500">평균 CPU 사용률 (AWS EC2)</span>
          <p className="text-2xl font-black text-slate-900">{i.avgCpuUsage}%</p>
          <span className="text-[11px] text-emerald-600 font-medium">안정적 (t4g.small)</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
          <span className="text-xs font-semibold text-slate-500">평균 메모리 점유율 (AWS EC2)</span>
          <p className="text-2xl font-black text-slate-900">{i.avgMemoryUsage}%</p>
          <span className="text-[11px] text-emerald-600 font-medium">여유 용량 확보됨</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1">
          <span className="text-xs font-semibold text-slate-500">빌드 파이프라인 성공률</span>
          <p className="text-2xl font-black text-purple-600">{i.buildSuccessRate}%</p>
          <span className="text-[11px] text-slate-400 font-medium">Build Logs 자동 롤백 적용</span>
        </div>

        <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-lg space-y-1">
          <span className="text-xs font-semibold text-slate-300">월 예상 AWS 인프라 비용</span>
          <p className="text-2xl font-black text-white">₩{totalAwsCost.toLocaleString()}</p>
          <span className="text-[11px] text-slate-400 font-medium">실시간 연동 (Mock Data)</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* AWS 세부 비용 명세 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Cpu size={16} className="text-purple-500" />
            AWS 클라우드 리소스 세부 비용 (Mock 연동)
          </h3>
          <div className="space-y-3">
            {i.awsCosts.map((aws) => (
              <div key={aws.service} className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-800">{aws.service}</span>
                  <span className="text-slate-900 font-black">₩{aws.cost.toLocaleString()}</span>
                </div>
                <p className="text-[11px] text-slate-400">{aws.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 대기자 명단 & 카카오 알림톡 발송 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Users size={16} className="text-purple-500" />
            사전 예약 대기자(Waitlist) 및 안내 발송
          </h3>
          
          <div className="bg-purple-50 p-5 rounded-xl border border-purple-100 flex items-center justify-between">
            <div>
              <span className="text-sm font-bold text-purple-900 block mb-1">수집된 대기자 연락처</span>
              <span className="text-[11px] text-purple-700">Waitlist 테이블 기준</span>
            </div>
            <span className="text-3xl font-black text-purple-900">{i.waitlistCount}명</span>
          </div>

          {/* 알림톡 일괄 발송 버튼 컴포넌트 */}
          <div className="pt-2">
            <WaitlistKakaoBroadcastBtn waitlistCount={i.waitlistCount} />
          </div>
        </div>
      </div>
    </div>
  )
}
