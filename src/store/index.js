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
    iconType: 'ios-play',
    // 当前播放时间
    songVal: 0,
    // 歌单歌曲列表
    songsList: {},
    // 歌单列表
    tableValue: []
  },
  mutations: {
    // 点击单支歌曲获取音乐url
    saveSongUrl(state, url) {
      state.iconType = 'ios-pause'
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
      state.iconType = state.iconType === 'ios-pause' ? 'ios-play' : 'ios-pause'
    },
    // 修改播放时间
    initSongVal(state) {
      state.songVal = 0
    },
    addSongVal(state) {
      state.songVal += 1000
    },
    setSongVal(state, newVal) {
      state.songVal = newVal
    },
    // 获取歌单列表
    getSongList(state, list) {
      state.tableValue = []
      state.songsList = list
      console.log(list)
      state.tableValue = list.tracks.map((item, i) => {
        const obj = {
          id: 0,
          name: '',
          artist: '',
          album: '',
          dt: '',
          index: 0
        }
        obj.index = i
        obj.id = item.id
        obj.name = item.name
        const artist = item.ar.map(item => {
          return item.name
        })
        obj.artist = artist.join(' / ')
        obj.album = item.al.name
        const dt = item.dt / 1000
        const min = (parseInt(dt / 60) + '').padStart(2, '0')
        const sec = (parseInt(dt % 60) + '').padStart(2, '0')
        obj.dt = min + ':' + sec
        return obj
      })
      console.log(state.tableValue)
    }
  },
  actions: {
    // 异步请求单支歌曲信息
    getSong(context, id) {
      context.commit('initSongVal')
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
  getter: {
  }
})
