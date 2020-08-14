<template>
  <div class="user">
    <!-- 未登录 -->
    <div class="unlogin" v-if="!isLogin">
      <div class="logo">
        <img src="@/assets/img/dragon.png" alt />
      </div>
      <div class="login-bar">
        <p>用户ID:</p>
        <Input
          v-model="userId"
          type="number"
          size="large"
          placeholder="请输入用户ID..."
          style="width: 250px"
          class="input-bar"
        />
        <!-- <input type="number" v-model="userId" placeholder="请输入用户ID" /> -->
        <Button @click="login" class="btn" size="large">登录</Button>

        <Button @click="push" type="text" class="btn">立即体验</Button>
      </div>
      <div class="other-way">
        <Icon type="ios-mail-outline" class="icon" />
        <Icon type="ios-mail-outline" class="icon" />
        <Icon type="ios-mail-outline" class="icon" />
        <Icon type="ios-mail-outline" class="icon" />
      </div>
      <div class="law" :class="shake? 'shake' : ''">
        <Checkbox v-model="single">{{' '}}同意《用户协议》和《隐私政策》</Checkbox>
      </div>
    </div>
    <!-- 已登录 -->
    <div class="login" v-else>
      <div class="user-mes">
        <avatar :src="userList.avatarUrl" :width="'50px'" :radius="'50%'"></avatar>
        <div class="nickname">
          <p>{{userList.nickname}}</p>
        </div>
        <div class="logout">
          <Poptip confirm title="确定退出登录?" @on-ok="ok">
            <Button type="error" size="small">退出登录</Button>
          </Poptip>
        </div>
      </div>
      <div class="operation">
        <div class="item">
          <Icon type="ios-musical-notes-outline" class="icon" />
          <p>本地音乐</p>
        </div>
        <div class="item">
          <Icon type="md-download" class="icon" />
          <p>本地下载</p>
        </div>
        <div class="item">
          <Icon type="ios-radio" class="icon" />
          <p>我的电台</p>
        </div>
        <div class="item">
          <Icon type="ios-star-outline" class="icon" />
          <p>我的收藏</p>
        </div>
      </div>
      <div class="my-music">
        <div class="title">
          <p>我的音乐</p>
        </div>
        <div class="card">
          <div class="card-item">
            <div class="icon-bar">
              <Icon type="md-heart-outline" class="icon" />
              <p>我喜欢的音乐</p>
            </div>
          </div>
          <div class="card-item">
            <div class="mask">
              <div class="icon-bar">
                <Icon type="md-radio" class="icon" />
                <p>私人FM</p>
              </div>
            </div>
          </div>
          <div class="card-item">
            <div class="icon-bar">
              <Icon type="ios-people-outline" class="icon" />
              <p>因乐交友</p>
            </div>
          </div>
        </div>
        <!--  -->
        <div class="new">
          <group-title :more="false">
            <div slot="title">
              <span :class="createActive?'active':''" @click="getCreateActive">创建歌单</span>
              <span class="split">|</span>
              <span :class="collectActive?'active':''" @click="getCollectActive">收藏歌单</span>
            </div>
          </group-title>
          <!-- 创建歌单 -->
          <div class="new-song scrollStyle grid-block" ref="scroller1" v-if="createActive">
            <div
              class="list-item"
              v-for="item in musicList[0].children"
              :key="item.id"
              @click="goToList(item.path)"
            >
              <avatar :src="item.coverImgUrl"></avatar>
              <div class="list-mes">
                <p>{{item.name}}</p>
                <span>{{item.trackCount+'首'}}</span>
              </div>
            </div>
          </div>
          <!-- 收藏歌单 -->
          <div class="new-album scrollStyle grid-block" ref="scroller2" v-else>
            <div
              class="list-item"
              v-for="item in musicList[1].children"
              :key="item.id"
              @click="goToList(item.path)"
            >
              <avatar :src="item.coverImgUrl"></avatar>
              <div class="list-mes">
                <p>{{item.name}}</p>
                <span>{{item.trackCount+'首'}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import SongItem from '@/components/commont/SongItem'
import GroupTitle from '@/components/commont/GroupTitle'
import Avatar from '@/components/commont/Avatar'
export default {
  components: { Avatar, GroupTitle },
  data() {
    return {
      userId: '',
      // 勾选法律
      single: false,
      // 抖动
      shake: false,
      // 是否登录
      isLogin: false,
      // 用户资料
      userList: [],
      // 歌单列表
      musicList: [],
      createActive: true,
      collectActive: false
    }
  },
  created() {
    const idStore = window.localStorage.getItem('__userId__')
    if (idStore) {
      this.getUser(idStore)
    }
  },
  methods: {
    login() {
      this.checkLaw()
      console.log(this.userId, this.single)
    },
    // 立即体验
    push() {
      this.$router.push('discovery')
    },
    // 勾选用户隐私
    checkLaw() {
      if (!this.single) {
        this.shake = true
        this.$Message.config({
          top: 420
        })
        this.$Message.info('请勾选同意《用户协议》和《隐私政策》')
        setTimeout(() => {
          this.shake = false
        }, 510)
        return false
      }
      this.getUser(this.userId)
    },
    // 登录
    async getUser(id) {
      const { data: res } = await this.$http.get('user/detail', {
        params: { uid: id }
      })
      console.log(res)
      this.isLogin = true
      // 用户资料
      this.userList = res.profile
      window.localStorage.setItem('__userId__', res.profile.userId)
      // 获取用户歌单信息
      const { data: con } = await this.$http.get('user/playlist', {
        params: { uid: id }
      })
      console.log(con)
      this.musicList = this.categorizeMusicList(
        con.playlist,
        res.profile.userId
      )
    },
    // 对用户的歌单进行分类 创建歌单，收藏歌单
    categorizeMusicList(lists, id) {
      const createLists = []
      const collectLists = []
      const retLists = []
      // 根据id判断歌单是否用户创建
      lists.forEach(list => {
        const { userId } = list
        if (id === userId) {
          createLists.push(list)
        } else {
          collectLists.push(list)
        }
      })

      // 给歌单添加路由地址
      const getMusicListPath = list =>
        list.map(({ id, name, coverImgUrl, trackCount }) => ({
          path: `/m/list/${id}`,
          id: id,
          name: name,
          coverImgUrl: coverImgUrl,
          trackCount: trackCount
        }))

      if (createLists.length) {
        retLists.push({
          id: 2,
          title: '创建的歌单',
          children: getMusicListPath(createLists)
        })
      }

      if (collectLists.length) {
        retLists.push({
          id: 3,
          title: '收藏的歌单',
          children: getMusicListPath(collectLists)
        })
      }
      console.log(retLists)
      return retLists
    },
    // 切换模式
    getCreateActive() {
      this.createActive = true
      this.collectActive = false
      this.$nextTick(() => {
        this.$refs.scroller1.scrollTo({
          left: 0,
          behavior: 'smooth'
        })
      })
    },
    getCollectActive() {
      this.createActive = false
      this.collectActive = true
      this.$nextTick(() => {
        this.$refs.scroller2.scrollTo({
          left: 0,
          top: 0,
          behavior: 'smooth'
        })
      })
    },
    goToList(path) {
      this.$router.push(path)
    },
    // 退出登录
    ok() {
      this.$Message.info('退出成功')
      window.localStorage.clear()
      this.isLogin = false
    }
  },
  computed: {}
}
</script>

<style lang="less" scoped>
.user {
  .unlogin {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .logo {
      margin: 110px 0 60px;
    }
    .login-bar {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      p {
        font-size: 16px;
      }
      .input-bar {
        margin: 20px 0;
      }
      .btn {
        width: 100px;
      }
    }
    .other-way {
      margin: 30px 0;
      font-size: 35px;
      .icon {
        margin: 0 15px;
      }
    }
    .law {
      .ivu-checkbox {
        margin-right: 10px;
      }
    }
  }
  .login {
    margin-top: 40px;
    .user-mes {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin: 55px 10px 20px;
      position: relative;
      .nickname {
        margin: 0 10px;
        font-size: 14px;
      }
      .logout {
        position: absolute;
        right: 50px;
      }
    }
    .operation {
      display: flex;
      justify-content: space-between;
      margin: 0 10px;
      .item {
        text-align: center;
        .icon {
          margin-bottom: 5px;
          font-size: 25px;
        }
      }
    }
    .my-music {
      margin-top: 20px;
      padding: 20px 10px 44px;
      border-radius: 20px 20px 0 0;
      background: rgba(224, 231, 236, 0.3);
      .title {
        font-size: 18px;
        color: #000000;
        margin-bottom: 10px;
      }
      .card {
        display: flex;
        justify-content: space-between;

        .card-item {
          width: 110px;
          height: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          background: rgba(174, 174, 174, 0.6);
          border-radius: 10px;
          .icon {
            font-size: 24px;
            margin-bottom: 6px;
          }
        }
      }
      .new {
        margin-top: 20px;
        .title {
          span {
            color: #cccccc;
          }
          .split {
            margin: 0 10px;
          }
          .active {
            color: #000000;
          }
        }
        .grid-block {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          &.grid-block::-webkit-scrollbar {
            display: none;
          }
        }
        .list-item {
          width: 200px;
          margin-bottom: 10px;
          padding-right: 5px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .avatar {
            margin-right: 5px;
          }
        }
      }
    }
  }
}

.scrollStyle {
  width: 100%;
  margin: 10px 0;
  overflow-x: auto;
}
.shake {
  animation: shake 0.5s linear;
}
@keyframes shake {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-20px);
  }
  50% {
    transform: translateX(0);
  }
  //   60% {
  //     transform: translateX(20px);
  //   }
  75% {
    transform: translateX(20px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
