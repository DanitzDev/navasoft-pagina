import { createFileRoute } from "@tanstack/react-router";
import { PoliciesIndex } from "@/components/sections/policies/PoliciesIndex";
import { pageMeta } from "@/lib/page-meta";

export const Route = createFileRoute("/politicas/")({
  head: () =>
    pageMeta({
      title: "Políticas y ética · Navasoft Soluciones",
      description:
        "Consulte las políticas institucionales de Navasoft sobre ética, calidad, seguridad, sostenibilidad e inclusión.",
      path: "/politicas",
    }),
  component: PoliciesIndex,
});
