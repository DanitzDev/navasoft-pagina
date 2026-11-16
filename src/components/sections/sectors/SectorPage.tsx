import { SectorHero } from "@/components/sections/sectors/SectorHero";
import { SectorPlatforms } from "@/components/sections/sectors/SectorPlatforms";
import { SectorClients } from "@/components/sections/sectors/SectorClients";
import { SectorService } from "@/components/sections/sectors/SectorService";
import { OtherSectors } from "@/components/sections/sectors/OtherSectors";
import { SectorCta } from "@/components/sections/sectors/SectorCta";
import { ProductSideNav } from "@/components/sections/products/detail/ProductSideNav";
import type { SubnavItem } from "@/components/sections/products/detail/ProductSideNav";
import { sectorTopic } from "@/data/sectors";
import type { Sector } from "@/data/sectors";

export function SectorPage({ sector }: { sector: Sector }) {
    const items: (SubnavItem | false)[] = [
        sector.products.length > 0 && { id: "plataformas", label: "Plataformas" },
        Boolean(sector.clients?.length) && { id: "respaldo", label: "Respaldo" },
        { id: "servicios", label: "Servicio" },
        { id: "sectores", label: "Otros sectores" },
        { id: "contacto", label: "Contacto" },
    ];
    const subnav = items.filter((item): item is SubnavItem => Boolean(item));

    return (
        <div className="bg-night text-white">
            <SectorHero sector={sector} />
            <ProductSideNav items={subnav} />

            {sector.products.length > 0 && <SectorPlatforms slugs={sector.products} />}
            {sector.clients && sector.clients.length > 0 && <SectorClients clients={sector.clients} />}
            <SectorService sector={sector} />
            <OtherSectors currentSlug={sector.slug} />
            <SectorCta topic={sectorTopic(sector)} />
        </div>
    );
}
