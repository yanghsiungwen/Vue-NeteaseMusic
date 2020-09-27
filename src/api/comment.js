import { request } from '@/utils'
// 获取评论
export const getSongComment = params => request.get('comment/music', { params: params })
// 获取相似歌曲
export const getSimiSongList = id => request.get('simi/song', { params: { id } })
