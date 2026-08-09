import Link from 'next/link'
import { Home } from 'lucide-react'
import AdminChoiceActionPanel from '@/components/admin/AdminChoiceActionPanel'
import WaitlistKakaoBroadcastBtn from '@/components/admin/WaitlistKakaoBroadcastBtn'
import AwsCostTracker from '@/components/admin/AwsCostTracker'
import AdminFinancialPanel from '@/components/admin/AdminFinancialPanel'
import AdminFunnelPanel from '@/components/admin/AdminFunnelPanel'
import AdminInfraPanel from '@/components/admin/AdminInfraPanel'
import AdminTemplateStatsPanel from '@/components/admin/AdminTemplateStatsPanel'

// Mock Data
const MOCK_STATS = {
  waitlistCount: 342,
  ec2Cost: 45000,
  s3Cost: 12000,
  cfCost: 8000,
  revenue: 8900000,
  pgFee: 222500,
  netProfit: 8612500,
  totalVisitors: 15420,
  draftUsers: 4210,
  paidUsers: 142,
  totalContainers: 142,
  runningContainers: 135,
  stoppedContainers: 7,
}

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <header className="bg-slate-900 px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-slate-900 text-sm font-black">H</span>
          </div>
          <div>
            <h1 className="text-white font-bold text-base">어드민 대시보드</h1>
            <p className="text-slate-400 text-[10px]">Haroo Administrator</p>
          </div>
        </div>
        <Link href="/" className="p-2 bg-slate-800 text-slate-300 hover:text-white rounded-lg transition-colors">
          <Home size={16} />
        </Link>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 space-y-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 퍼널 & 재무 */}
          <div className="space-y-6 lg:col-span-2">
            <div className="grid sm:grid-cols-2 gap-6">
              <AdminFunnelPanel
                totalVisitors={MOCK_STATS.totalVisitors}
                draftUsers={MOCK_STATS.draftUsers}
                paidUsers={MOCK_STATS.paidUsers}
              />
              <AdminFinancialPanel
                revenue={MOCK_STATS.revenue}
                pgFee={MOCK_STATS.pgFee}
                awsCost={MOCK_STATS.ec2Cost + MOCK_STATS.s3Cost + MOCK_STATS.cfCost}
                netProfit={MOCK_STATS.netProfit}
              />
            </div>
            
            <AdminInfraPanel
              totalContainers={MOCK_STATS.totalContainers}
              runningContainers={MOCK_STATS.runningContainers}
              stoppedContainers={MOCK_STATS.stoppedContainers}
            />
          </div>

          {/* 제어 & 비용 & 템플릿 목적 통계 */}
          <div className="space-y-6">
            <AdminChoiceActionPanel />
            <AdminTemplateStatsPanel />
            <WaitlistKakaoBroadcastBtn waitlistCount={MOCK_STATS.waitlistCount} />
            <AwsCostTracker
              ec2Cost={MOCK_STATS.ec2Cost}
              s3Cost={MOCK_STATS.s3Cost}
              cfCost={MOCK_STATS.cfCost}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
