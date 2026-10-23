import { createFileRoute } from '@tanstack/react-router'
import { Hero } from "@/components/sections/home/Hero";
import { GovernmentSection } from "@/components/sections/home/GovernmentSection";
import { AreasSection } from "@/components/sections/home/AreasSection";
import { EcosystemSection } from "@/components/sections/home/EcosystemSection";

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <section>
      <Hero />
      <GovernmentSection />
      <AreasSection />
      <EcosystemSection />
    </section>
  )
}
