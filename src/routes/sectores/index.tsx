import { createFileRoute } from "@tanstack/react-router";
import { SectorsIndex } from "@/components/sections/sectors/SectorsIndex";
import { pageMeta } from "@/lib/page-meta";

export const Route = createFileRoute("/sectores/")({
    head: () =>
        pageMeta({
            title: "Sectores que impulsamos · Navasoft Soluciones",
            description: "Conozca cómo Navasoft transforma operaciones de organizaciones públicas y empresariales con soluciones tecnológicas adaptadas a cada sector.",
            path: "/sectores",
        }),
    component: SectorsIndex,
});
