import { Container } from "@/components/ui/Container";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/cn";

export type SubnavItem = { id: string; label: string };

export function ProductSideNav({ items }: { items: SubnavItem[] }) {
    const active = useActiveSection(items.map((item) => item.id));

    return (
        <>
            {/* Escritorio: puntos fijos al costado derecho */}
            <nav
                aria-label="Secciones del producto"
                className="fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 xl:block"
            >
                <ul className="flex flex-col gap-3">
                    {items.map((item) => {
                        const isActive = active === item.id;
                        return (
                            <li key={item.id} className="group relative flex items-center justify-end">
                                <a
                                    href={`#${item.id}`}
                                    aria-label={item.label}
                                    aria-current={isActive ? "true" : undefined}
                                    className="flex size-6 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                                >
                                    <span
                                        className={cn(
                                            "block rounded-full transition-all duration-200",
                                            isActive ? "h-6 w-1.5 bg-product" : "size-2 bg-white/40 group-hover:bg-white",
                                        )}
                                    />
                                </a>
                                <span className="pointer-events-none absolute right-9 whitespace-nowrap rounded-md bg-panel px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
                                    {item.label}
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Pantallas chicas: franja normal, sin pegarse al navbar */}
            <nav aria-label="Secciones del producto" className="border-y border-primary/40 bg-deep xl:hidden">
                <Container className="flex gap-1 overflow-x-auto py-3">
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
                </Container>
            </nav>
        </>
    );
}