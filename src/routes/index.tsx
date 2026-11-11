import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '@/components/sections/home/Hero'
import CompanyVideo from '../components/sections/home/CompanyVideo'
import { GovernmentSection } from '@/components/sections/home/GovernmentSection'
import { AreasSection } from '@/components/sections/home/AreasSection'
import { EcosystemSection } from '@/components/sections/home/EcosystemSection'
import CasesSection from '../components/sections/home/CasesSection'
import { TrustSection } from '../components/sections/home/TrustSection'
import Timeline from '../components/sections/about/timeline/Timeline'
import InstitutionalBanner from '../components/shared/institutional-banner/InstitutionalBanner'
import { contactBanner } from '../data/site'
import { pageMeta } from '@/lib/page-meta'

export const Route = createFileRoute('/')({
  head: () =>
    pageMeta({
      title: 'Navasoft Soluciones · Software para los sectores público y empresarial',
      description:
        'Desarrollamos software a la medida, plataformas SaaS e integraciones para organizaciones de los sectores público y empresarial en Costa Rica y Centroamérica.',
      path: '/',
    }),
  component: Home,
})

function Home() {
  return (
    <>
      <Hero />
      <GovernmentSection />
      <AreasSection />
      <CompanyVideo />
      <EcosystemSection />
      <CasesSection />
      <div className="bg-night">
        <Timeline className="history-section--home max-w-7xl lg:px-8" />
      </div>
      <TrustSection />
      <InstitutionalBanner {...contactBanner} />
    </>
  )
}
