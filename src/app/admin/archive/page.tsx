import AdminNav from '@/components/admin/AdminNav'
import AdminArchivePanel from '@/components/admin/AdminArchivePanel'

export default function AdminArchivePage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <AdminNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        <div className="space-y-6">
          {/* 페이지 타이틀 */}
          <div>
            <h1 className="text-2xl font-black text-slate-900">데이터 아카이브</h1>
            <p className="text-sm text-slate-500 mt-1">
              해가 지난 과거 재무 데이터를 경량화하여 빠르게 조회할 수 있습니다.
            </p>
          </div>

          {/* 아카이브 패널 */}
          <AdminArchivePanel />
        </div>
      </main>
    </div>
  )
}
