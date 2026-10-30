import { productMarkIcons } from "@/data/product-meta";
import { cn } from "@/lib/cn";
import type { ProductSlug } from "@/types";

type ProductMarkProps = {
    slug: ProductSlug;
    name: string;
    logo?: string;
    className?: string;
};

export function ProductMark({ slug, name, logo, className }: ProductMarkProps) {
    // Logo oficial aqui
    if (logo) {
        return <img src={logo} alt={`Logo de ${name}`} className={cn("h-16 w-auto shrink-0 lg:h-20", className)} />;
    }

    // Marca provisional: hexágono del color del producto con su icono
    const Icon = productMarkIcons[slug];
    const color = "var(--product, var(--color-accent))";

    return (
        <span
            role="img"
            aria-label={`Marca de ${name}`}
            className={cn("relative inline-flex aspect-100/114 h-16 shrink-0 items-center justify-center lg:h-20", className)}
        >
            <svg viewBox="0 0 100 114" aria-hidden="true" className="absolute inset-0 size-full">
                <polygon
                    points="50,6 94,31.4 94,82.2 50,107.6 6,82.2 6,31.4"
                    strokeWidth="8"
                    strokeLinejoin="round"
                    style={{ fill: color, stroke: color }}
                />
            </svg>
            <Icon aria-hidden="true" strokeWidth={2.4} className="relative size-[46%] text-white" />
        </span>
    );
}