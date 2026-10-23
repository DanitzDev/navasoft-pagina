import { Link } from "@tanstack/react-router";
import { Boxes, Building2, Droplets, Receipt, Smartphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { EcosystemCard } from "@/components/sections/products/EcosystemCard";
import { products } from "@/data/products";
import { ecosystemStats } from "@/data/stats";

type CardLayout = {
  variant: "featured" | "stacked" | "horizontal";
  icon: LucideIcon;
  className: string;
};

// Cómo se acomoda cada producto en la grilla de 6 columnas
const layout: Partial<Record<string, CardLayout>> = {
  gridxia: { variant: "featured", icon: Droplets, className: "lg:col-span-4 lg:row-span-2" },
  navastay: { variant: "stacked", icon: Building2, className: "lg:col-span-2" },
  tracxia: { variant: "stacked", icon: Boxes, className: "lg:col-span-2" },
  ordexia: { variant: "horizontal", icon: Smartphone, className: "lg:col-span-3" },
  factxia: { variant: "horizontal", icon: Receipt, className: "lg:col-span-3" },
};

export function EcosystemSection() {
  return (
    <section className="bg-night py-20 text-white">
      <Container>
        <SectionTitle
          eyebrow="Nuestro Ecosistema"
          title="Transformamos años de experiencia en plataformas que generan impacto real."
          description="Cinco productos SaaS: Gridxia, Tracxia, Ordexia, Factxia y NavaStay. Cada solución nace de desafíos reales resueltos para organizaciones que impulsan el crecimiento y el desarrollo de nuestras comunidades."
          className="max-w-3xl"
        />

        <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {ecosystemStats.map((stat) => (
            <li key={stat.label} className="rounded-2xl border border-primary/40 bg-panel px-5 py-4">
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-white/70">{stat.label}</p>
            </li>
          ))}
        </ul>

        <div className="mt-8 grid gap-6 lg:grid-cols-6">
          {products.map((product) => {
            const config = layout[product.slug];
            if (!config) return null;
            return (
              <EcosystemCard
                key={product.slug}
                product={product}
                icon={config.icon}
                variant={config.variant}
                className={config.className}
              />
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-white/70">
          Cinco plataformas: Gridxia, Tracxia, Ordexia, Factxia y NavaStay.{" "}
          <Link to="/productos" className="font-semibold text-accent hover:text-accent-hover">
            Ver catálogo completo
          </Link>
        </p>
      </Container>
    </section>
  );
}