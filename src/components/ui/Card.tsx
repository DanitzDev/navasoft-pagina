import { cn } from '@/lib/cn'
import type { HTMLAttributes, ImgHTMLAttributes } from 'react'
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  interactive?: boolean
}

type CardImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt" | "sizes"> & {
  src: string;
  alt: string;
  sizes?: string;
};

// Componente Card que puede ser interactivo (hover) o no
// Recibe props de HTMLAttributes y un prop adicional "interactive" para habilitar el efecto hover
export function Card({ interactive = false, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm',
        interactive &&
        'transition duration-200 hover:-translate-y-1 hover:shadow-lg',
        className,
      )}
      {...props}
    />
  )
}

// Componente CardImage que recibe props de ImgHTMLAttributes y aplica estilos específicos para la imagen dentro del Card
export function CardImage({
  className,
  src,
  alt,
  sizes = "(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw",
  ...props
}: CardImageProps) {
  return (
    <ResponsiveImage
      src={src}
      alt={alt}
      sizes={sizes}
      className={cn("aspect-16/10 w-full object-cover", className)}
      {...props}
    />
  );
}

// Componente CardContent que recibe props de HTMLAttributes y aplica estilos específicos para el contenido dentro del Card
export function CardContent({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex flex-1 flex-col gap-4 p-6', className)}
      {...props}
    />
  )
}
