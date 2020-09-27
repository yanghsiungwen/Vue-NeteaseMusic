import { request } from '@/utils/axios'
// 获取热搜
export const getSearchHot = () => request.get('search/hot')

/**
 * 搜索关键字
 * @param {String} keywords 搜索关键字
 */
export const getSearchSuggest = (keywords) => request.get('search/suggest', { params: { keywords } })
