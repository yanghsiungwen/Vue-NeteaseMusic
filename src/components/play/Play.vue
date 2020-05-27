<template>
  <Row>
    <div class="playProgress">
      <div class="progress">
        <Slider
          v-model="songVal"
          :step="1000"
          :min="0"
          :max="musicMes.time"
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
          <i class="iconfont icon-shangyishou"></i>
          <Icon :type="iconType" @click="changeIcon" />
          <i class="iconfont icon-xiayishou"></i>
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
    <audio ref="music" :src="musicUrl.url" loop autoplay></audio>
    <Drawer
      title="Basic Drawer"
      :closable="false"
      v-model="isShowList"
      inner
      scrollable
      :styles="{height:'500px'}"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  </Row>
</template>

<script>
// 导入vuex
import { mapState } from 'vuex'
export default {
  name: 'v-play',
  data() {
    return {
      // 歌曲开始时间
      songVal: 0,
      // 音量
      volValue: 100,
      time: 0,
      currentTime: 0,
      isShowList: false
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
        return (this.songVal = 0)
      }
      if (!this.$refs.music.paused) {
        this.songVal += 1000
      }
      this.currentTime = this.$refs.music.currentTime
      if (this.songVal >= this.musicMes.time) {
        this.songVal = 0
      }
    },
    // 展示音乐列表
    showList() {
      this.isShowList = !this.isShowList
    }
  },
  computed: {
    ...mapState(['musicUrl', 'musicMes', 'iconType']),
    fullTime() {
      // 秒
      const dt = this.musicMes.time / 1000
      const min = (parseInt(dt / 60) + '').padStart(2, '0')
      const sec = (parseInt(dt % 60) + '').padStart(2, '0')
      return min + ':' + sec
    },
    current() {
      const dt = this.currentTime
      const min = (parseInt(dt / 60) + '').padStart(2, '0')
      const sec = (parseInt(dt % 60) + '').padStart(2, '0')
      return min + ':' + sec
    }
  },
  mounted() {
    // 渲染到页面上
    this.$nextTick(() => setInterval(this.getCurrentTime, 1000))
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
</style>
