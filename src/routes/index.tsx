import { createFileRoute } from '@tanstack/react-router'
import { Hero } from "@/components/sections/home/Hero";
import { GovernmentSection } from "@/components/sections/home/GovernmentSection";
import { AreasSection } from "@/components/sections/home/AreasSection";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <Hero />
      <GovernmentSection />
      <AreasSection />
    </section>
  )
}
