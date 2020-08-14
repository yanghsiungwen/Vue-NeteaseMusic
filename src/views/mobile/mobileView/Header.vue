<!--
  移动端页面顶部导航栏
  @author yang 2020-7-13
-->
<template>
  <div class="header">
    <div class="menu">
      <Icon type="md-menu icon" />
    </div>
    <header-item v-for="item in menuItem" :key="item.id" :path="item.path">
      <div class="text">{{item.title}}</div>
    </header-item>
    <div class="search">
      <Icon type="md-search icon" />
    </div>
  </div>
</template>

<script>
import headerItem from '@/components/commont/HeaderItem'
export default {
  name: 'mHeader',
  components: { headerItem },
  data() {
    return {
      menuItem: [
        {
          id: 1,
          title: '我的',
          path: '/m/user',
        },
        {
          id: 2,
          title: '发现',
          path: '/m/discovery',
        },
        {
          id: 3,
          title: '云村',
          path: '/m/community',
        },
        {
          id: 4,
          title: '视频',
          path: '/m/mv',
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.header {
  height: 38px;
  display: flex;
  text-align: center;
  background: #f5f7f9;
  font-size: 16px;
  .icon {
    width: 30px;
    font-size: 16px;
    line-height: 38px;
    font-weight: 600;
  }
}
</style>
