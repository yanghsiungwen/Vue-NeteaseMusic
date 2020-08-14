<!--
  歌词页播放按钮
  @author yang 2020-7-13
  @interface song/detail - 获取歌曲详细信息
  @interface song/url - 获取歌曲urNumberl地址
  @params {Number} id - 歌曲id
-->
<template>
  <div class="play-btn">
    <i class="iconfont icon-shangyishou" @click="playPreSong"></i>
    <Icon :type="iconType" @click="changeIcon" class="btn" />
    <i class="iconfont icon-xiayishou" @click="playNextSong"></i>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'PlayButton',
  data() {
    return {
      song: [] // 当前播放歌曲的信息,以便查找下首或上首信息
    }
  },
  methods: {
    changeIcon() {
      this.$store.commit('change')
    },
    // 查找当前歌曲信息
    /**
     * @return {Array} 当前播放歌曲的信息
     */
    getSongIndex() {
      // 判断播放列表是否有歌曲，并且判断是否正在播放
      if (this.playMenuList.length === 0 && this.musicUrl.length === 0) {
        this.song = []
      } else {
        // 查找正在播放歌曲的信息，获取对应的index值
        this.song = this.playMenuList.find(item => {
          return item.id === this.musicUrl.id
        })
      }
    },

    // 获取下一首歌曲信息
    /**
     * @return {Array} 当前下一首歌曲的信息
     */
    getNextSongMes() {
      if (this.song && this.song.index > this.playMenuList.length) {
        this.nextSong = []
      } else {
        // 通过当前播放的 index+1 查找下首歌曲的信息
        this.nextSong = this.playMenuList.find(item => {
          if (this.song) {
            return item.index === this.song.index + 1
          }
        })
      }
    },

    // 获取上一首歌曲信息
    /**
     * @return {Array} 当前下一首歌曲的信息
     */
    getPreSongMes() {
      if (this.song && this.song.index > this.playMenuList.length) {
        this.nextSong = []
      } else {
        // 通过当前播放的 index+1 查找下首歌曲的信息
        this.nextSong = this.playMenuList.find(item => {
          if (this.song) {
            return item.index === this.song.index - 1
          }
        })
      }
    },

    // 点击播放下首
    playNextSong() {
      this.getSongIndex()
      this.getNextSongMes()
      // 若有有下一首歌曲
      if (this.nextSong) {
        this.$store.dispatch('getSong', this.nextSong.id)
        this.$store.commit('change')
      }
    },

    // 点击播放上一首
    playPreSong() {
      this.getSongIndex()
      this.getPreSongMes()
      if (this.nextSong) {
        this.$store.dispatch('getSong', this.nextSong.id)
        this.$store.commit('change')
      }
    }
  },
  computed: {
    ...mapState(['iconType', 'playMenuList'])
  }
}
</script>

<style lang='less' scoped>
.play-btn {
  width: 100%;
  margin: 35px 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 28px;
  /* 按钮图标样式 */
  .iconfont {
    display: inline-block;
    font-size: 28px;
    color: cornflowerblue;
    cursor: pointer;
  }
  .btn {
    padding: 5px;
    background: cornflowerblue;
    color: #fff;
    border-radius: 50%;
  }
}
</style>
