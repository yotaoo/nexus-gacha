export interface EnkaPlayerData {
  uid: string
  nickname: string
  level: number
  signature?: string
  worldLevel?: number
  nameCardId?: number
  finishAchievementNum?: number
  towerFloorIndex?: number
  towerLevelIndex?: number
  avatarInfoList?: any[]
  profilePicture?: { id?: number; avatarId?: number }
}

export async function fetchGenshinPlayer(uid: string): Promise<EnkaPlayerData> {
  const res = await fetch(`https://enka.network/api/uid/${uid}`)
  if (!res.ok) throw new Error(`Joueur introuvable (${res.status})`)
  const data = await res.json()
  return {
    uid,
    nickname: data.playerInfo?.nickname || 'Inconnu',
    level: data.playerInfo?.level || 0,
    signature: data.playerInfo?.signature,
    worldLevel: data.playerInfo?.worldLevel,
    nameCardId: data.playerInfo?.nameCardId,
    finishAchievementNum: data.playerInfo?.finishAchievementNum,
    towerFloorIndex: data.playerInfo?.towerFloorIndex,
    towerLevelIndex: data.playerInfo?.towerLevelIndex,
    avatarInfoList: data.avatarInfoList || [],
    profilePicture: data.playerInfo?.profilePicture,
  }
}
