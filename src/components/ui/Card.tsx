import type { HTMLAttributes, ImgHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type CardProps = HTMLAttributes<HTMLDivElement> & {
    interactive?: boolean;
};

export function Card({ interactive = false, className, ...props }: CardProps) {
    return (
        <div
            className={cn("flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm", interactive && "transition duration-200 hover:-translate-y-1 hover:shadow-lg",className,)}{...props}/>
    );
}

export function CardImage({ className, alt, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img loading="lazy" alt={alt} className={cn("aspect-16/10 w-full object-cover", className)}{...props}/>
    );
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("flex flex-1 flex-col gap-4 p-6", className)} {...props} />;
}