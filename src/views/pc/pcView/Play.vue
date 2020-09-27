<!--
  pc端页面底部播放信息栏
  @author yang 2020-7-13
  @interface song/url 获取音乐url
-->
<template>
  <Row class="play">
    <!-- 进度条 -->
    <div class="playProgress">
      <div class="progress">
        <Slider
          v-model="songTime"
          :step="1000"
          :min="0"
          :max="musicMes.time+2500"
          @on-change="changeCurrentTime"
          show-tip="never"
        ></Slider>
      </div>
    </div>
    <!-- 歌曲进度时间 -->
    <div class="countDown">
      <span>{{musicMes.time?current:'00:00'}}</span>
    </div>
    <!-- 歌曲时长 -->
    <div class="countTime">
      <span>{{musicMes.time?fullTime:'00:00'}}</span>
    </div>
    <!-- 操作栏 -->
    <div class="player">
      <!-- 歌曲信息 -->
      <i-col span="8" class="songMessage">
        <div class="avater" @click="showPlayCover">
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
    <!-- audio 组件 -->
    <audio ref="music" :src="musicUrl.url" @ended="end" @canplay="ready"></audio>
    <!-- 播放列表 -->
    <div class="bgCover" :style="{height:getHeight+'px',width:getWidth+'px'}" v-show="isShowMenu">
      <div class="playListMenu" :style="{height:getHeight-'140'+'px'}">
        <div class="table">
          <Table
            stripe
            :columns="listTitle"
            :data="playMenuList"
            :show-header="false"
            @on-row-dblclick="playSongs"
            :size="'small'"
            :row-class-name="addActive"
          ></Table>
        </div>
      </div>
      <div class="mask" :style="{width:getWidth-'370'+'px'}" @click="isShowPlayMenu"></div>
    </div>
  </Row>
</template>

<script>
// 导入vuex
import { mapState } from 'vuex'
export default {
  name: 'v-play',
  // components: {
  //   playCover
  // },
  data() {
    return {
      // 音量
      volValue: window.localStorage.getItem('__volumn__') * 100,
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
          ellipsis: true,
        },
        {
          title: '歌手',
          key: 'artist',
          width: '140px',
          ellipsis: true,
        },
      ],
      // 查找到当前歌曲的信息
      song: [],
      // 查找到下一首或上一首歌曲的信息
      nextSong: [],
      // 播放列表是否显示
      isShowMenu: false,
      // 歌曲已准备
      songReady: false,
    }
  },
  methods: {
    // 播放按钮 样式转换
    changeIcon() {
      this.$store.commit('change')
    },
    // 改变音量
    changeVolumeValue(val) {
      // console.log(111)
      console.log(val)
      this.$refs.music.volume = val / 100
      window.localStorage.setItem('__volumn__', this.$refs.music.volume)
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
      this.isShowMenu = !this.isShowMenu
    },
    // 展示播放列表
    isShowPlayMenu() {
      console.log(111)
      this.isShowMenu = false
    },

    // 歌曲准备就绪
    ready() {
      this.songReady = true
    },

    // 播放
    async play() {
      await this.$refs.music.play()
    },

    // 播放结束
    end() {
      this.$store.commit('change')
      this.playNextSong()
    },
    pause() {
      this.$refs.music.pause()
    },

    // 双击播放播放列表中的歌曲
    playSongs(obj, i) {
      this.$store.dispatch('getSong', obj.id)
    },

    // 展示播放歌曲歌词评论
    showPlayCover() {
      this.$store.commit('showPlayCover')
    },

    // 查找当前歌曲信息
    getSongIndex() {
      // 判断播放列表是否有歌曲，并且判断是否正在播放
      if (this.playMenuList.length === 0 && this.musicUrl.length === 0) {
        this.song = []
      } else {
        // 查找正在播放歌曲的信息，获取对应的index值
        this.song = this.playMenuList.find((item) => {
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
        this.nextSong = this.playMenuList.find((item) => {
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
        this.nextSong = this.playMenuList.find((item) => {
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
    },
    /**
     * 当前播放歌曲高亮，添加类名
     * @param {Object} row 当前行的数据
     * @param {Number} index 当前行的索引号
     */
    addActive(row, index) {
      if (this.isActive(row)) {
        return 'active'
      }
    },
    /**
     * 判断当前歌曲与当前行id
     * @param {Object} song 歌曲数据
     */
    isActive(song) {
      return song.id === this.musicMes.id
    },

    // 播放结束进度条归零，时间归零
    // playEnd() {
    //   if (this.$refs.music.ended && !this.nextSong) {
    //     this.currentTime = 0
    //     this.$store.commit('change')
    //   }
    // }
    // 深拷贝播放列表
  },
  watch: {
    isPlay(newVal) {
      this.$nextTick(() => {
        newVal ? this.play() : this.pause()
      })
    },
  },
  computed: {
    ...mapState([
      'musicUrl',
      'musicMes',
      'iconType',
      'songVal',
      'tableValue',
      'playMenuList',
      'isPlay',
    ]),
    // 播放进度条
    songTime: {
      get: function () {
        return this.songVal
      },
      set: function (newVal) {
        this.$store.commit('setSongVal', newVal)
      },
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
    },
    // 当前屏幕高度
    getHeight() {
      console.log(document.body.scrollHeight)
      return document.body.scrollHeight
    },
    // 当前屏幕宽度
    getWidth() {
      console.log(document.body.scrollWidth)
      return document.body.scrollWidth
    },
  },
  created() {
    // this.playEnd()
  },
  mounted() {
    // 进度条每秒更新+1秒
    this.$nextTick(() => setInterval(this.getCurrentTime, 1000))
    // 修改播放器的音量
    this.$refs.music.volume = window.localStorage.getItem('__volumn__')
  },
}
</script>

<style lang="less" scoped>
.play {
  background: #e9eff5;
  z-index: 9;
}
/* 音乐信息 */
.songMessage {
  padding-left: 25px;
  display: flex;
  font-size: 10px;
}
.avater {
  line-height: 64px;
  margin: 0 20px;
  cursor: pointer;
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
  left: 20px;
  z-index: 999;
}
.playProgress .ivu-slider {
  width: 96%;
}

/* 播放时间 */
.countDown {
  position: absolute;
  top: -20px;
  left: 5px;
}

.countTime {
  position: absolute;
  top: -20px;
  right: 20px;
}

/* 播放列表 */
.playMenu {
  height: 64px;
  margin-right: 40px;
  padding-left: 40px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.playMenu i {
  font-size: 26px;
  cursor: pointer;
}

/* 播放音量 */
.volume {
  height: 64px;
  display: flex;
  align-items: center;
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
}

/* 播放列表 */
.bgCover {
  position: fixed;
  top: 0;
  left: 0;
}
.bgCover .playListMenu {
  display: flex;
  justify-content: center;
  width: 350px;
  position: fixed;
  bottom: 75px;
  right: 0;
  /* background: yellowgreen; */
  /* z-index: 999; */
  overflow-y: auto;
  background-color: #fff;
}
.bgCover .playListMenu .table {
  height: 100%;
}
.bgCover .playListMenu ::webkit-scrollbar {
  display: none;
}
.bgCover .mask {
  height: 100%;
}
/* .ivu-drawer-right {
  height: 500px;
} */
.ivu-table-cell span {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
