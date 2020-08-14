<!--
  移动端
  @author yang 2020-7-13
-->
<template>
  <div>
    <div class="main">
      <mobile-layout v-show="!isShowPlayCover"></mobile-layout>
      <mobile-play-cover></mobile-play-cover>
    </div>
  </div>
</template>

<script>
// import mHeader from '@/components/mobile/header/Header'
// import PlayBar from '@/components/commont/PlayBar'
import MobileLayout from '@/views/mobile/mobileView/MobileLayout'
import MobilePlayCover from '@/views/mobile/mobileView/MobilePlayCover'
import { mapState } from 'vuex'
export default {
  components: { MobilePlayCover, MobileLayout },
  data() {
    return {
      userAgent: navigator.userAgent,
    }
  },
  created() {
    // this.changeMobile()
  },
  methods: {
    changeMobile(agent) {
      if (!/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        this.$router.push('/discovery')
      }
    },
  },
  computed: {
    ...mapState(['isShowPlayCover']),
  },
  watch: {
    userAgent(newVal) {
      this.changeMobile(newVal)
    },
  },
}
</script>

<style lang="less" scoped>
.main {
  height: 100%;
  width: 100%;
  background: #f5f7f9;
  .layout {
    height: 100%;
    width: 100%;
  }
  .play-cover {
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background: #f5f7f9;
    z-index: 99;
  }
}

// 歌曲播放详情页动画
.cover-enter,
.cover-leave-to {
  transition: all 0.5s;
  transform-origin: left top;
  transform: translateY(97%) translateX(18px) scale(0);
}
.cover-enter-active,
.cover-leave-active {
  transition: all 0.3s;
}
</style>
