<template>
  <Menu width="200px" class="siderMenu">
    <MenuGroup v-for="item in menuWithPlayList" :key="item.id" :name="item.id" :title="item.title">
      <MenuItem v-for="item2 in item.children" :key="item2.id" :name="item2.id" :to="item2.path">
        <Icon :custom="'i-con iconfont ' + item2.type" />
        {{item2.name}}
      </MenuItem>
    </MenuGroup>
  </Menu>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'v-sider',
  props: ['height'],
  data() {
    return {
      // 侧边栏列表数据
      siderMenu: [
        {
          id: 1,
          title: '推荐',
          children: [
            {
              id: 1,
              name: '发现音乐',
              type: 'icon-yinle',
              path: '/discovery'
            },
            {
              id: 2,
              name: '私人FM',
              type: 'icon-xzbd',
              path: '/discovery'
            },
            {
              id: 3,
              name: '每日推荐',
              type: 'icon-B',
              path: '/recommend/songs'
            }
          ]
        }
      ]
    }
  },
  methods: {
    // 获取歌单信息
    // getSongList(id) {
    //   this.$store.dispatch('asyncGetSongList', id)
    //   console.log(id)
    //   // window.sessionStorage.setItem('url', this.$route.path)
    // }
  },
  computed: {
    ...mapState(['musicList']),
    menuWithPlayList() {
      return this.musicList.length
        ? this.siderMenu.concat(this.musicList)
        : this.siderMenu
    },
    getHeight() {
      console.log(document.body.scrollHeight)
      return document.body.scrollHeight - 64
    }
  }
}
</script>

<style lang="less" scoped>
/* 侧边栏 */
.siderMenu {
  background: #e2eff8;
  overflow: auto;

  .ivu-menu-item {
    padding: 10px 24px;
    font-size: 12px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
</style>
