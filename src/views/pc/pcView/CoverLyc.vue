<!--
  歌词模块
  @interface /lyric 获取歌词
-->
<template>
  <div>
    <!-- 播放页面的上部分 -->
    <div class="songMes">
      <!-- 左侧歌曲封面旋转 -->
      <div class="cover">
        <img class="play-bar-support" src="@/assets/img/play-bar-support.png" alt />
        <img class="play-bar" :class="{paused:!isPlay}" src="@/assets/img/play-bar.png" alt />
        <div class="coverImg" :class="{paused:!isPlay}">
          <img :src="musicMes.picUrl" alt />
        </div>
      </div>
      <!-- 右侧歌词部分 -->
      <div class="lyc">
        <div class="content">
          <div class="songName">
            <p class="name">{{musicMes.name}}</p>
          </div>

          <div class="artist">
            <span class="label">歌手:</span>
            <span class="name">{{musicMes.artists.join(' / ')}}</span>
          </div>

          <empty v-if="nolyric">还没有歌词哦~</empty>
          <div class="box" ref="scroller" v-else>
            <div class="lyric-item" v-for="( item, i) in lyric" :key="i" :class="getActiveCls(i)">
              <p class="lyric-text">{{item.content}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getLycData } from '@/api'
export default {
  name: 'coverLyc',
  data() {
    return {
      nolyric: false,
      lyric: [],
    }
  },
  computed: {
    ...mapState(['musicMes', 'isShowPlayCover', 'isPlay', 'songVal']),
    id() {
      return this.musicMes.id
    },
    // 当前歌词的位置
    activeLyricIndex() {
      return this.lyric
        ? this.lyric.findIndex((l, index) => {
            const nextLyric = this.lyric[index + 1]
            return (
              this.songVal >= l.time * 1000 &&
              (nextLyric ? this.songVal < nextLyric.time * 1000 : true)
            )
          })
        : -1
    },
  },
  mounted() {
    this.getLyric()
  },
  watch: {
    // 当 id 改变时，获取当前歌词
    id() {
      this.getLyric()
    },
    songVal() {
      // window.setInterval(this.lycScrolling, 10000)
      // const that = this
      // const timerId = setTimeout(() => {
      //   if (this.songVal > this.musicMes.time) {
      //     clearTimeout(timerId)
      //     this.$refs.scroller.scrollTo({
      //       top: 0,
      //       behavior: 'smooth'
      //     })
      //   }
      //   this.lycScrolling()
      // }, (this.lyric[3].time - 2) * 1000)
    },
  },
  methods: {
    // 获取歌词信息
    async getLyric() {
      const { data: res } = await getLycData(this.musicMes.id)
      console.log(res)
      this.lyric = this.parseLyric(res.lrc.lyric)
      console.log(this.lyric)
    },
    // 对歌词进行处理
    parseLyric(lrc) {
      const lyrics = lrc.split('\n')
      const lrcObj = []
      for (let i = 0; i < lyrics.length; i++) {
        const lyric = decodeURIComponent(lyrics[i])
        const timeReg = /\[\d*:\d*((\.|:)\d*)*\]/g
        const timeRegExpArr = lyric.match(timeReg)
        if (!timeRegExpArr) continue
        const content = lyric.replace(timeReg, '')
        for (let k = 0, h = timeRegExpArr.length; k < h; k++) {
          const t = timeRegExpArr[k]
          const min = Number(String(t.match(/\[\d*/i)).slice(1))
          const sec = Number(String(t.match(/:\d*/i)).slice(1))
          const time = min * 60 + sec
          if (content !== '') {
            lrcObj.push({ time: time, content })
          }
        }
      }
      return lrcObj
    },
    // 对正在播放歌词高亮
    getActiveCls(index) {
      return this.activeLyricIndex === index ? 'active' : ''
    },
    // 歌词滚动
    lycScrolling() {
      this.$nextTick(() => {
        this.$refs.scroller.scrollBy({
          top: 7,
          behavior: 'smooth',
        })
      })
    },
  },
}
</script>

<style lang="less" scoped>
// 歌曲封面旋转动画
@keyframes rotateImg {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(1turn);
  }
}

/* 歌词封面 */
.songMes {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 50px;
  // 专辑图片
  .cover {
    position: relative;
    // 顶上播放棒的点点
    .play-bar-support {
      position: absolute;
      width: 32px;
      height: 32px;
      top: -105px;
      left: 50%;
      transform: translate(-50%);
      z-index: 2;
    }
    // 播放条的丁丁
    .play-bar {
      position: absolute;
      height: 170px;
      top: -106px;
      left: 47%;
      z-index: 1;
      transform-origin: top;
      transition: all 0.5s;
      &.paused {
        transform: rotate(-30deg);
      }
    }
    // 歌曲封面
    .coverImg {
      position: relative;
      display: inline-block;
      height: 300px;
      width: 300px;
      background: #1c1d20;
      border: 10px solid #e4e0e0;
      border-radius: 50%;
      animation: rotateImg 30s linear infinite;
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
  }
  // 歌词区域
  .lyc {
    height: 450px;
    width: 400px;
    margin-left: 100px;
    overflow: hidden;
    .content {
      text-align: center;
      overflow: hidden;
      .songName {
        height: 40px;
        font-size: 24px;
        margin: 10px 0 0 0;
        p {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }

      .artist {
        height: 24px;
        font-size: 16px;
        margin: 5px 0 20px 0;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        .name {
          margin-left: 10px;
        }
      }
      .box {
        height: 380px;
        padding: 150px 0;
        overflow-y: auto;
        .lyric-text {
          padding: 10px;
        }
      }
    }
  }
  .active {
    font-size: 14px;
    font-weight: 600;
  }
}
</style>
