import HeaderNav from '@/components/landing/HeaderNav'
import HeroSection from '@/components/landing/HeroSection'
import MandatoryPwaTransparencyNotice from '@/components/landing/MandatoryPwaTransparencyNotice'
import RealisticCostComparisonTable from '@/components/landing/RealisticCostComparisonTable'
import BlockShowcase from '@/components/landing/BlockShowcase'
import PricingGrid from '@/components/landing/PricingGrid'
import CompanyLegalFooter from '@/components/common/CompanyLegalFooter'

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <HeaderNav />
      <HeroSection />
      <MandatoryPwaTransparencyNotice />
      <RealisticCostComparisonTable />
      <BlockShowcase />
      <PricingGrid />
      <CompanyLegalFooter />
    </main>
  )
}
