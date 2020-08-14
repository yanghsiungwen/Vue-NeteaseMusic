<template>
  <div class="header">
    <!-- 图标 -->
    <div class="brand" @click="toTop">
      <img src="@/assets/img/dragon.png" />
      <span>网抑云音乐</span>
    </div>
    <!-- 搜索栏 -->
    <!-- <Input search enter-button placeholder="搜索音乐，视频，歌曲，电台" /> -->
    <div class="search-bar">
      <search></search>
    </div>
    <!-- 登录栏 -->
    <div class="login-bar">
      <div class="login" @click="showLoginDiog" v-if="!isLogin">
        <i class="iconfont icon-weidenglutouxiang"></i>
        <span>未登录</span>
      </div>
      <Poptip class="poptip" v-model="visible" width="150" transfer v-else>
        <div class="successLog">
          <img :src="userList.avatarUrl" v-if="userList" />
          <span v-if="userList">{{userList.nickname}}</span>
        </div>
        <div slot="content">
          <a @click="logout">
            <Icon type="ios-log-out" />退出登录
          </a>
        </div>
      </Poptip>
    </div>
    <!-- 登录对话框 -->
    <Modal v-model="loginVisible" title="登录" width="30%" :styles="{top:'180px'}" footer-hide>
      <Form ref="userFormRef" :model="userForm" :rules="userFormRule">
        <FormItem prop="phone">
          <Input type="text" v-model="userForm.uid" placeholder="您的用户ID" />
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </FormItem>
        <FormItem style="text-align:center">
          <Button type="default" @click="userLogin">登录</Button>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Search from './Search'
export default {
  name: 'v-header',
  components: { Search },
  data() {
    return {
      // 表单数据
      userForm: {
        uid: '',
      },
      // 表单验证规则
      userFormRule: {},
      // 用户信息
      userList: [],
      // 判断当前是否为登录
      isLogin: false,
      // 登出气泡框显示
      visible: false,
      isShow: false,
      // 显示对话框
      loginVisible: false,
    }
  },
  created() {
    var userId = window.localStorage.getItem('__userId__')
    if (userId) {
      this.getUser(userId)
    }
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
      this.$refs.userFormRef.validate(async (valid) => {
        if (!valid) return
        this.getUser(this.userForm.uid)
        // 登出气泡
        this.isShow = true
        // 登录对话框
        this.loginVisible = false
      })
    },
    // 退出登录
    logout() {
      window.localStorage.clear()
      this.visible = false
      this.isShow = false
      this.isLogin = false
      this.musicList = []
      this.userList = []
      this.$Message.success('成功退出！')
    },
    // 根据id获取信息
    async getUser(id) {
      const { data: res } = await this.$http.get('user/detail', {
        params: { uid: id },
      })
      console.log(res)
      if (res.code !== 200) {
        return this.$Message.error('登录失败！')
      }
      // 判断当前是否在登录
      this.isLogin = true
      // 用户资料
      this.userList = res.profile
      // 保持到浏览器中
      window.localStorage.setItem('__userId__', res.profile.userId)
      // 获取用户歌单信息
      const { data: con } = await this.$http.get('user/playlist', {
        params: { uid: id },
      })
      console.log(con)
      this.musicList = this.categorizeMusicList(
        con.playlist,
        res.profile.userId
      )
      // 提示信息，保存数据
      this.$Message.success('登录成功！')
      window.localStorage.setItem('cookie', res.cookie)
    },

    // 对用户的歌单进行分类 创建歌单，收藏歌单
    categorizeMusicList(lists, id) {
      const createLists = []
      const collectLists = []
      const retLists = []
      // 根据id判断歌单是否用户创建
      lists.forEach((list) => {
        const { userId } = list
        if (id === userId) {
          createLists.push(list)
        } else {
          collectLists.push(list)
        }
      })

      // 给歌单添加路由地址
      const getMusicListPath = (list) =>
        list.map(({ id, name }) => ({
          path: `/list/${id}`,
          id: id,
          name: name,
        }))

      if (createLists.length) {
        retLists.push({
          id: 2,
          title: '创建的歌单',
          children: getMusicListPath(createLists),
        })
      }

      if (collectLists.length) {
        retLists.push({
          id: 3,
          title: '收藏的歌单',
          children: getMusicListPath(collectLists),
        })
      }
      console.log(retLists)
      return retLists
    },
  },
  computed: {
    ...mapState(['musicList']),
    musicList: {
      get() {
        return this.musicList
      },
      set(newVal) {
        this.$store.commit('saveMusicList', newVal)
      },
    },
  },
}
</script>

<style lang="less" scoped>
.header {
  height: 64px;
  display: flex;
  justify-content: space-between;
}
/* 商标 */
.brand {
  margin: 0 10px;
  width: 190px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  img {
    width: 50px;
  }

  span {
    font-size: 20px;
    letter-spacing: 4px;
    font-weight: 600;
    display: inline-block;
  }
}

/* 搜索框样式 */
.search-bar {
  display: flex;
  align-items: center;
}

.login-bar {
  margin-right: 200px;
  display: flex;
  align-items: center;
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

    .iconfont {
      margin-right: 10px;
      font-size: 26px;
    }
  }

  /* 登录后头像信息 */
  .successLog {
    display: flex;
    align-items: center;
    cursor: pointer;
    img {
      width: 32px;
      border-radius: 25px;
    }
    span {
      padding-left: 10px;
      font-size: 14px;
    }
  }
}

// 登出气泡
</style>
