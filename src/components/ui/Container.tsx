import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ContainerSize = "sm" | "md" | "lg";

type ContainerProps = HTMLAttributes<HTMLElement> & {
    as?: "div" | "section" | "header" | "footer" | "main" | "nav"; // Permite especificar el tipo de contenedor (div, section, header, footer, main, nav)
    size?: ContainerSize;
};

const sizes: Record<ContainerSize, string> = { // Define los tamaños disponibles para el contenedor
    sm: "max-w-3xl",
    md: "max-w-5xl",
    lg: "max-w-7xl",
};

// Componente Container que permite envolver contenido con un ancho máximo y centrado horizontalmente
export function Container({ as: Tag = "div", size = "lg", className, ...props }: ContainerProps) {
    return (
        <Tag // Renderiza el contenedor como el tipo de etiqueta especificado (div, section, etc.)
            className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", sizes[size], className)}
            {...props}
        />
    );
}