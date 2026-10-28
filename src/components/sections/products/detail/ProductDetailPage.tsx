import type { CSSProperties } from "react";
import { ProductHero } from "@/components/sections/products/detail/ProductHero";
import { ProductSideNav, type SubnavItem } from "@/components/sections/products/detail/ProductSideNav"; import { ProblemSection } from "@/components/sections/products/detail/ProblemSection";
import { CapabilitiesSection } from "@/components/sections/products/detail/CapabilitiesSection";
import { StepsSection } from "@/components/sections/products/detail/StepsSection";
import { FaqSection } from "@/components/sections/products/detail/FaqSection";
import { EcosystemRest } from "@/components/sections/products/detail/EcosystemRest";
import { ProductCta } from "@/components/sections/products/detail/ProductCta";
import { productAccent } from "@/data/product-meta";
import { productDetails } from "@/data/product-details";
import type { Product } from "@/types";

export function ProductDetailPage({ product }: { product: Product }) {
    const detail = productDetails[product.slug];

    const items: (SubnavItem | false | undefined)[] = [
        detail.problem && { id: "problema", label: "Problema" },
        detail.capabilities && { id: "capacidades", label: "Capacidades" },
        detail.steps && { id: "como-funciona", label: "Cómo funciona" },
        detail.faqs && { id: "preguntas", label: "Preguntas" },
        { id: "demo", label: "Demo" },
    ];
    const subnav = items.filter((item): item is SubnavItem => Boolean(item));

    return (
        <div style={{ "--product": productAccent[product.slug] } as CSSProperties} className="bg-night text-white">
            <ProductHero product={product} detail={detail} />
            <ProductSideNav items={subnav} />

            {detail.problem && <ProblemSection name={product.name} problem={detail.problem} />}
            {detail.capabilities && <CapabilitiesSection name={product.name} capabilities={detail.capabilities} />}
            {detail.steps && <StepsSection name={product.name} steps={detail.steps} />}
            {detail.faqs && <FaqSection faqs={detail.faqs} />}

            <EcosystemRest current={product.slug} />
            <ProductCta name={product.name} slug={product.slug} />
        </div>
    );
}