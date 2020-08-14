import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 登录后获取的歌单列表
    musicList: [],
    // 单支音乐地址
    musicUrl: [],
    // 单支音乐信息
    musicMes: {
      name: '',
      picUrl: '',
      time: 0,
      artists: [],
      id: 0
    },
    // 暂停显示
    iconType: 'ios-play',
    // 正在播放
    isPlay: false,
    // 当前播放时间
    songVal: 0,
    // 歌单歌曲列表
    songsList: {},
    // 歌单列表
    tableValue: [],
    // 初次渲染的歌曲
    firstValue: [],
    // 播放列表的歌单数组
    playMenuList: [],
    // 是否展示歌词列表
    isShowPlayCover: false,
    topVal: '100%'
  },
  mutations: {
    // 获取登陆后歌单信息
    saveMusicList(state, newVal) {
      state.musicList = newVal
    },
    // 清空当前播放歌曲
    clearCurrentSong(state) {
      state.musicUrl = {}
      state.isPlay = false
    },
    // 点击单支歌曲获取音乐url
    saveSongUrl(state, url) {
      state.iconType = 'ios-pause'
      state.isPlay = true
      state.musicUrl = url
      console.log(url)
    },
    // 点击单支歌曲获取音乐详细信息
    saveSongMes(state, mes) {
      state.musicMes.name = mes.name
      state.musicMes.picUrl = mes.al.picUrl
      state.musicMes.time = mes.dt
      state.musicMes.id = mes.id
      state.musicMes.artists = mes.ar.map(item => {
        return item.name
      })
      console.log(mes)
      console.log(state.musicMes)
    },
    // 修改播放键的样式
    change(state) {
      state.iconType = state.iconType === 'ios-pause' ? 'ios-play' : 'ios-pause'
      state.isPlay = !state.isPlay
    },
    // 设置播放状态
    setPlayingState(state, playState) {
      state.isPlay = playState
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
    // 当前播放歌单的列表
    setPlayMenuList(state, newVal) {
      state.playMenuList = newVal
    },
    // 歌单基本数据
    getListMes(state, list) {
      state.songsList = list
    },
    // 获取歌单列表
    getSongList(state, list) {
      state.tableValue = []
      console.log(list)
      state.tableValue = list.map((item, i) => {
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
      // 初次渲染的歌曲列表
      state.firstValue = state.tableValue.slice(0, 10)
      console.log(state.tableValue)
    },
    // 展示播放歌词页面
    showPlayCover(state) {
      state.isShowPlayCover = !state.isShowPlayCover
      state.topVal = state.isShowPlayCover ? '64px' : '100%'
    }
  },
  actions: {
    // 异步请求单支歌曲信息
    getSong(context, id) {
      // if (context.state.musicMes.id === id) return false
      context.commit('clearCurrentSong')
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
        context.commit('getListMes', res.data.playlist)
        const trackIds = res.data.playlist.trackIds.map(({ id }) => id)
        console.log(trackIds)
        axios.get(`song/detail?ids=${trackIds}`).then(res => {
          console.log(res.data.songs)
          context.commit('getSongList', res.data.songs)
        })
      })
    }
  },
  getter: {
  }
})
