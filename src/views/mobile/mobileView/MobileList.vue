<template>
  <div class="music-list">
    <div class="header">
      <div class="bar">
        <Icon type="ios-arrow-back" class="icon" @click="goBack" />
        <span>歌单</span>
      </div>
      <div class="bar">
        <Icon type="md-search icon" />
        <Icon type="md-more" class="icon" />
      </div>
    </div>
    <div class="album" v-if="songsList.coverImgUrl">
      <avatar :src="songsList.coverImgUrl" :width="'140px'"></avatar>
      <div class="album-mes">
        <div class="title">{{songsList.name}}</div>
        <div class="username">
          <avatar :src="songsList.creator.avatarUrl" :width="'30px'" :radius="'50%'"></avatar>
          <span>{{songsList.creator.nickname}}</span>
        </div>
        <div class="description">
          <span :title="songsList.description">{{songsList.description}}</span>
        </div>
      </div>
    </div>
    <div class="list-mask">
      <div class="list">
        <ul>
          <li
            class="list-item"
            v-for="(item,index) in tableValue"
            :key="item.id"
            @click="playSongs(item.id)"
          >
            <div class="index">{{ index + 1 }}</div>
            <div class="song">
              <p>{{item.name}}</p>
              <div class="artist">
                <span>{{item.artist}}</span>
                {{' - '}}
                <span>{{item.album}}</span>
              </div>
            </div>
            <div class="more">
              <Icon type="md-more" class="icon" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'
import Avatar from '@/components/commont/Avatar'
export default {
  components: { Avatar },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.$store.dispatch('asyncGetSongList', this.id)
    },
    // 获取点播的歌曲url
    playSongs(id) {
      this.$store.dispatch('getSong', id)
      this.getPlayMenuList = _.cloneDeep(this.tableValue)
      console.log(this.tableValue)
      console.log(this.getPlayMenuList)
    },
    // 退后
    goBack() {
      this.$router.go(-1)
    }
  },
  computed: {
    ...mapState(['tableValue', 'playMenuList', 'songsList']),
    // 设置播放列表歌单
    getPlayMenuList: {
      get() {
        return this.playMenuList
      },
      set(newVal) {
        this.$store.commit('setPlayMenuList', newVal)
      }
    },
    id() {
      return Number(this.$route.params.id)
    }
  }
}
</script>

<style lang="less" scoped>
li {
  list-style: none;
}

.music-list {
  .header {
    margin: 10px 10px 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .bar {
      width: 70px;
      font-size: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .album {
    height: 140px;
    margin: 10px 10px 20px;
    display: flex;
    justify-content: flex-start;
    .avatar {
      margin-right: 20px;
    }
    .title {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 10px;
    }
    .username {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      .avatar {
        display: inline-block;
        margin-right: 10px;
      }
    }
    .description {
      height: 35px;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
  .list-mask {
    padding: 30px 10px 55px;
    background: rgba(224, 231, 236, 0.3);
    backdrop-filter: blur(30px);
    border-radius: 20px 20px 0 0;
    ul {
      width: 100%;
      .list-item {
        height: 50px;
        width: 100%;
        display: flex;
        // justify-content: space-between;
        align-items: center;
        font-size: 14px;
        .index {
          width: 20px;
          text-align: center;
          color: #acacac;
          margin-right: 10px;
        }
        .song {
          width: 300px;
          .artist {
            color: #acacac;
            padding-top: 5px;
            font-size: 12px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
}
</style>
