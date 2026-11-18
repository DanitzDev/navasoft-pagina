import { createFileRoute } from "@tanstack/react-router";
import { PoliciesIndex } from "@/components/sections/policies/PoliciesIndex";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/politicas/")({
  head: () =>
    pageHead({
      title: "Políticas y ética",
      description:
        "Los compromisos de Navasoft en sostenibilidad ambiental, igualdad, inclusión y diversidad, con un resumen y el documento completo de cada política.",
      path: "/politicas",
    }), component: PoliciesIndex,
});