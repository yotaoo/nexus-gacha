export default function LoadingSpinner({ text = 'Chargement...' }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-3 border-manga-ink border-t-manga-red rounded-full animate-spin" />
      </div>
      <p className="font-heading font-bold text-sm uppercase tracking-wider text-manga-gray">
        {text}
      </p>
    </div>
  )
}
