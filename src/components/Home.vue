<template>
  <Layout>
    <Header>
      <Row>
        <i-col span="5">
          <div class="brand">
            <img src="../assets/img/dragon.png" alt />
            <span>伪易云音乐</span>
          </div>
        </i-col>
        <i-col span="10">
          <Menu mode="horizontal" active-name="1">
            <MenuItem name="1">个性推荐</MenuItem>
            <MenuItem name="2">每日歌曲推荐</MenuItem>
            <MenuItem name="3">歌单</MenuItem>
            <MenuItem name="4">排行榜</MenuItem>
            <MenuItem name="5">歌手</MenuItem>
            <MenuItem name="6">最新音乐</MenuItem>
          </Menu>
        </i-col>
        <i-col span="6">
          <Input search enter-button placeholder="搜索音乐，视频，歌曲，电台" />
        </i-col>
        <i-col span="2">
          <div class="login">
            <i class="iconfont icon-weidenglutouxiang"></i>
            <span>未登录</span>
          </div>
        </i-col>
      </Row>
    </Header>
    <Layout>
      <Sider hide-trigger>
        <Menu width="200px">
          <MenuGroup v-for="item in siderMenu" :key="item.id" :name="item.id" :title="item.title">
            <MenuItem v-for="item2 in item.children" :key="item2.id" :name="item2.id">
              <Icon :custom="'i-con iconfont ' + item2.type" />
              {{item2.name}}
            </MenuItem>
          </MenuGroup>
        </Menu>
      </Sider>
      <Content>Content</Content>
    </Layout>
  </Layout>
</template>

<script>
export default {
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
              type: 'icon-yinle'
            },
            {
              id: 2,
              name: '私人FM',
              type: 'icon-xzbd'
            }
          ]
        },
        {
          id: 2,
          title: '我的音乐',
          children: [
            {
              id: 3,
              name: '下载管理',
              type: 'icon-xiazai'
            },
            {
              id: 4,
              name: '我的音乐云盘',
              type: 'icon-B'
            },
            {
              id: 5,
              name: '我的收藏',
              type: 'icon-shoucangjia'
            }
          ]
        }
      ]
    }
  },
  method: {}
}
</script>

<style scoped>
.ivu-layout {
  height: 100%;
}
.ivu-layout-header {
  padding: 0;
  background: #e9eff5;
  border-bottom: 2px solid rgba(45, 140, 240, 0.5);
}
.ivu-menu {
  height: 100%;
  background-color: #e2eff8;
}
.brand {
  margin: 0 10px;
  width: 190px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
.brand img {
  width: 50px;
}
.brand span {
  font-size: 20px;
  letter-spacing: 4px;
  font-weight: 600;
  display: inline-block;
}
.login {
  height: 100%;
  width: 100px;
  padding: 0 10px;
  line-height: 64px;
  display: flex;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
}
.login .iconfont {
  margin-right: 10px;
  font-size: 26px;
}
.ivu-layout-sider {
  border-right: 1px solid #e8edf1;
}
.ivu-input-with-search {
  margin: 16px 0;
  width: 300px;
  vertical-align: middle;
}
.ivu-menu-vertical .ivu-menu-item {
  padding: 8px 24px;
  font-size: 14px;
}
</style>
