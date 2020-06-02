<template>
  <Layout>
    <playCover class="playCover" :style="{top:topVal,transition: 'all 0.5s ease'}"></playCover>
    <!-- 头部 -->
    <Header :style="{position: 'fixed', width: '100%', 'z-index':'9999'}">
      <!-- 导航栏 -->
      <Row>
        <!-- 图标 -->
        <i-col span="5">
          <div class="brand" @click="toTop">
            <img src="../assets/img/dragon.png" alt />
            <span>伪易云音乐</span>
          </div>
        </i-col>
        <!-- 头部目录 -->
        <i-col span="10">
          <Menu mode="horizontal" active-name="1" class="headerMenu">
            <MenuItem name="1">个性推荐</MenuItem>
            <MenuItem name="2">每日歌曲推荐</MenuItem>
            <MenuItem name="3">歌单</MenuItem>
            <MenuItem name="4">排行榜</MenuItem>
            <MenuItem name="5">歌手</MenuItem>
            <MenuItem name="6">最新音乐</MenuItem>
          </Menu>
        </i-col>
        <!-- 搜索栏 -->
        <i-col span="6">
          <Input search enter-button placeholder="搜索音乐，视频，歌曲，电台" />
        </i-col>
        <!-- 登录栏 -->
        <i-col span="3">
          <div class="login" @click="showLoginDiog" v-show="!isShow">
            <i class="iconfont icon-weidenglutouxiang"></i>
            <span>未登录</span>
          </div>
          <Poptip v-model="visible" width="150" transfer>
            <div class="successLog" v-show="isShow">
              <img :src="userList.avatarUrl" v-if="userList" />
              <span v-if="userList">{{userList.nickname}}</span>
            </div>
            <div slot="content">
              <a @click="logout">
                <Icon type="ios-log-out" />退出登录
              </a>
            </div>
          </Poptip>
        </i-col>
      </Row>
    </Header>
    <Layout>
      <!-- 侧边栏 -->
      <Sider hide-trigger :style="{margin:'64px 0 0 0', position:'fixed'}">
        <Scroll :height="getHeight">
          <Menu width="183px" class="siderMenu">
            <MenuGroup v-for="item in siderMenu" :key="item.id" :name="item.id" :title="item.title">
              <MenuItem
                v-for="item2 in item.children"
                :key="item2.id"
                :name="item2.id"
                :to="item2.path"
              >
                <Icon :custom="'i-con iconfont ' + item2.type" />
                {{item2.name}}
              </MenuItem>
            </MenuGroup>
          </Menu>
          <Menu width="183px" class="siderMenu musicMenu" @on-select="getSongList">
            <MenuGroup title="创建的歌单" name="3">
              <MenuItem
                v-for="item in musicList"
                :key="item.id"
                :name="item.id"
                :to="'list'"
              >{{item.name}}</MenuItem>
            </MenuGroup>
          </Menu>
        </Scroll>
      </Sider>
      <!-- 主体内容 -->
      <Content class="content">
        <router-view :style="{width:getWidth-'220'+'px','max-height':getHeight+'px'}"></router-view>
      </Content>
      <!-- 播放控件 -->
      <Footer
        :style="{position:'fixed',bottom:'0',height:'64px', left:'200px', width:getWidth - '200' +'px', padding:'0','line-height':'64px','z-index':99}"
      >
        <v-play :style="{'z-index':'9999'}"></v-play>
      </Footer>
    </Layout>
    <!-- 登录对话框 -->
    <Modal v-model="loginVisible" title="登录" width="30%" :styles="style" footer-hide>
      <Form ref="userFormRef" :model="userForm" :rules="userFormRule">
        <FormItem prop="phone">
          <Input type="text" v-model="userForm.phone" placeholder="Username" />
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="userForm.password" placeholder="Password" />
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </FormItem>
        <FormItem style="text-align:center">
          <Button type="default" @click="userLogin">登录</Button>
        </FormItem>
      </Form>
    </Modal>
  </Layout>
</template>

<script>
import { mapState } from 'vuex'
import vPlay from './play/Play'
import playCover from './playCover/PlayCover'
export default {
  components: {
    vPlay,
    playCover
  },
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
              path: 'discovery'
            },
            {
              id: 2,
              name: '私人FM',
              type: 'icon-xzbd',
              path: 'discovery'
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
              type: 'icon-xiazai',
              path: 'discovery'
            },
            {
              id: 4,
              name: '我的音乐云盘',
              type: 'icon-B',
              path: 'discovery'
            },
            {
              id: 5,
              name: '我的收藏',
              type: 'icon-shoucangjia',
              path: 'discovery'
            }
          ]
        }
      ],
      // 显示对话框
      loginVisible: false,
      // 对话框样式
      style: {
        top: '180px'
      },
      // 表单数据
      userForm: {
        phone: '',
        password: ''
      },
      // 表单验证规则
      userFormRule: {},
      // 用户信息
      userList: [],
      // 登出气泡框显示
      visible: false,
      isShow: false,
      // 音乐歌单信息
      musicList: []
    }
  },
  created() {
    // this.musicList = window.sessionStorage.getItem('musicList')
    // this.userList = window.sessionStorage.getItem('userList')
  },
  methods: {
    // 跳转首页
    toTop() {
      this.$router.push('/discovery')
    },
    // 显示对话框
    showLoginDiog() {
      this.loginVisible = true
    },
    // 用户登录
    userLogin() {
      // 预验证
      this.$refs.userFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post(
          'login/cellphone',
          this.userForm
        )
        console.log(res)
        if (res.code !== 200) {
          return this.$message.error('登录失败！')
        }
        // 获取用户歌单信息
        const { data: con } = await this.$http.get('user/playlist', {
          params: { uid: res.profile.userId }
        })
        console.log(con)
        // 提示信息，保存数据
        this.$message.success('登录成功！')
        this.musicList = con.playlist
        // 用户资料
        this.userList = res.profile
        // 保持到浏览器中
        // window.sessionStorage.setItem('userList', res.profile)
        // window.sessionStorage.setItem('musicList', con.playlist)
        // 登出气泡
        this.isShow = true
        // 登录对话框
        this.loginVisible = false
        window.sessionStorage.setItem('cookie', res.cookie)
      })
    },
    // 退出登录
    logout() {
      window.sessionStorage.clear()
      this.visible = false
      this.isShow = false
      this.musicList = []
      this.userList = []
      this.$message.success('成功退出！')
    },
    // 获取歌单信息
    getSongList(id) {
      this.$store.dispatch('asyncGetSongList', id)
      console.log(id)
    }
  },
  computed: {
    ...mapState(['isShowPlayCover', 'topVal']),
    getHeight() {
      console.log(document.body.scrollHeight)
      return document.body.scrollHeight - 64
    },
    getWidth() {
      console.log(document.body.scrollWidth)
      return document.body.scrollWidth
    }
  }
}
</script>

<style scoped>
/* 布局 */
.ivu-layout {
  height: 100%;
}
/* 头部 */
.ivu-layout-header {
  padding: 0;
  background: #e9eff5;
  border-bottom: 2px solid rgba(45, 140, 240, 0.5);
}
.headerMenu {
  height: 100%;
  background-color: #e2eff8;
}

/* 图标 */
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

/* 输入框样式 */
.ivu-input-with-search {
  margin: 16px 0;
  width: 300px;
  vertical-align: middle;
}

/* 登录块样式 */
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

/* 侧边栏 */
.ivu-layout-sider {
  /* min-height: 486px; */
  background: #e2eff8;
  font-size: 12px;
}
.siderMenu {
  background: #e2eff8;
}
.siderMenu .ivu-menu-item {
  padding: 10px 24px;
  font-size: 12px;
}
.musicMenu .ivu-menu-item {
  padding: 8px 24px;
  font-size: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

/* 登录后头像信息 */
.successLog {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.successLog img {
  width: 32px;
  border-radius: 25px;
}
.successLog span {
  padding-left: 10px;
  font-size: 14px;
}
.content {
  margin: 64px 0 64px 200px;
  overflow: auto;
}
/* 底部区域 */
/* 播放歌词页 */
.playCover {
  height: calc(100% - 128px);
  width: calc(100% - 200px);
  left: 200px;
  padding-bottom: 40px;
  position: fixed;
  background: #f5f7f9;
  z-index: 9;
  transition: all 0.5s ease;
  overflow: auto;
}
</style>
