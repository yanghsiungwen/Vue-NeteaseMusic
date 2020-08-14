<!--
  移动端头部区域
  @author yang 2020-7-13
  @params {String} path - 路由跳转地址
  @params {String} activeColor - 高亮显示的颜色
-->
<template>
  <div class="item" @click="itemClick" :style="activeStyle">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'headerItem',
  props: {
    path: String,
    activeColor: {
      type: String,
      default: '#88BDF3'
    }
  },
  computed: {
    // 判断当前的路由地址是否包含高亮标题的路由地址
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1
    },
    // 在目前路由地址，则标题添加高亮类名
    activeStyle() {
      return this.isActive ? { color: this.activeColor, fontSize: '18px' } : {}
    }
  },
  methods: {
    /**
     * 路由跳转
     */
    itemClick() {
      this.$router.replace(this.path).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.item {
  height: 38px;
  display: flex;
  flex: 1;
  justify-content: center;
  flex-direction: column;
  padding: 10px 0;
  text-align: center;
  transition: all 0.1s;
}
</style>
