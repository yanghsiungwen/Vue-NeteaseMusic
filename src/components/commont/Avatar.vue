<!--
  歌单，歌曲，专辑封面
  @author yang 2020-7-13
  @params {String} src - 图片地址
  @params {String} width - 图片宽度/高度
  @params {String} radius - 图片圆角大小
-->
<template>
  <div class="avatar">
    <img v-lazy="src" :style="{width:width,height:width,borderRadius:radius}" />
  </div>
</template>

<script>
export default {
  name: 'Avatar',
  props: {
    src: String,
    width: {
      type: String,
      default: '60px'
    },
    radius: {
      type: String,
      default: '10px'
    }
  }
}
</script>

<style lang="less" scoped>
.avatar {
  display: flex;
  align-items: center;
}
</style>
