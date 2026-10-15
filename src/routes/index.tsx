import { createFileRoute } from '@tanstack/react-router'
import { EcosystemSection } from "@/components/sections/home/EcosystemSection";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <>
      <EcosystemSection />
    </>
  );
}
