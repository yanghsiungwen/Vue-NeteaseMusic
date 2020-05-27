import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 单支音乐地址
    musicUrl: [],
    // 单支音乐信息
    musicMes: {
      name: '',
      picUrl: '',
      time: 0,
      artists: []
    },
    // 暂停显示
    change: true,
    iconType: 'ios-play',
    // 歌单歌曲列表
    songsList: {}
  },
  mutations: {
    // 点击单支歌曲获取音乐url
    saveSongUrl(state, url) {
      state.musicUrl = url
      console.log(url)
    },
    // 点击单支歌曲获取音乐详细信息
    saveSongMes(state, mes) {
      state.musicMes.name = mes.name
      state.musicMes.picUrl = mes.al.picUrl
      state.musicMes.time = mes.dt
      state.musicMes.artists = mes.ar.map(item => {
        return item.name
      })
      console.log(mes)
      console.log(state.musicMes)
    },
    // 修改播放键的样式
    change(state) {
      state.change = !state.change
      state.iconType = state.change ? 'ios-play' : 'ios-pause'
    },
    // 获取歌单列表
    getSongList(state, list) {
      state.songsList = list
      console.log(list)
    }
  },
  actions: {
    // 异步请求单支歌曲信息
    getSong(context, id) {
      axios.get('song/url', { params: { id } }).then(res => {
        console.log(res)
        context.commit('saveSongUrl', res.data.data[0])
      })
      axios.get('song/detail', { params: { ids: id } }).then(res => {
        console.log(res)
        context.commit('saveSongMes', res.data.songs[0])
      })
    },
    // 异步请求歌单信息
    asyncGetSongList(context, id) {
      axios.get('playlist/detail', { params: { id } }).then(res => {
        console.log(res)
        context.commit('getSongList', res.data.playlist)
      })
    }
  },
  modules: {
  }
})
