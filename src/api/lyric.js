import { request } from '@/utils'
// 获取歌词
export const getLycData = id => request.get('lyric', { params: { id } })
