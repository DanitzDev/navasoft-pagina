import { createFileRoute } from "@tanstack/react-router";
import { PoliciesIndex } from "@/components/sections/policies/PoliciesIndex";

export const Route = createFileRoute("/politicas/")({
  head: () => ({ meta: [{ title: "Políticas y ética · Navasoft Soluciones" }] }),
  component: PoliciesIndex,
});