import AdminNav from '@/components/admin/AdminNav'
import AdminInfraDetailed from '@/components/admin/AdminInfraDetailed'

export default function AdminInfraPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <AdminNav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        <AdminInfraDetailed />
      </main>
    </div>
  )
}
