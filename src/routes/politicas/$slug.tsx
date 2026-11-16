import { createFileRoute, notFound } from "@tanstack/react-router";
import { PolicyPage } from "@/components/sections/policies/PolicyPage";
import { policies } from "@/data/policies";
import { pageMeta } from "@/lib/page-meta";

export const Route = createFileRoute("/politicas/$slug")({
    // Solo valida que exista: la política tiene un icono (una función) y no puede viajar en los datos del loader
    beforeLoad: ({ params }) => {
        if (!policies.some((policy) => policy.slug === params.slug)) throw notFound();
    },
    head: ({ params }) => {
        const policy = policies.find((item) => item.slug === params.slug);
        return pageMeta({
            title: `${policy?.shortTitle ?? "Política"} · Navasoft Soluciones`,
            description:
                policy?.summary ??
                "Consulte las políticas institucionales de Navasoft Soluciones.",
            path: `/politicas/${params.slug}`,
        });
    },
    component: PolicyRoute,
});

function PolicyRoute() {
    const { slug } = Route.useParams();
    const policy = policies.find((item) => item.slug === slug)!;
    return <PolicyPage policy={policy} />;
}
