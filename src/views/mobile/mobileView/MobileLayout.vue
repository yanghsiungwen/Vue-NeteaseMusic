<!--
  移动端页面布局
  @author yang 2020-7-13
-->
<template>
  <div class="layout">
    <m-header v-show="showHeader"></m-header>
    <div class="content">
      <router-view></router-view>
    </div>
    <play-bar></play-bar>
  </div>
</template>

<script>
import mHeader from '@/views/mobile/mobileView//Header'
import PlayBar from '@/components/commont/PlayBar'
export default {
  name: 'MobileLayout',
  components: { mHeader, PlayBar },
  computed: {
    showHeader() {
      return this.$route.path.indexOf('list') === -1
    },
  },
}
</script>

<style lang='less' scoped>
.layout {
  .header {
    width: 100%;
    position: fixed;
    z-index: 9;
  }
  .content {
    height: 100%;
    overflow-y: auto;
    &.content::-webkit-scrollbar {
      display: none;
    }
  }
  .play-bar {
    bottom: 0;
    width: 100%;
    position: fixed;
    z-index: 9;
  }
}
</style>
