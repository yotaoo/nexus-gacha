import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SearchInput from '@/components/ui/SearchInput'
import FilterBar, { type FilterOption } from '@/components/ui/FilterBar'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { useDebounce } from '@/hooks/useDebounce'

interface FilterConfig {
  key: string
  label: string
  options: FilterOption[]
  getItemValue: (item: any) => string
}

interface Props<T> {
  items: T[] | null
  loading: boolean
  error: string | null
  onRetry?: () => void
  filters: FilterConfig[]
  searchKey: (item: T) => string
  renderCard: (item: T) => React.ReactNode
  getItemId: (item: T) => string
  searchPlaceholder?: string
  columns?: string
}

export default function FilterableGrid<T>({
  items,
  loading,
  error,
  onRetry,
  filters,
  searchKey,
  renderCard,
  getItemId,
  searchPlaceholder = 'Rechercher...',
  columns = 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
}: Props<T>) {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 250)
  const [activeFilters, setActiveFilters] = useState<Record<string, string | null>>({})

  const filtered = useMemo(() => {
    if (!items) return []
    let result = items

    // Search filter
    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase()
      result = result.filter((item) => searchKey(item).toLowerCase().includes(q))
    }

    // Category filters
    for (const filter of filters) {
      const value = activeFilters[filter.key]
      if (value) {
        result = result.filter((item) => filter.getItemValue(item) === value)
      }
    }

    return result
  }, [items, debouncedSearch, activeFilters, filters, searchKey])

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} onRetry={onRetry} />

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3">
        <SearchInput value={search} onChange={setSearch} placeholder={searchPlaceholder} />
        {filters.map((filter) => (
          <FilterBar
            key={filter.key}
            label={filter.label}
            options={filter.options}
            selected={activeFilters[filter.key] || null}
            onSelect={(id) => setActiveFilters((prev) => ({ ...prev, [filter.key]: id }))}
          />
        ))}
      </div>

      <p className="text-xs font-heading text-manga-gray uppercase">
        {filtered.length} resultat{filtered.length !== 1 ? 's' : ''}
      </p>

      <div className={`grid ${columns} gap-3 items-stretch`}>
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => (
            <motion.div
              key={getItemId(item)}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {renderCard(item)}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && items && items.length > 0 && (
        <p className="text-center text-manga-gray font-heading py-12">
          Aucun resultat pour ces filtres.
        </p>
      )}
    </div>
  )
}
