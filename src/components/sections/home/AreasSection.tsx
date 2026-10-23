import { Fragment } from "react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { areas } from "@/data/areas";
import type { Area } from "@/types";
import { cn } from "@/lib/cn";

const outlineOnDark = "border-white/25 text-white/80";
const softOnDark = "bg-accent/15 text-orange-200";

function IconBox({ icon: Icon, accent = false }: { icon: LucideIcon; accent?: boolean }) {
    return (
        <span
            aria-hidden="true"
            className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-xl",
                accent ? "bg-accent text-white" : "bg-field text-accent",
            )}
        >
            <Icon className="size-5" />
        </span>
    );
}

function AreaLink({ area }: { area: Area }) {
    if (!area.page) {
        return <ArrowLink to="/productos">Ver ecosistema de productos</ArrowLink>;
    }
    return (
        <ArrowLink to="/areas/$slug" params={{ slug: area.page }}>
            Explorar
        </ArrowLink>
    );
}

export function AreasSection() {
    const featured = areas.find((a) => a.slug === "saas")!;
    const others = areas.filter((a) => a.slug !== "saas");

    return (
        <section className="bg-night py-20 text-white">
            <Container>
                <div className="[&_span]:text-text-eyebrow"> {/* o [&_span]:text-accent según qué etiqueta use para el eyebrow */}
                    <SectionTitle
                        eyebrow="Nuestras áreas"
                        title="Cuatro áreas. Una misma visión de innovación."
                        description="Transformamos experiencia, conocimiento y tecnología en..."
                    />
                </div>

                {/* Navegador por pasos */}
                <nav aria-label="Áreas" className="mt-10 flex flex-wrap items-center gap-y-3">
                    {areas.map((area, i) => (
                        <Fragment key={area.slug}>
                            <a
                                href={`#area-${area.slug}`}
                                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 text-sm font-semibold transition-colors hover:border-accent"
                            >
                                <span className="text-xs text-accent">{area.number}</span>
                                {area.navLabel}
                            </a>
                            {i < areas.length - 1 && (
                                <span aria-hidden="true" className="hidden h-px w-12 bg-white/20 sm:block" />
                            )}
                        </Fragment>
                    ))}
                </nav>

                {/* Card destacada: SaaS */}
                <article
                    id={`area-${featured.slug}`}
                    className="mt-10 scroll-mt-24 overflow-hidden rounded-3xl border border-accent/70 bg-panel lg:grid lg:grid-cols-2"
                >
                    <div className="relative min-h-64">
                        <img
                            src={featured.image}
                            alt=""
                            loading="lazy"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                            {featured.highlights?.map((text, i) => (
                                <Badge
                                    key={text}
                                    variant={i === 0 ? "solid" : "overlay"}
                                    className={i === 0 ? "bg-accent text-black" : undefined}
                                >
                                    {text}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col justify-center gap-4 p-8 lg:p-10">
                        <div className="flex items-center gap-3">
                            <IconBox icon={featured.icon} accent />
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-widest text-white/60">
                                    {featured.kicker}
                                </p>
                                <h3 className="text-2xl font-bold">{featured.name}</h3>
                            </div>
                        </div>

                        <p className="text-white/70">{featured.description}</p>

                        <ul className="flex flex-wrap gap-2">
                            {featured.tags.map((tag) => (
                                <li key={tag}>
                                    <Badge className={softOnDark}>{tag}</Badge>
                                </li>
                            ))}
                        </ul>

                        <AreaLink area={featured} />
                    </div>
                </article>

                {/* Las otras tres */}
                <div className="mt-6 grid gap-6 md:grid-cols-3">
                    {others.map((area) => (
                        <article
                            key={area.slug}
                            id={`area-${area.slug}`}
                            className="flex scroll-mt-24 flex-col overflow-hidden rounded-3xl border border-white/10 bg-panel"
                        >
                            <div className="relative h-48">
                                <img src={area.image} alt="" loading="lazy" className="h-full w-full object-cover" />
                                <div className="absolute inset-0 bg-linear-to-b from-transparent to-panel" />
                            </div>

                            <div className="flex flex-1 flex-col gap-3 p-6">
                                <span className="text-xs text-white/60">{area.number}</span>

                                <div className="flex items-center gap-3">
                                    <IconBox icon={area.icon} />
                                    <h3 className="text-xl font-bold">{area.name}</h3>
                                </div>

                                <p className="text-sm text-white/70">{area.description}</p>

                                <ul className="flex flex-wrap gap-2">
                                    {area.tags.map((tag) => (
                                        <li key={tag}>
                                            <Badge variant="outline" className={outlineOnDark}>
                                                {tag}
                                            </Badge>
                                        </li>
                                    ))}
                                </ul>

                                {area.note && <p className="text-xs text-white/60">{area.note}</p>}

                                <div className="pt-2">
                                    <AreaLink area={area} />
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </Container>
        </section>
    );
}