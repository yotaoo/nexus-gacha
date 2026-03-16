import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface Props {
  children: ReactNode
  title?: string
  subtitle?: string
  className?: string
  wide?: boolean
}

export default function PageLayout({ children, title, subtitle, className, wide }: Props) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'min-h-[60vh] px-4 py-6',
        wide ? 'max-w-[1400px]' : 'max-w-7xl',
        'mx-auto',
        className
      )}
    >
      {title && (
        <div className="mb-6">
          <h1 className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight">
            <span className="bg-manga-red text-white px-3 py-1 inline-block mr-2" style={{ transform: 'skewX(-6deg)', display: 'inline-block' }}>
              <span style={{ transform: 'skewX(6deg)', display: 'inline-block' }}>{title}</span>
            </span>
          </h1>
          {subtitle && (
            <p className="mt-2 text-manga-gray text-sm">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </motion.main>
  )
}
