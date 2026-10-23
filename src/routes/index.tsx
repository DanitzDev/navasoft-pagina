import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '@/components/sections/home/Hero'
import { GovernmentSection } from '@/components/sections/home/GovernmentSection'
import { AreasSection } from '@/components/sections/home/AreasSection'
import { EcosystemSection } from '@/components/sections/home/EcosystemSection'
import Timeline from '../components/sections/about/timeline/Timeline'
import InstitutionalBanner from '../components/shared/institutional-banner/InstitutionalBanner'
import { contactBanner } from '../data/site'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <>
      <Hero />
      <GovernmentSection />
      <AreasSection />
      <EcosystemSection />
      <Timeline />
      <InstitutionalBanner {...contactBanner} />
    </>
  )
}
