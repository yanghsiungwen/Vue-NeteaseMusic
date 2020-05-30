<template>
  <Row>
    <div class="playProgress">
      <div class="progress">
        <Slider
          v-model="songTime"
          :step="1000"
          :min="0"
          :max="musicMes.time+1000"
          @on-change="changeCurrentTime"
          show-tip="never"
        ></Slider>
      </div>
    </div>
    <div class="countDown">
      <span>{{musicMes.time?current:'00:00'}}</span>
    </div>
    <div class="countTime">
      <span>{{musicMes.time?fullTime:'00:00'}}</span>
    </div>
    <div class="player">
      <!-- 歌曲信息 -->
      <i-col span="8" class="songMessage">
        <div class="avater">
          <img :src="musicMes.picUrl" v-show="musicMes.picUrl" />
        </div>
        <div class="mes">
          <div class="song">{{musicMes.name}}</div>
          <div class="art">
            <span v-for="(item,i) in musicMes.artists" :key="i">
              {{item}}
              <span v-if="musicMes.artists.length-1>i">/</span>
            </span>
          </div>
        </div>
      </i-col>
      <!-- 播放按钮 -->
      <i-col span="8" class="btn">
        <div class="playBtn">
          <i class="iconfont icon-shangyishou" @click="playPreSong"></i>
          <Icon :type="iconType" @click="changeIcon" />
          <i class="iconfont icon-xiayishou" @click="playNextSong"></i>
        </div>
      </i-col>
      <!-- 播放进度 -->

      <!-- 播放列表 -->
      <i-col span="3">
        <div class="playMenu">
          <div class="playMethod">
            <Tooltip content="顺序播放" placement="top">
              <i class="iconfont icon-shunxubofang"></i>
            </Tooltip>
          </div>
          <div class="playList">
            <Tooltip content="播放列表" placement="top">
              <i class="iconfont icon-wj-bflb" @click="showList"></i>
            </Tooltip>
          </div>
        </div>
      </i-col>
      <!-- 播放音量 -->
      <i-col span="4">
        <div class="volume">
          <div class="icon">
            <Icon type="md-volume-mute" class="volIcon" />
          </div>
          <div class="sliderbar">
            <Slider
              v-model="volValue"
              class="volSlider"
              @on-change="changeVolumeValue"
              show-tip="never"
            ></Slider>
          </div>
        </div>
      </i-col>
    </div>
    <audio ref="music" :src="musicUrl.url" autoplay></audio>
    <Drawer
      title="Basic Drawer"
      :closable="false"
      v-model="isShowList"
      inner
      scrollable
      :width="'400'"
    >
      <Table
        stripe
        :columns="listTitle"
        :data="tableValue"
        :show-header="false"
        @on-row-dblclick="playSongs"
        :size="'small'"
      ></Table>
    </Drawer>
  </Row>
</template>

<script>
// 导入vuex
import { mapState } from 'vuex'
// import _ from 'lodash'
export default {
  name: 'v-play',
  data() {
    return {
      // 音量
      volValue: 100,
      time: 0,
      // 获取当前时间并渲染到进度条的右侧
      currentTime: 0,
      // 展示右下角播放列表
      isShowList: false,
      // 播放列表表头
      listTitle: [
        {
          title: '音乐标题',
          key: 'name',
          width: '200px',
          ellipsis: true
        },
        {
          title: '歌手',
          key: 'artist',
          width: '140px',
          ellipsis: true
        }
      ],
      song: [],
      nextSong: []
    }
  },
  methods: {
    // 播放按钮 样式转换
    changeIcon() {
      if (this.iconType === 'ios-play' && this.musicUrl.length !== 0) {
        this.$refs.music.play()
        this.$store.commit('change')
      } else if (this.iconType === 'ios-pause' && this.musicUrl.length !== 0) {
        this.$refs.music.pause()
        this.$store.commit('change')
      }
    },
    // 改变音量
    changeVolumeValue(val) {
      // console.log(111)
      console.log(val)
      this.$refs.music.volume = val / 100
    },
    // 改变播放进度
    changeCurrentTime(val) {
      console.log(val)
      this.$refs.music.currentTime = val / 1000
    },
    // 获取当前时间
    getCurrentTime() {
      if (!this.$refs.music) {
        return this.$store.commit('initSongVal')
        // return (this.playTime = 0)
      }
      if (!this.$refs.music.paused) {
        this.$store.commit('addSongVal')
        // this.playTime += 1000
      }
      this.currentTime = this.$refs.music.currentTime
      if (this.songVal >= this.musicMes.time) {
        this.$store.commit('initSongVal')
        // this.playTime = 0
      }
      // console.log(this.songVal)
    },
    // 展示音乐列表
    showList() {
      this.isShowList = !this.isShowList
    },
    // 双击播放播放列表中的歌曲
    playSongs(obj, i) {
      this.$store.dispatch('getSong', obj.id)
    },

    // 查找当前歌曲信息
    getSongIndex() {
      // 判断播放列表是否有歌曲，并且判断是否正在播放
      if (this.tableValue.length === 0 && this.musicUrl.length === 0) {
        this.song = []
      } else {
        // 查找正在播放歌曲的信息，获取对应的index值
        this.song = this.tableValue.find(item => {
          return item.id === this.musicUrl.id
        })
      }
    },

    // 获取下一首歌曲信息
    getNextSongMes() {
      if (this.song && this.song.index > this.tableValue.length) {
        this.nextSong = []
      } else {
        // 通过当前播放的 index+1 查找下首歌曲的信息
        this.nextSong = this.tableValue.find(item => {
          if (this.song) {
            return item.index === this.song.index + 1
          }
        })
      }
    },

    // 获取上一首歌曲信息
    getPreSongMes() {
      if (this.song && this.song.index > this.tableValue.length) {
        this.nextSong = []
      } else {
        // 通过当前播放的 index+1 查找下首歌曲的信息
        this.nextSong = this.tableValue.find(item => {
          if (this.song) {
            return item.index === this.song.index - 1
          }
        })
      }
    },

    // 循环播放列表歌单
    playSongsList() {
      this.getSongIndex()
      this.getNextSongMes()
      // 判断 audio 的属性ended 播放完时为true，同时下一首歌曲是否存在，则查找下首歌曲的信息
      if (this.$refs.music.ended && this.nextSong) {
        this.$store.dispatch('getSong', this.nextSong.id)
        this.currentTime = 0
        this.$store.commit('change')
      }
      // console.log(this)
    },

    // 点击播放下首
    playNextSong() {
      this.getSongIndex()
      this.getNextSongMes()
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
    },

    // 播放结束进度条归零，时间归零
    playEnd() {
      if (this.$refs.music.ended && !this.nextSong) {
        this.currentTime = 0
        this.$store.commit('change')
      }
    }
  },
  computed: {
    ...mapState(['musicUrl', 'musicMes', 'iconType', 'songVal', 'tableValue']),
    // 播放进度条
    songTime: {
      get: function() {
        return this.songVal
      },
      set: function(newVal) {
        this.$store.commit('setSongVal', newVal)
      }
    },
    // 歌曲时长
    fullTime() {
      // 秒
      const dt = this.musicMes.time / 1000
      const min = (parseInt(dt / 60) + '').padStart(2, '0')
      const sec = (parseInt(dt % 60) + '').padStart(2, '0')
      return min + ':' + sec
    },
    // 当前播放时间
    current() {
      const dt = this.currentTime
      const min = (parseInt(dt / 60) + '').padStart(2, '0')
      const sec = (parseInt(dt % 60) + '').padStart(2, '0')
      return min + ':' + sec
    }
  },
  created() {
    this.playEnd()
  },
  mounted() {
    // 进度条每秒更新+1秒
    this.$nextTick(() => setInterval(this.getCurrentTime, 1000))
    // 每秒检测，当播放结束就播放下一首
    this.$nextTick(() => setInterval(this.playSongsList, 1000))
    this.$nextTick(() => this.playEnd())
  }
}
</script>

<style scoped>
/* 音乐信息 */
.songMessage {
  display: flex;
  /* align-items: center;*/
  font-size: 10px;
  /* justify-content: space-evenly;  */
}
.avater {
  margin: 0 20px;
}
.avater img {
  width: 50px;
  height: 50px;
  vertical-align: middle;
}
.mes {
  display: grid;
  align-items: center;
  grid-template-rows: 32px 32px;
  height: 64px;
  text-align: center;
}
.mes .song {
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 播放按钮 */
.btn {
  margin: 0 20px;
  font-size: 40px;
}
.btn i {
  font-size: 28px;
  color: cornflowerblue;
  cursor: pointer;
}
.btn .ivu-icon {
  padding: 5px;
  margin: 0 10px;
  background: cornflowerblue;
  color: #fff;
  border-radius: 50%;
}
.playBtn {
  padding-left: 50px;
}

/* 播放进度条 */
.playProgress {
  position: absolute;
  width: 100%;
  top: -20px;
  /* margin: 0 auto; */
  left: 50px;
  z-index: 999;
}
.playProgress .ivu-slider {
  width: 91%;
}

/* 播放时间 */
.countDown {
  position: absolute;
  top: -35px;
  left: 5px;
}

.countTime {
  position: absolute;
  top: -35px;
  right: 20px;
}

/* 播放列表 */
.playMethod {
  float: left;
  margin-right: 40px;
  padding-left: 40px;
}
.playMenu i {
  font-size: 26px;
  cursor: pointer;
}

/* 播放音量 */
.icon {
  font-size: 20px;
  margin-right: 20px;
}
.sliderbar {
  position: absolute;
  width: 70%;
  top: 15px;
  left: 20px;
}

/* 播放列表 */
.ivu-drawer-right {
  height: 500px;
}
.ivu-table-cell span {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
