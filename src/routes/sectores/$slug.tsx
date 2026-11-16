import { createFileRoute, notFound } from "@tanstack/react-router";
import { SectorPage } from "@/components/sections/sectors/SectorPage";
import { sectors } from "@/data/sectors";
import { pageMeta } from "@/lib/page-meta";

export const Route = createFileRoute("/sectores/$slug")({
    // Los destinos del menú son también la lista de sectores permitidos.
    // No devuelve el sector porque tiene un icono (una función) y los datos del loader tienen que
    // poder serializarse.
    beforeLoad: ({ params }) => {
        if (!sectors.some((sector) => sector.slug === params.slug)) throw notFound();
    },
    head: ({ params }) => {
        const sector = sectors.find((item) => item.slug === params.slug);
        return pageMeta({
            title: `${sector?.name ?? "Sector"} · Navasoft Soluciones`,
            description:
                sector?.description ??
                "Soluciones tecnológicas de Navasoft para organizaciones públicas y empresariales.",
            path: `/sectores/${params.slug}`,
            image: sector?.image,
        });
    },
    component: SectorRoute,
});

function SectorRoute() {
    const { slug } = Route.useParams();
    const sector = sectors.find((item) => item.slug === slug)!;
    return <SectorPage sector={sector} />;
}
