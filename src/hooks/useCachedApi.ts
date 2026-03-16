import { useState, useEffect, useCallback } from 'react'

interface CacheEntry<T> {
  data: T
  timestamp: number
}

interface UseCachedApiResult<T> {
  data: T | null
  loading: boolean
  error: string | null
  refresh: () => void
}

export function useCachedApi<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlMs: number = 3600000
): UseCachedApiResult<T> {
  const [data, setData] = useState<T | null>(() => {
    try {
      const cached = localStorage.getItem(`nexus_cache_${key}`)
      if (cached) {
        const entry: CacheEntry<T> = JSON.parse(cached)
        if (Date.now() - entry.timestamp < ttlMs) return entry.data
      }
    } catch { /* ignore */ }
    return null
  })
  const [loading, setLoading] = useState(data === null)
  const [error, setError] = useState<string | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const refresh = useCallback(() => {
    localStorage.removeItem(`nexus_cache_${key}`)
    setRefreshKey((k) => k + 1)
  }, [key])

  useEffect(() => {
    let cancelled = false

    // Check cache freshness
    try {
      const cached = localStorage.getItem(`nexus_cache_${key}`)
      if (cached && refreshKey === 0) {
        const entry: CacheEntry<T> = JSON.parse(cached)
        if (Date.now() - entry.timestamp < ttlMs) {
          setData(entry.data)
          setLoading(false)
          return
        }
      }
    } catch { /* ignore */ }

    setLoading(true)
    setError(null)

    fetcher()
      .then((result) => {
        if (!cancelled) {
          setData(result)
          setLoading(false)
          try {
            const entry: CacheEntry<T> = { data: result, timestamp: Date.now() }
            localStorage.setItem(`nexus_cache_${key}`, JSON.stringify(entry))
          } catch { /* storage full, ignore */ }
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Erreur inconnue')
          setLoading(false)
        }
      })

    return () => { cancelled = true }
  }, [key, ttlMs, refreshKey]) // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error, refresh }
}
