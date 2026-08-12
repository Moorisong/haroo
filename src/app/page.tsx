import HeaderNav from '@/components/landing/HeaderNav'
import HeroSection from '@/components/landing/HeroSection'
import ThreeStepGuide from '@/components/landing/ThreeStepGuide'
import RealisticCostComparisonTable from '@/components/landing/RealisticCostComparisonTable'
import UseCasesSection from '@/components/landing/UseCasesSection'
import MandatoryPwaTransparencyNotice from '@/components/landing/MandatoryPwaTransparencyNotice'
import BlockShowcase from '@/components/landing/BlockShowcase'
import PricingGrid from '@/components/landing/PricingGrid'
import CompanyLegalFooter from '@/components/common/CompanyLegalFooter'

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <HeaderNav />
      <HeroSection />
      <ThreeStepGuide />
      <RealisticCostComparisonTable />
      <UseCasesSection />
      <MandatoryPwaTransparencyNotice />
      <BlockShowcase />
      <PricingGrid />
      <CompanyLegalFooter />
    </main>
  )
}
