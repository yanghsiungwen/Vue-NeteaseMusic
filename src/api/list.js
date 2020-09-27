import { loadingAxios } from '@/utils'

/**
 * 获取歌单的信息
 * @param {Number} id 歌单id值
 */
export const getListDetail = id => loadingAxios.get('playlist/detail', { params: { id } })

/**
 * 批量获取歌单歌曲
 * @param {Array} ids 歌单内歌曲的id数组
 */
export const getListSongDetail = ids => loadingAxios.get(`song/detail?ids=${ids}`)
