import { createFileRoute } from "@tanstack/react-router";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProductCard } from "@/components/sections/products/ProductCard";
import { products } from "@/data/products";

export const Route = createFileRoute("/productos/")({
  component: ProductosPage,
});

function ProductosPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionTitle
        eyebrow="Nuestro ecosistema"
        title="Transformamos años de experiencia en plataformas que generan impacto real."
        description="Cinco productos SaaS pensados para organizaciones que impulsan el desarrollo de sus comunidades."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}