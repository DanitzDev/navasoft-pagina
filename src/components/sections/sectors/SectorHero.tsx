import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ConsultButton } from "@/components/sections/products/ConsultButton";
import { sectorGroups, sectorTopic, type Sector } from "@/data/sectors";

export function SectorHero({ sector }: { sector: Sector }) {
    const Icon = sector.icon;
    const topic = sectorTopic(sector);

    return (
        <section className="relative isolate -mt-28 overflow-hidden">
            {/* Imagen de fondo y sombreado (el mismo esquema del hero del Inicio) */}
            <div aria-hidden="true" className="absolute inset-0 -z-10">
                <img src={sector.image} alt="" className="absolute inset-0 h-full w-full object-cover" />

                {/* 1. Velo general */}
                <div className="absolute inset-0 bg-night/30" />
                {/* 2. Casi sólido a la izquierda, más transparente a la derecha */}
                <div className="absolute inset-0 bg-linear-to-r from-night/95 via-night/75 to-night/35" />
                {/* 3. Oscurece la parte de arriba, detrás del navbar */}
                <div className="absolute inset-x-0 top-0 h-48 bg-linear-to-b from-night/80 to-transparent" />
                {/* 4. Se funde con la sección siguiente */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-night to-transparent" />
            </div>

            <Container className="grid items-center gap-12 pb-20 pt-44 lg:min-h-36rem lg:grid-cols-2">
                <div className="space-y-8">
                    <nav aria-label="Migas de pan" className="text-sm text-white/70">
                        <Link to="/sectores" className="hover:text-white">
                            Sectores que impulsamos
                        </Link>
                        <span aria-hidden="true"> / </span>
                        <span className="text-white">{sector.name}</span>
                    </nav>

                    <header className="space-y-5">
                        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
                            {sectorGroups[sector.group]}
                        </p>
                        <div className="flex items-center gap-5">
                            <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-accent text-white lg:size-20">
                                <Icon aria-hidden="true" className="size-8 lg:size-10" />
                            </span>
                            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">{sector.name}</h1>
                        </div>
                        <p className="text-base leading-relaxed text-white/90 sm:text-lg">{sector.intro}</p>
                    </header>

                    <div className="flex flex-wrap gap-3">
                        <ConsultButton topic={topic} motivo="reunion" variant="secondary" size="lg">
                            Solicitar reunión
                        </ConsultButton>
                        <ConsultButton topic={topic} motivo="demo" size="lg">
                            Pedir una demo
                        </ConsultButton>
                    </div>

                    <ArrowLink to="/casos-de-exito">Ver casos de éxito</ArrowLink>
                </div>

                {sector.focus.length > 0 && (
                    <aside className="rounded-3xl border border-white/15 bg-night/70 p-8 backdrop-blur-md">
                        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                            Cómo apoyamos a este sector
                        </p>
                        <ul className="mt-5 space-y-4">
                            {sector.focus.map((item) => (
                                <li key={item} className="flex items-start gap-3 text-white/90">
                                    <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-accent" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </aside>
                )}
            </Container>
        </section>
    );
}