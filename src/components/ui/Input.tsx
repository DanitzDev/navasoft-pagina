import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    hint?: string;
    error?: string;
};

export function fieldStyles(hasError?: boolean, className?: string) { // esta función genera las clases de estilo para el input, dependiendo si hay error o no
    return cn(
        "w-full rounded-lg border bg-field px-4 py-3 text-sm text-white transition-colors",
        "placeholder:text-white/60 focus-visible:outline-none focus-visible:ring-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        hasError // si hay error, se le asigna un borde rojo y un foco rojo, si no, se le asigna un borde blanco y un foco azul
            ? "border-red-400 focus-visible:ring-red-400/40"
            : "border-white/10 focus-visible:border-accent focus-visible:ring-accent/40",
        className,
    );
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input( // esta función genera el input, con label, hint y error, y se le asigna un id único si no se le pasa uno
    { label, hint, error, id, required, className, ...props },
    ref,
) {
    const generatedId = useId(); // genera un id único para el input, para que el label y el hint se asocien correctamente con el input
    const inputId = id ?? generatedId; // si no se le pasa un id, se le asigna uno generado automáticamente
    const hintId = `${inputId}-hint`; // genera un id único para el hint, para que se asocie correctamente con el input
    const errorId = `${inputId}-error`; // genera un id único para el error, para que se asocie correctamente con el input
    const describedBy = error ? errorId : hint ? hintId : undefined;
    // si hay error, se le asigna el id del error, si no, se le asigna el id del hint, si no hay ninguno, se le asigna undefined

    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label htmlFor={inputId} className="text-sm font-medium text-white">
                    {label}
                    {required && (
                        <span aria-hidden="true" className="ml-0.5 text-accent">
                            *
                        </span>
                    )}
                </label>
            )}

            <input
                ref={ref}
                id={inputId}
                required={required}
                aria-invalid={error ? true : undefined}
                aria-describedby={describedBy}
                className={fieldStyles(!!error, className)}
                {...props}
            />

            {error ? (
                <p id={errorId} aria-live="polite" className="text-xs text-red-300"> // si hay error, se le asigna un id único y se le asigna un aria-live para que los lectores de pantalla lo lean automáticamente
                    {error}
                </p>
            ) : hint ? (
                <p id={hintId} className="text-xs text-white/70">
                    {hint}
                </p>
            ) : null}
        </div>
    );
});