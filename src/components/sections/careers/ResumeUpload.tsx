import { useState } from 'react'
import { FileText, Upload, X } from 'lucide-react'
import { ACCEPT_ATTR, MAX_FILE_MB, formatFileSize } from '@/lib/careers'
import { cn } from '@/lib/cn'

type ResumeUploadProps = {
  file: File | null
  error?: string
  onFileChange: (file: File | null) => void
}

export function ResumeUpload({ file, error, onFileChange }: ResumeUploadProps) {
  const [dragging, setDragging] = useState(false)

  const selectFile = (next?: File) => {
    if (next) onFileChange(next)
  }

  return (
    <div>
      <p className="text-sm font-medium text-white">
        Currículum{' '}
        <span aria-hidden="true" className="text-accent">
          *
        </span>
      </p>
      <label
        onDragOver={(event) => {
          event.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault()
          setDragging(false)
          selectFile(event.dataTransfer.files[0])
        }}
        className={cn(
          'mt-2 flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed px-4 py-8 text-center transition-colors focus-within:ring-2 focus-within:ring-accent/40',
          dragging
            ? 'border-accent bg-accent/10'
            : 'border-white/25 bg-field/40 hover:border-accent',
          error && 'border-red-400',
        )}
      >
        <input
          type="file"
          name="curriculum"
          accept={ACCEPT_ATTR}
          className="sr-only"
          onChange={(event) => selectFile(event.target.files?.[0])}
        />
        <Upload aria-hidden="true" className="size-6 text-accent" />
        <span className="text-sm text-white">
          Arrastre su archivo aquí o{' '}
          <span className="font-semibold text-accent underline underline-offset-2">
            búsquelo en su equipo
          </span>
        </span>
        <span className="text-xs text-white/60">
          PDF o Word, máximo {MAX_FILE_MB} MB
        </span>
      </label>

      {file && (
        <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-field px-4 py-3 text-sm">
          <span className="flex min-w-0 items-center gap-2">
            <FileText
              aria-hidden="true"
              className="size-4 shrink-0 text-accent"
            />
            <span className="truncate">{file.name}</span>
            <span className="shrink-0 text-white/60">
              {formatFileSize(file.size)}
            </span>
          </span>
          <button
            type="button"
            aria-label="Quitar archivo"
            onClick={() => onFileChange(null)}
            className="shrink-0 rounded-md p-1 text-white/70 hover:text-white"
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        </div>
      )}
      {error && <p className="mt-1.5 text-xs text-red-300">{error}</p>}
    </div>
  )
}
