import { Card, CardContent, CardImage } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import type { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
    return (
        <Card interactive>
            <CardImage src={product.image} alt={`Plataforma ${product.name}`} />

            <CardContent>
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                    {product.category}
                </span>

                <h3 className="text-2xl font-bold text-slate-900">{product.name}</h3>
                <p className="text-slate-600">{product.tagline}</p>

                <ul className="flex flex-wrap gap-2">
                    {product.features.map((feature) => (
                        <li
                            key={feature}
                            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                        >
                            {feature}
                        </li>
                    ))}
                </ul>

                <div className="mt-auto flex flex-wrap gap-3 pt-2">
                    <ButtonLink to="/contacto" search={{ tema: product.slug, motivo: "demo" }} size="sm">
                        Pedir demo
                    </ButtonLink>
                    <ButtonLink
                        to="/productos/$slug"
                        params={{ slug: product.slug }}
                        variant="secondary"
                        size="sm"
                    >
                        Ver plataforma
                    </ButtonLink>
                </div>
            </CardContent>
        </Card>
    );
}