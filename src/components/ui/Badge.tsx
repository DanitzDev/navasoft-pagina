import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type BadgeVariant = "soft" | "outline" | "solid" | "overlay";
type BadgeSize = "sm" | "md";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
    variant?: BadgeVariant;
    size?: BadgeSize;
};

const base = "inline-flex items-center gap-1.5 rounded-full font-medium whitespace-nowrap";

const variants: Record<BadgeVariant, string> = {
    soft: "font-montserratregular bg-slate-100 text-slate-700",
    outline: "font-montserratregular font-normal border border-primary text-slate-300",
    solid: "font-montserratregular bg-primary text-white",
    overlay: "font-montserratregular border border-white/25 bg-white/15 text-white backdrop-blur-sm",
};

const sizes: Record<BadgeSize, string> = {
    sm: "px-3 py-1 text-xs",
    md: "px-4 py-1.5 text-sm",
};

// recibe variant y size, y se le asigna un valor por defecto
export function Badge({ variant = "soft", size = "sm", className, ...props }: BadgeProps) {
    return <span className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}

// Si se va a colocar en imagen el contenedor necesita relative 