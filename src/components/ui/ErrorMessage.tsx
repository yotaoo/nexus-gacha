import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
  message: string
  onRetry?: () => void
}

export default function ErrorMessage({ message, onRetry }: Props) {
  return (
    <div className="manga-card p-6 text-center max-w-md mx-auto">
      <AlertTriangle size={32} className="text-manga-red mx-auto mb-3" />
      <p className="font-heading font-bold text-sm mb-4">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="manga-btn manga-btn-outline">
          <span className="inline-flex items-center gap-2">
            <RefreshCw size={14} /> Reessayer
          </span>
        </button>
      )}
    </div>
  )
}
