import { loadingAxios } from '@/utils'
// 获取用户信息
export const getUserDetail = uid => loadingAxios.get('user/detail', { params: { uid } })

// 获取用户歌单
export const getUserPlayList = uid => loadingAxios.get('user/playlist', { params: { uid } })

// 获取最新歌曲
export const getNewSong = () => loadingAxios.get('personalized/newsong')

/**
 * 获取推荐歌单
 * @param {Number} limit 获取歌单的数量
 */
export const getRecomList = limit => loadingAxios.get('personalized', { params: { limit } })

// 获取广告模块
export const getBannerList = () => loadingAxios.get('banner')
