import AdminNav from '@/components/admin/AdminNav'
import AdminSubmissionStats from '@/components/admin/AdminSubmissionStats'

export default function AdminSubmissionsPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <AdminNav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        <AdminSubmissionStats />
      </main>
    </div>
  )
}
