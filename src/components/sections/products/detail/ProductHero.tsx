import { Link } from "@tanstack/react-router";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { ConsultButton } from "@/components/sections/products/ConsultButton";
import { ProductMark } from "@/components/sections/products/detail/ProductMark";
import { ProductMockup } from "@/components/sections/products/detail/ProductMockup";
import type { Product, ProductDetail } from "@/types";

function HeroPhoto({ src, alt }: { src: string; alt: string }) {
    return (
        <figure className="relative">
            <div aria-hidden="true" className="absolute -inset-6 -z-10 rounded-full bg-product-soft blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-panel shadow-2xl shadow-black/40">
                <img src={src} alt={alt} className="aspect-4/3 w-full object-cover" />
                <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-linear-to-t from-night/60 via-transparent to-transparent"
                />
            </div>
        </figure>
    );
}

export function ProductHero({ product, detail }: { product: Product; detail: ProductDetail }) {
    const kicker = detail.kicker ?? detail.ecosystem.kicker;
    const description =
        detail.heroTagline ?? [product.tagline, product.detail].filter(Boolean).join(" ");
    const menu = (detail.mockupMenu ?? detail.capabilities?.map((c) => c.title) ?? product.features).slice(0, 5);
    const name = product.name.toUpperCase();

    return (
        <section className="relative isolate -mt-28 overflow-hidden pb-20 pt-40">
            <div
                aria-hidden="true"
                className="absolute inset-0 -z-10"
                style={{
                    background:
                        "radial-gradient(60% 60% at 80% 15%, color-mix(in oklab, var(--product) 28%, transparent), transparent)",
                }}
            />

            <Container className="grid items-center gap-12 lg:grid-cols-2">
                <div className="space-y-8">
                    <nav aria-label="Migas de pan" className="text-sm text-white/60">
                        <Link to="/productos" className="hover:text-white">
                            Productos
                        </Link>
                        <span aria-hidden="true"> / </span>
                        <span className="text-white">{product.name}</span>
                    </nav>

                    <header className="max-w-3xl space-y-5">
                        <p className="text-sm font-semibold uppercase tracking-widest text-accent">{kicker}</p>

                        <div className="flex items-center gap-5">
                            <ProductMark slug={product.slug} name={product.name} logo={detail.logo} />
                            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">{name}</h1>
                        </div>

                        <p className="text-base leading-relaxed text-slate-300 sm:text-lg">{description}</p>
                    </header>

                    <ul className="flex flex-wrap gap-2">
                        {product.features.slice(0, 3).map((feature) => (
                            <li key={feature}>
                                <Badge variant="outline" size="md" className="border-product text-white/90">
                                    {feature}
                                </Badge>
                            </li>
                        ))}
                    </ul>

                    <div className="flex flex-wrap gap-3">
                        <ConsultButton topic={product.slug} motivo="demo" size="lg">
                            Pedir demo de {name}
                        </ConsultButton>
                        <ConsultButton topic={product.slug} motivo="reunion" variant="secondary" size="lg">
                            Solicitar reunión
                        </ConsultButton>
                    </div>
                </div>

                {detail.heroVisual === "mockup" ? (
                    <ProductMockup name={product.name} menu={menu} device={detail.mockupDevice} />
                ) : (
                    <HeroPhoto src={detail.heroImage ?? product.image} alt={`Plataforma ${product.name}`} />
                )}
            </Container>
        </section>
    );
}