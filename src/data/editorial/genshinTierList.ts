import type { TierEntry } from '@/types'
import { getGenshinCharacterIcon } from '@/services/api/genshinApi'

function e(id: string, icon: string, name: string, tier: TierEntry['tier'], role?: string): TierEntry {
  return { id, name, imageUrl: getGenshinCharacterIcon(id, icon), tier, role }
}

export const GENSHIN_TIER_LIST: TierEntry[] = [
  // SS
  e('10000089', 'UI_AvatarIcon_Furina', 'Furina', 'SS', 'Support'),
  e('10000073', 'UI_AvatarIcon_Nahida', 'Nahida', 'SS', 'Sub DPS'),
  e('10000047', 'UI_AvatarIcon_Kazuha', 'Kazuha', 'SS', 'Support'),
  e('10000032', 'UI_AvatarIcon_Bennett', 'Bennett', 'SS', 'Support'),
  e('10000023', 'UI_AvatarIcon_Xiangling', 'Xiangling', 'SS', 'Sub DPS'),
  // S
  e('10000052', 'UI_AvatarIcon_Shougun', 'Shogun Raiden', 'S', 'Main DPS'),
  e('10000060', 'UI_AvatarIcon_Yelan', 'Yelan', 'S', 'Sub DPS'),
  e('10000025', 'UI_AvatarIcon_Xingqiu', 'Xingqiu', 'S', 'Sub DPS'),
  e('10000030', 'UI_AvatarIcon_Zhongli', 'Zhongli', 'S', 'Support'),
  e('10000087', 'UI_AvatarIcon_Neuvillette', 'Neuvillette', 'S', 'Main DPS'),
  e('10000078', 'UI_AvatarIcon_Alhatham', 'Alhaitham', 'S', 'Main DPS'),
  e('10000046', 'UI_AvatarIcon_Hutao', 'Hu Tao', 'S', 'Main DPS'),
  // A
  e('10000031', 'UI_AvatarIcon_Fischl', 'Fischl', 'A', 'Sub DPS'),
  e('10000054', 'UI_AvatarIcon_Kokomi', 'Kokomi', 'A', 'Support'),
  e('10000002', 'UI_AvatarIcon_Ayaka', 'Kamisato Ayaka', 'A', 'Main DPS'),
  e('10000037', 'UI_AvatarIcon_Ganyu', 'Ganyu', 'A', 'Main DPS'),
  e('10000043', 'UI_AvatarIcon_Sucrose', 'Sucrose', 'A', 'Support'),
  e('10000041', 'UI_AvatarIcon_Mona', 'Mona', 'A', 'Sub DPS'),
  // B
  e('10000016', 'UI_AvatarIcon_Diluc', 'Diluc', 'B', 'Main DPS'),
  e('10000003', 'UI_AvatarIcon_Qin', 'Jean', 'B', 'Support'),
  e('10000033', 'UI_AvatarIcon_Tartaglia', 'Tartaglia', 'B', 'Main DPS'),
  e('10000042', 'UI_AvatarIcon_Keqing', 'Keqing', 'B', 'Main DPS'),
  // C
  e('10000035', 'UI_AvatarIcon_Qiqi', 'Qiqi', 'C', 'Support'),
  e('10000044', 'UI_AvatarIcon_Xinyan', 'Xinyan', 'C', 'Support'),
  e('10000021', 'UI_AvatarIcon_Ambor', 'Amber', 'C', 'Sub DPS'),
]
