import { Boxes, Building2, Droplets, Receipt, Smartphone, type LucideIcon } from "lucide-react";
import type { ProductSlug } from "@/types";

export const productIcons: Record<ProductSlug, LucideIcon> = {
    gridxia: Droplets,
    navastay: Building2,
    tracxia: Boxes,
    ordexia: Smartphone,
    factxia: Receipt,
};

// Propuesta mía: cámbialos aquí y se actualiza toda la página del producto
export const productAccent: Record<ProductSlug, string> = {
    gridxia: "#38bdf8",
    navastay: "#a78bfa",
    tracxia: "#4ade80",
    ordexia: "#2dd4bf",
    factxia: "#fb7185",
};