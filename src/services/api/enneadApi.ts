import type { GameId, RedeemCode } from '@/types'

const BASE = 'https://api.ennead.cc/mihoyo'

export async function fetchCodes(game: GameId): Promise<RedeemCode[]> {
  const endpoint = game === 'genshin' ? 'genshin' : 'starrail'
  try {
    const res = await fetch(`${BASE}/${endpoint}/codes`)
    if (!res.ok) return []
    const data = await res.json()
    if (!Array.isArray(data)) return []
    return data.map((code: any) => ({
      code: code.code || '',
      rewards: Array.isArray(code.rewards) ? code.rewards : [],
      isActive: code.active !== false,
      source: code.source || '',
    }))
  } catch {
    return []
  }
}
