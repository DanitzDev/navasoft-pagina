import { Container } from "@/components/ui/Container";
import { ConsultButton } from "@/components/sections/products/ConsultButton";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/cn";
import type { ProductSlug } from "@/types";

export type SubnavItem = { id: string; label: string };

export function ProductSubnav({ items, topic }: { items: SubnavItem[]; topic: ProductSlug }) {
    const active = useActiveSection(items.map((item) => item.id));

    return (
        <div className="sticky top-24 z-40 border-y border-primary/40 bg-deep/90 backdrop-blur">
            <Container className="flex items-center justify-between gap-4 py-3">
                <nav aria-label="Secciones del producto" className="flex gap-1 overflow-x-auto">
                    {items.map((item) => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            aria-current={active === item.id ? "true" : undefined}
                            className={cn(
                                "shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                                active === item.id ? "bg-product-soft text-product" : "text-white/70 hover:text-white",
                            )}
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                <div className="hidden sm:block">
                    <ConsultButton topic={topic} size="sm" />
                </div>
            </Container>
        </div>
    );
}