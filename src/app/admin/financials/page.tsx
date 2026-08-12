import AdminNav from '@/components/admin/AdminNav'
import AdminFinancialDetailed from '@/components/admin/AdminFinancialDetailed'

export default function AdminFinancialsPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <AdminNav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
        <AdminFinancialDetailed />
      </main>
    </div>
  )
}
