type ProductMockupProps = { name: string; menu: string[]; screenshot?: string };

const bars = [38, 62, 48, 78, 56, 90, 70, 84];

export function ProductMockup({ name, menu, screenshot }: ProductMockupProps) {
    return (
        <figure className="relative">
            <div
                aria-hidden="true"
                className="absolute -inset-6 -z-10 rounded-full bg-product-soft blur-3xl"
            />

            <div className="overflow-hidden rounded-2xl border border-white/15 bg-deep shadow-2xl shadow-black/40">
                <div className="flex items-center gap-2 border-b border-white/10 bg-panel px-4 py-3">
                    <span className="size-2.5 rounded-full bg-white/25" />
                    <span className="size-2.5 rounded-full bg-white/25" />
                    <span className="size-2.5 rounded-full bg-white/25" />
                    <span className="ml-3 rounded-md bg-night/60 px-3 py-1 text-xs text-white/60">{name}</span>
                </div>

                {screenshot ? (
                    <img src={screenshot} alt={`Pantalla de ${name}`} className="w-full" />
                ) : (
                    <div aria-hidden="true" className="grid min-h-80 grid-cols-[9rem_1fr]">
                        <ul className="space-y-1 border-r border-white/10 p-3 text-xs">
                            {menu.map((item, i) => (
                                <li
                                    key={item}
                                    className={
                                        i === 0
                                            ? "truncate rounded-md bg-product-soft px-2 py-1.5 font-semibold text-product"
                                            : "truncate px-2 py-1.5 text-white/60"
                                    }
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <div className="space-y-4 p-4">
                            <div className="grid grid-cols-3 gap-3">
                                {[0, 1, 2].map((n) => (
                                    <div key={n} className="space-y-2 rounded-lg bg-white/5 p-3">
                                        <div className="h-2 w-10 rounded bg-white/20" />
                                        <div className="h-3 w-16 rounded bg-product-soft" />
                                    </div>
                                ))}
                            </div>

                            <div className="flex h-28 items-end gap-2 rounded-lg bg-white/5 p-3">
                                {bars.map((height, i) => (
                                    <div
                                        key={i}
                                        style={{ height: `${height}%` }}
                                        className={i === bars.length - 2 ? "flex-1 rounded-t bg-product" : "flex-1 rounded-t bg-product-soft"}
                                    />
                                ))}
                            </div>

                            <div className="space-y-2">
                                {[0, 1, 2].map((n) => (
                                    <div key={n} className="flex gap-3">
                                        <div className="h-2 flex-1 rounded bg-white/10" />
                                        <div className="h-2 w-12 rounded bg-white/20" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {!screenshot && <figcaption className="mt-3 text-center text-xs text-white/50">Vista ilustrativa</figcaption>}
        </figure>
    );
}