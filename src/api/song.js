import { request, loadingAxios } from '@/utils'

/**
 * 获取歌曲地址
 * @param {Number} id 歌曲id值
 */
export const getSongUrl = id => loadingAxios.get('song/url', { params: { id } })

/**
 * 获取歌曲的信息
 * @param {Number} id 歌曲id值
 */
export const getSongDetail = id => loadingAxios.get('song/detail', { params: { ids: id } })

/**
 * 获取歌曲的信息
 * @param {Number} id 歌曲id值
 */
export const getLyric = id => request.get('lyric', { params: { id } })
