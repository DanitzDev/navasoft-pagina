import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProductCard } from "@/components/sections/products/ProductCard";
import { products } from "@/data/products";

export function EcosystemSection() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <SectionTitle eyebrow="Nuestro ecosistema" title="Cinco plataformas, una misma visión." />

            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                    <ProductCard key={product.slug} product={product} />
                ))}
            </div>
        </section>
    );
}