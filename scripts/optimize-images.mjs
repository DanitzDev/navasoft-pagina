import { readdir, mkdir, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const IMAGES_DIR = 'public/images'
const MANIFEST = 'src/data/image-manifest.json'
const WIDTHS = [480, 768, 1280, 1920]
const MAX_WIDTH = 1920
const QUALITY = 78
const SKIP_DIRS = new Set(['logos', 'brand']) // logos pequeños y con transparencia: no se tocan
const SOURCE = /\.(jpe?g|png|avif)$/i

async function walk(dir) {
    const entries = await readdir(dir, { withFileTypes: true })
    const nested = await Promise.all(
        entries.map(async (entry) => {
            const full = path.join(dir, entry.name)
            if (entry.isDirectory()) return SKIP_DIRS.has(entry.name) ? [] : walk(full)
            return [full]
        }),
    )
    return nested.flat()
}

const isNewer = async (output, input) => {
    try {
        return (await stat(output)).mtimeMs >= (await stat(input)).mtimeMs
    } catch {
        return false
    }
}

const kb = (bytes) => Math.round(bytes / 1024)

const files = (await walk(IMAGES_DIR)).filter((file) => SOURCE.test(file))
const manifest = {}
const report = []

for (const file of files) {
    const meta = await sharp(file).rotate().metadata()
    const maxWidth = /\.avif$/i.test(file) ? 1280 : MAX_WIDTH
    const cap = Math.min(meta.width ?? maxWidth, maxWidth)
    const widths = [...new Set([...WIDTHS.filter((width) => width < cap), cap])].sort((a, b) => a - b)

    const base = file.replace(SOURCE, '')
    for (const width of widths) {
        const output = `${base}-${width}.webp`
        if (await isNewer(output, file)) continue
        await sharp(file).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: QUALITY }).toFile(output)
    }

    // Dimensiones del original (evitan que la página "salte" mientras carga la imagen)
    const key = '/' + path.relative('public', base).split(path.sep).join('/')
    manifest[key] = { width: meta.width, height: meta.height, widths }

    const original = (await stat(file)).size
    const largest = (await stat(`${base}-${widths.at(-1)}.webp`)).size
    report.push({ archivo: path.basename(file), 'original KB': kb(original), 'WebP mayor KB': kb(largest) })
}

await mkdir(path.dirname(MANIFEST), { recursive: true })
await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')
console.table(report)
console.log(`Listo: ${files.length} imágenes procesadas. Manifiesto en ${MANIFEST}`)
