<template>
  <transition name="cover">
    <div class="play-cover" v-show="isShowPlayCover">
      <div class="header">
        <Icon type="ios-arrow-back" class="icon" @click="goBack" />
        <div class="album-mes">
          <p>{{musicMes.name}}</p>
          <span>{{artists}}</span>
        </div>
        <Icon type="md-share" class="icon" />
      </div>
      <div class="album-image" :class="{paused:!isPlay}">
        <img :src="musicMes.picUrl" />
      </div>
      <div class="option">
        <Icon type="md-heart" class="icon" />
        <Icon type="md-download" class="icon" />
        <div class="chat">
          <Icon type="ios-chatbubbles-outline" class="icon" />
        </div>
        <Icon type="md-more" class="icon" />
      </div>
      <audio :src="musicUrl.url" @canplay="ready" @ended="end" @timeupdate="updateTime" ref="audio"></audio>
      <div class="play-btn">
        <i class="iconfont icon-shangyishou" @click="playPreSong"></i>
        <Icon :type="iconType" @click="changeIcon" class="btn" />
        <i class="iconfont icon-xiayishou" @click="playNextSong"></i>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MobilePlayCover',
  data() {
    return {
      songReady: false,
      // 当前播放歌曲的信息,以便查找下首或上首信息
      song: [],
      nextSong: []
    }
  },
  methods: {
    goBack() {
      this.$store.commit('showPlayCover')
    },
    ready() {
      this.songReady = true
    },
    async play() {
      await this.$refs.audio.play()
    },
    pause() {
      this.$refs.audio.pause()
    },
    end() {
      this.$store.commit('change')
      this.playNextSong()
    },
    updateTime() {},
    // 点击播放暂停按钮
    changeIcon() {
      this.$store.commit('change')
    },
    // 查找当前歌曲信息
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
      if (this.nextSong) {
        this.$store.dispatch('getSong', this.nextSong.id)
        this.play()
      }
    },

    // 点击播放上一首
    playPreSong() {
      this.getSongIndex()
      this.getPreSongMes()
      if (this.nextSong) {
        this.$store.dispatch('getSong', this.nextSong.id)
        this.play()
      }
    }
  },
  computed: {
    ...mapState([
      'musicMes',
      'isShowPlayCover',
      'musicUrl',
      'isPlay',
      'iconType',
      'playMenuList'
    ]),
    artists() {
      return this.musicMes.artists.join(' / ')
    }
  },
  watch: {
    isPlay(newValue) {
      this.$nextTick(() => {
        !newValue ? this.pause() : this.play()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.play-cover {
  width: 100%;
  padding: 0 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
    .album-mes {
      text-align: center;
      p {
        font-size: 18px;
      }
      span {
        font-size: 14px;
      }
    }
  }
  .album-image {
    position: relative;
    display: inline-block;
    height: 300px;
    width: 300px;
    margin: 60px 0;
    background: #1c1d20;
    border: 10px solid #e4e0e0;
    border-radius: 50%;
    animation: rotateImg 20s linear infinite;
    // 暂停时动画停止
    &.paused {
      animation-play-state: paused;
    }
    // 封面图片
    img {
      position: absolute;
      width: 200px;
      height: 200px;
      border: 10px solid #000;
      border-radius: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .option {
    width: 100%;
    margin: 10px 0;
    display: flex;
    justify-content: space-evenly;
  }
  .play-btn {
    width: 100%;
    margin: 35px 0;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size: 28px;
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
}
.icon {
  font-size: 20px;
}
// 歌曲封面旋转动画
@keyframes rotateImg {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(1turn);
  }
}
</style>
