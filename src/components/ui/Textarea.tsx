import { forwardRef, useId, type TextareaHTMLAttributes } from "react";
import { fieldStyles } from "@/components/ui/Input";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: string;
    hint?: string;
    error?: string;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
    { label, hint, error, id, required, className, rows = 5, ...props },
    ref,
) {
    const generatedId = useId();
    const textareaId = id ?? generatedId;
    const hintId = `${textareaId}-hint`;
    const errorId = `${textareaId}-error`;
    const describedBy = error ? errorId : hint ? hintId : undefined;

    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label htmlFor={textareaId} className="text-sm font-medium text-white">
                    {label}
                    {required && (
                        <span aria-hidden="true" className="ml-0.5 text-accent">
                            *
                        </span>
                    )}
                </label>
            )}

            <textarea
                ref={ref}
                id={textareaId}
                rows={rows}
                required={required}
                aria-invalid={error ? true : undefined}
                aria-describedby={describedBy}
                className={fieldStyles(!!error, `min-h-32 resize-y ${className ?? ""}`)}
                {...props}
            />

            {error ? (
                <p id={errorId} aria-live="polite" className="text-xs text-red-300">
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