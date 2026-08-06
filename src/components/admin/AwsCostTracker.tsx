'use client'

import { Server, HardDrive, Network } from 'lucide-react'

interface Props {
  ec2Cost: number
  s3Cost: number
  cfCost: number
}

/**
 * AWS 비용 실시간 추적 컴포넌트
 */
export default function AwsCostTracker({ ec2Cost, s3Cost, cfCost }: Props) {
  const totalCost = ec2Cost + s3Cost + cfCost
  const maxLimit = 2000000 // 200만원 서킷 브레이커 기준
  const percent = Math.min((totalCost / maxLimit) * 100, 100)

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5">
      <h3 className="text-sm font-bold text-slate-900 mb-4">AWS 인프라 비용</h3>
      
      {/* 총 비용 */}
      <div className="mb-5">
        <div className="text-2xl font-black text-slate-900">₩ {totalCost.toLocaleString()}</div>
        <div className="text-xs text-slate-500 mt-1">이번 달 누적 청구액 (서킷 브레이커 한도 200만원)</div>
      </div>

      {/* 진행 바 */}
      <div className="h-3 bg-slate-100 rounded-full overflow-hidden mb-6">
        <div 
          className={`h-full transition-all ${percent > 90 ? 'bg-red-500' : percent > 70 ? 'bg-amber-400' : 'bg-emerald-500'}`}
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* 세부 비용 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-slate-600">
            <Server size={14} /> EC2 (t4g.small)
          </div>
          <div className="font-semibold">₩ {ec2Cost.toLocaleString()}</div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-slate-600">
            <HardDrive size={14} /> S3 (이미지)
          </div>
          <div className="font-semibold">₩ {s3Cost.toLocaleString()}</div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-slate-600">
            <Network size={14} /> CloudFront (CDN)
          </div>
          <div className="font-semibold">₩ {cfCost.toLocaleString()}</div>
        </div>
      </div>
    </div>
  )
}
