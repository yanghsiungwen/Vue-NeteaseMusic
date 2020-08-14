<!--
  pc端布局
  @author yang 2020-7-13
  @components {PlayCover / Play / Header / Discovery / MusicList}
-->
<template>
  <div class="layout">
    <playCover class="playCover"></playCover>
    <!-- 头部 -->
    <div class="layout-header">
      <!-- 导航栏 -->
      <v-header></v-header>
    </div>
    <div class="layout-body">
      <!-- 侧边栏 -->
      <div class="layout-sider">
        <v-sider></v-sider>
      </div>
      <!-- 主体内容 -->
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
    <!-- 播放控件 -->
    <div class="layout-footer">
      <v-play></v-play>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import vHeader from '@/views/pc/pcView/Header'
import vSider from '@/views/pc/pcView/Sider'
import vPlay from '@/views/pc/pcView/Play'
import playCover from '@/views/pc/pcView/PlayCover'
export default {
  components: {
    vHeader,
    vSider,
    vPlay,
    playCover,
  },
  data() {
    return {
      userAgent: navigator.userAgent,
    }
  },
  created() {
    this.changeMobile()
  },
  methods: {
    changeMobile(agent) {
      if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        this.$router.push('/m')
      }
    },
  },
  watch: {
    userAgent(newVal) {
      this.changeMobile(newVal)
    },
  },
  computed: {
    ...mapState(['topVal', 'isShowPlayCover']),
    getHeight() {
      console.log(document.body.scrollHeight)
      return document.body.scrollHeight - 64
    },
    getWidth() {
      console.log(document.body.scrollWidth)
      return document.body.scrollWidth
    },
  },
}
</script>

<style lang="less" scoped>
/* 播放歌曲详情页过渡动画 */
.slider-enter,
.slider-leave-to {
  transition: all 0.5s;
  transform: translateY(100%);
}
.slider-enter-active,
.slider-leave-active {
  transition: all 0.5s;
}

/* 布局 */
.layout {
  height: 100%;
}

/* 头部 */
.layout-header {
  width: 100%;
  height: 64px;
  padding: 0;
  background: #e9eff5;
  border-bottom: 2px solid rgba(45, 140, 240, 0.5);
}

/* 侧边栏 */
.layout-body {
  height: calc(100% - 64px - 64px);
  font-size: 12px;
  display: flex;
  .layout-sider {
    width: 200px;
    overflow-y: auto;
    overflow-x: hidden;
    background: #e2eff8;
  } /* 主体内容 */
  .content {
    height: 100%;
    flex: 1;
    width: calc(100% - 200px);
    overflow: auto;
    .content::-webkit-scrollbar-track {
      background-color: #e2eff8;
    }
    .content::-webkit-scrollbar {
      width: 5px;
      height: 5px;
      background-color: #e2eff8;
    }
    .content::-webkit-scrollbar-thumb {
      background-color: #2d8cf080;
    }
  }
  .layout-footer {
    height: 64px;
  }
}

/* 底部区域 */
/* 播放歌词页 */
.playCover {
  height: calc(100% - 128px);
  width: calc(100% - 200px);
  left: 200px;
  top: 64px;
  padding-bottom: 40px;
  position: fixed;
  background: #f5f7f9;
  z-index: 1;
  overflow: auto;
}
</style>
