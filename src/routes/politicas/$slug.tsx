import { createFileRoute, notFound } from "@tanstack/react-router";
import { PolicyPage } from "@/components/sections/policies/PolicyPage";
import { policies } from "@/data/policies";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/politicas/$slug")({
    // Solo valida que exista: la política tiene un icono (una función) y no puede viajar en los datos del loader
    beforeLoad: ({ params }) => {
        if (!policies.some((policy) => policy.slug === params.slug)) throw notFound();
    },
    head: ({ params }) => {
        const policy = policies.find((item) => item.slug === params.slug);
        return policy
            ? pageHead({ title: policy.shortTitle, description: policy.summary, path: `/politicas/${policy.slug}` })
            : {};
    },
    component: PolicyRoute,
});

function PolicyRoute() {
    const { slug } = Route.useParams();
    const policy = policies.find((item) => item.slug === slug)!;
    return <PolicyPage policy={policy} />;
}