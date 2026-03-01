import { useCallback } from 'react'
import { formatFileSize } from '../lib/hash'

interface FileUploadProps {
  file: File | null
  hash: `0x${string}` | null
  isHashing: boolean
  error: string | null
  onFileSelect: (file: File) => void
  onReset: () => void
  disabled?: boolean
}

export function FileUpload({
  file,
  hash,
  isHashing,
  error,
  onFileSelect,
  onReset,
  disabled,
}: FileUploadProps) {
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      if (disabled) return
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile) {
        onFileSelect(droppedFile)
      }
    },
    [disabled, onFileSelect]
  )
  
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0]
      if (selectedFile) {
        onFileSelect(selectedFile)
      }
    },
    [onFileSelect]
  )
  
  if (file && hash) {
    return (
      <div className="border border-primary-200 bg-primary-50 p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-x8-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium text-x8-dark">File Ready</span>
            </div>
            <p className="text-sm text-x8-dark truncate mb-1">{file.name}</p>
            <p className="text-xs text-x8-gray mb-3">{formatFileSize(file.size)}</p>
            <div className="bg-white p-3 border border-x8-border">
              <p className="text-xs text-x8-gray mb-1">SHA-256 Hash</p>
              <p className="text-xs font-mono text-x8-dark break-all">{hash}</p>
            </div>
          </div>
          <button
            onClick={onReset}
            disabled={disabled}
            className="ml-4 text-x8-gray hover:text-x8-dark disabled:opacity-50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    )
  }
  
  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className={`border-2 border-dashed p-8 text-center transition-colors ${
        disabled
          ? 'border-x8-border bg-x8-gray-light cursor-not-allowed'
          : 'border-x8-border hover:border-x8-gold hover:bg-primary-50 cursor-pointer'
      }`}
    >
      <input
        type="file"
        onChange={handleChange}
        disabled={disabled}
        className="hidden"
        id="file-upload"
      />
      <label
        htmlFor="file-upload"
        className={disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
      >
        {isHashing ? (
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 border-4 border-primary-100 border-t-x8-gold animate-spin mb-4" />
            <p className="text-x8-gray">Computing hash...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center">
            <svg className="w-10 h-10 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-600 mb-2">{error}</p>
            <p className="text-sm text-x8-gray">Click to try again</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <svg className="w-10 h-10 text-x8-border mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-x8-dark mb-2">Drag and drop your file here</p>
            <p className="text-sm text-x8-gray">or click to browse</p>
          </div>
        )}
      </label>
    </div>
  )
}
