import { createFileRoute, notFound } from "@tanstack/react-router";
import { SectorPage } from "@/components/sections/sectors/SectorPage";
import { sectors } from "@/data/sectors";

export const Route = createFileRoute("/sectores/$slug")({
    // Los destinos del menú son también la lista de sectores permitidos.
    // No devuelve el sector porque tiene un icono (una función) y los datos del loader tienen que
    // poder serializarse.
    beforeLoad: ({ params }) => {
        if (!sectors.some((sector) => sector.slug === params.slug)) throw notFound();
    },
    head: ({ params }) => {
        const sector = sectors.find((item) => item.slug === params.slug);
        return {
            meta: [
                { title: `${sector?.name ?? "Sector"} · Navasoft Soluciones` },
                ...(sector ? [{ name: "description", content: sector.description }] : []),
            ],
        };
    },
    component: SectorRoute,
});

function SectorRoute() {
    const { slug } = Route.useParams();
    const sector = sectors.find((item) => item.slug === slug)!;
    return <SectorPage sector={sector} />;
}