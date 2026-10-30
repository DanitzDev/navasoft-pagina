import type { CSSProperties } from "react";
import { Link } from "@tanstack/react-router";
import { Container } from "@/components/ui/Container";
import { IconBox } from "@/components/ui/IconBox";
import { products } from "@/data/products";
import { productAccent, productIcons } from "@/data/product-meta";
import { productDetails } from "#/data/product-details";
import type { ProductSlug } from "@/types";

export function EcosystemRest({ current }: { current: ProductSlug }) {
    const others = products.filter((product) => product.slug !== current);

    return (
        <section className="py-20">
            <Container>
                <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                    El resto del ecosistema
                </p>

                <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {others.map((product) => {
                        const Icon = productIcons[product.slug];
                        const meta = productDetails[product.slug].ecosystem;

                        return (
                            <li key={product.slug} style={{ "--product": productAccent[product.slug] } as CSSProperties}>
                                <Link
                                    to="/productos/$slug"
                                    params={{ slug: product.slug }}
                                    className="group flex h-full flex-col gap-3 rounded-2xl border border-white/10 bg-panel p-5 transition duration-200 hover:-translate-y-1 hover:border-product"
                                >
                                    <p className="text-[11px] font-semibold uppercase tracking-widest text-white/60">
                                        {meta.kicker}
                                    </p>
                                    <div className="flex items-center gap-2.5">
                                        <IconBox icon={Icon} size="sm" className="bg-product-soft text-product" />
                                        <h3 className="text-lg font-bold">{product.name}</h3>
                                    </div>
                                    <p className="text-sm text-white/70">{meta.blurb}</p>
                                    <span className="mt-auto text-sm font-semibold text-accent">
                                        Ver plataforma{" "}
                                        <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">
                                            →
                                        </span>
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </Container>
        </section>
    );
}