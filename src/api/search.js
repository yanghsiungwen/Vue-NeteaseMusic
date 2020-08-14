import axios from 'axios'
export const getSearchHot = () => axios.get('search/hot')
export const getSearchSuggest = (keywords) => axios.get('search/suggest', { params: { keywords } })
