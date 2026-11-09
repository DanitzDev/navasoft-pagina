import { createFileRoute } from "@tanstack/react-router";
import { SectorsIndex } from "@/components/sections/sectors/SectorsIndex";

export const Route = createFileRoute("/sectores/")({
    head: () => ({ meta: [{ title: "Sectores que impulsamos · Navasoft Soluciones" }] }),
    component: SectorsIndex,
});