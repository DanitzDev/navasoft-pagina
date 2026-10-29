import { Boxes, Building2, Receipt, Smartphone, Zap, type LucideIcon } from "lucide-react";
import type { ProductSlug } from "@/types";

export const productIcons: Record<ProductSlug, LucideIcon> = {
    gridxia: Zap,
    navastay: Building2,
    tracxia: Boxes,
    ordexia: Smartphone,
    factxia: Receipt,
};

export const productAccent: Record<ProductSlug, string> = {
    gridxia: "#d96627",
    navastay: "#d16229",
    tracxia: "#d46424", 
    ordexia: "#d36220",
    factxia: "#fb7185",
};