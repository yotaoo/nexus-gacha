export interface MihomoPlayerData {
  uid: string
  nickname: string
  level: number
  signature?: string
  avatar?: { id: string; name: string; icon: string }
  characters?: MihomoCharacter[]
}

export interface MihomoCharacter {
  id: string
  name: string
  rarity: number
  level: number
  rank: number
  element: { id: string; name: string; color: string; icon: string }
  path: { id: string; name: string; icon: string }
  icon: string
  light_cone?: {
    id: string
    name: string
    rarity: number
    level: number
    icon: string
  }
}

export async function fetchHsrPlayer(uid: string): Promise<MihomoPlayerData> {
  // Try mihomo.me first, then fallback
  const urls = [
    `https://api.mihomo.me/sr_info_parsed/${uid}?lang=fr`,
    `https://api.mihomo.me/sr_info/${uid}`,
  ]

  let lastError = ''
  for (const url of urls) {
    try {
      const res = await fetch(url)
      if (res.ok) {
        const data = await res.json()
        return {
          uid,
          nickname: data.player?.nickname || data.detailInfo?.nickname || 'Inconnu',
          level: data.player?.level || data.detailInfo?.level || 0,
          signature: data.player?.signature || data.detailInfo?.signature,
          avatar: data.player?.avatar,
          characters: data.characters || [],
        }
      }
      lastError = `Erreur ${res.status}`
    } catch {
      lastError = 'API indisponible'
    }
  }

  throw new Error(`Recherche HSR indisponible: ${lastError}. L'API Mihomo semble etre hors service actuellement.`)
}
