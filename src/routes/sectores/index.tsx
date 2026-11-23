import { createFileRoute } from "@tanstack/react-router";
import { SectorsIndex } from "@/components/sections/sectors/SectorsIndex";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/sectores/")({
    head: () =>
        pageHead({
            title: "Sectores que impulsamos",
            description:
                "Durante más de 15 años, Navasoft ha impulsado la transformación digital de instituciones públicas, empresas privadas y organizaciones que generan impacto en Costa Rica.",
            path: "/sectores",
        }),
    component: SectorsIndex,
});
