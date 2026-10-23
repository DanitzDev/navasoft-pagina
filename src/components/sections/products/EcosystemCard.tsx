import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { IconBox } from "@/components/ui/IconBox";
import type { Product } from "@/types";
import { cn } from "@/lib/cn";

type EcosystemCardProps = {
    product: Product;
    icon: LucideIcon;
    variant: "featured" | "stacked" | "horizontal";
    className?: string;
};

const card = "overflow-hidden rounded-3xl border border-white/10 bg-panel text-white";

function Kicker({ children }: { children: string }) {
    return (
        <p className="text-[11px] font-semibold uppercase tracking-widest text-white/60">{children}</p>
    );
}

function Title({ name, icon }: { name: string; icon: LucideIcon }) {
    return (
        <div className="flex items-center gap-2.5">
            <IconBox icon={icon} size="sm" className="text-slate-300" />
            <h3 className="text-xl font-bold">{name}</h3>
        </div>
    );
}

function Features({ items }: { items: string[] }) {
    return (
        <ul className="flex flex-wrap gap-2">
            {items.map((item) => (
                <li key={item}>
                    <Badge variant="outline" className="border-white/25 text-white/80">
                        {item}
                    </Badge>
                </li>
            ))}
        </ul>
    );
}

function DemoButton() {
    return (
        <ButtonLink to="/contacto" search={{ motivo: "demo" }} size="sm">
            Pedir demo
        </ButtonLink>
    );
}

export function EcosystemCard({ product, icon, variant, className }: EcosystemCardProps) {
    const description = [product.tagline, product.detail].filter(Boolean).join(" ");

    if (variant === "featured") {
        return (
            <article
                className={cn(card, "relative isolate flex min-h-28rem flex-col justify-end", className)}
            >
                <img
                    src={product.image}
                    alt={`Plataforma ${product.name}`}
                    loading="lazy"
                    className="absolute inset-0 -z-10 h-full w-full object-cover"
                />
                <div className="absolute inset-0 -z-10 bg-linear-to-t from-panel from-40% via-panel/85 via-60% to-transparent" />

                <Badge variant="solid" className="absolute left-4 top-4 bg-accent text-black">
                    {product.category}
                </Badge>

                <div className="flex flex-col gap-3 p-6 lg:p-8">
                    <Title name={product.name} icon={icon} />
                    <p className="text-sm text-white">{product.tagline}</p>
                    {product.detail && <p className="text-sm text-white/70">{product.detail}</p>}
                    <Features items={product.features} />
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                        <DemoButton />
                        <ButtonLink
                            to="/productos/$slug"
                            params={{ slug: product.slug }}
                            variant="outline"
                            size="sm"
                        >
                            Conocer {product.name} →
                        </ButtonLink>
                    </div>
                </div>
            </article>
        );
    }

    if (variant === "stacked") {
        return (
            <article className={cn(card, "flex flex-col", className)}>
                <div className="relative h-44 shrink-0">
                    <img
                        src={product.image}
                        alt={`Plataforma ${product.name}`}
                        loading="lazy"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-panel to-transparent" />
                </div>

                <div className="flex flex-1 flex-col gap-3 p-5">
                    <Kicker>{product.category}</Kicker>
                    <Title name={product.name} icon={icon} />
                    <p className="text-sm text-white/75">{description}</p>
                    <Features items={product.features} />
                    <div className="mt-auto flex flex-wrap items-center gap-4 pt-2">
                        <DemoButton />
                        <ArrowLink to="/productos/$slug" params={{ slug: product.slug }}>
                            Ver plataforma
                        </ArrowLink>
                    </div>
                </div>
            </article>
        );
    }

    return (
        <article className={cn(card, "flex flex-col sm:flex-row", className)}>
            <div className="relative h-44 shrink-0 sm:h-auto sm:w-2/5">
                <img
                    src={product.image}
                    alt={`Plataforma ${product.name}`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-panel/80 to-transparent sm:bg-linear-to-r sm:from-transparent sm:to-panel/60" />
            </div>

            <div className="flex flex-1 flex-col gap-3 p-5">
                <Kicker>{product.category}</Kicker>
                <Title name={product.name} icon={icon} />
                <p className="text-sm text-white/75">{description}</p>
                <Features items={product.features} />
                <div className="mt-auto flex flex-wrap items-center gap-4 pt-2">
                    <DemoButton />
                    <ArrowLink to="/productos/$slug" params={{ slug: product.slug }}>
                        Ver plataforma
                    </ArrowLink>
                </div>
            </div>
        </article>
    );
}
