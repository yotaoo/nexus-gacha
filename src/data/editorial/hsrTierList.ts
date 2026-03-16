import type { TierEntry } from '@/types'
import { getHsrCharacterIcon } from '@/services/api/hsrApi'

function e(id: string, name: string, tier: TierEntry['tier'], role?: string): TierEntry {
  return { id, name, imageUrl: getHsrCharacterIcon(id), tier, role }
}

export const HSR_TIER_LIST: TierEntry[] = [
  // SS
  e('1310', 'Firefly', 'SS', 'DPS'),
  e('1303', 'Ruan Mei', 'SS', 'Support'),
  e('1217', 'Huohuo', 'SS', 'Abundance'),
  e('1306', 'Sparkle', 'SS', 'Support'),
  e('1308', 'Acheron', 'SS', 'DPS'),
  // S
  e('1302', 'Argenti', 'S', 'DPS'),
  e('1305', 'Dr. Ratio', 'S', 'DPS'),
  e('1208', 'Fu Xuan', 'S', 'Preservation'),
  e('1006', 'Argent Cavalier', 'S', 'DPS'),
  e('1102', 'Seele', 'S', 'DPS'),
  e('1009', 'Asta', 'S', 'Support'),
  // A
  e('1205', 'Blade', 'A', 'DPS'),
  e('1101', 'Bronya', 'A', 'Support'),
  e('1202', 'Tingyun', 'A', 'Support'),
  e('1203', 'Luocha', 'A', 'Abundance'),
  e('1104', 'Gepard', 'A', 'Preservation'),
  // B
  e('1001', 'Mars 7e', 'B', 'Preservation'),
  e('1002', 'Dan Heng', 'B', 'DPS'),
  e('1003', 'Himeko', 'B', 'DPS'),
  // C
  e('1008', 'Arlan', 'C', 'DPS'),
  e('1105', 'Natasha', 'C', 'Abundance'),
]
