import HeaderNav from '@/components/landing/HeaderNav'
import HeroSection from '@/components/landing/HeroSection'
import ThreeStepGuide from '@/components/landing/ThreeStepGuide'
import RealisticCostComparisonTable from '@/components/landing/RealisticCostComparisonTable'
import UseCasesSection from '@/components/landing/UseCasesSection'
import PricingGrid from '@/components/landing/PricingGrid'
import CompanyLegalFooter from '@/components/common/CompanyLegalFooter'
import PendingAuthRedirectHandler from '@/components/common/PendingAuthRedirectHandler'

export default function Page() {
  return (
    <main className="min-h-screen bg-[#FBFBF9]">
      <PendingAuthRedirectHandler />
      <HeaderNav />
      <HeroSection />
      <ThreeStepGuide />
      <RealisticCostComparisonTable />
      <UseCasesSection />
      <PricingGrid />
      <CompanyLegalFooter />
    </main>
  )
}
