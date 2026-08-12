import AdminNav from '@/components/admin/AdminNav'
import AdminProjectStats from '@/components/admin/AdminProjectStats'

export default function AdminProjectsPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <AdminNav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        <AdminProjectStats />
      </main>
    </div>
  )
}
