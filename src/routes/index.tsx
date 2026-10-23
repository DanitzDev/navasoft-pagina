import { contactBanner } from '../data/site'
import InstitutionalBanner from '../components/shared/institutional-banner/InstitutionalBanner'
import PageHeader from '../components/shared/page-header/PageHeader'
import Timeline from '../components/sections/about/timeline/Timeline'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <>
      <PageHeader
        title="Navasoft Soluciones"
        description="Tecnología que innova."
      />
      <Timeline />
      <InstitutionalBanner {...contactBanner} />
    </>
  )
}
