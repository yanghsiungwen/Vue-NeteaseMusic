<template>
  <div>
    <Row :style="{'margin-top':'10px'}">
      <i-col :span="4" offset="1">
        <div class="listAvatar">
          <img :src="songsList.coverImgUrl" v-show="songsList.coverImgUrl" />
        </div>
      </i-col>
      <i-col :span="8" :style="{'margin-left':'10px'}">
        <div class="listName">
          <Tag color="red">歌单</Tag>
          {{songsList.name}}
        </div>
        <div class="creator">
          <img :src="songsList.creator.avatarUrl" alt />
          <span class="nickname">{{songsList.creator.nickname}}</span>
          <span class="createTime">{{changeCreateTime}}</span>创建
        </div>
        <div class="playAll">
          <Button type="error">播放全部</Button>
          <Button class="default">收藏</Button>
          <Button class="default">分享</Button>
          <Button class="default">下载全部</Button>
        </div>
        <div class="tab">
          <span class="title">标签:</span>
          <Button type="error" v-if="songsList.tags.length === 0">添加标签</Button>
          <span v-for="(item,i) in songsList.tags" :key="i">
            {{item}}
            <span v-if="songsList.tags.length-1>i" class="split">/</span>
          </span>
        </div>
        <div class="detail">
          <div class="num">
            <span>歌曲数</span>
            <span>{{songsList.trackCount}}</span>
          </div>
          <div class="playCount">
            <span>播放数</span>
            <span>{{changePlayCount}}</span>
          </div>
        </div>
      </i-col>
    </Row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  methods: {},
  computed: {
    ...mapState(['songsList']),
    // 创建时间
    changeCreateTime() {
      const dt = new Date(this.songsList.createTime)
      const y = dt.getFullYear()
      const m = (dt.getMonth() + 1 + '').padStart(2, '0')
      const d = (dt.getDate() + '').padStart(2, '0')
      return y + '-' + m + ' - ' + d
    },
    // 播放数量
    changePlayCount() {
      if (this.songsList.playCount < 10000) {
        return this.songsList.playCount
      } else {
        return Math.ceil(this.songsList.playCount / 10000) + '万'
      }
    }
  }
}
</script>

<style scoped>
.listAvatar {
  width: 200px;
  height: 200px;
}
.listAvatar img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
/* 歌单名样式 */
.listName {
  font-size: 20px;
}
.creator {
  height: 50px;
  display: flex;
  /* justify-content: center; */
  align-items: center;
}
.creator img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.creator .nickname {
  margin: 0 10px;
}
/* 歌单按钮 */
.playAll .default {
  margin: 0 5px;
}
.playAll :first-child {
  margin-right: 5px;
}
.tab {
  height: 50px;
  display: flex;
  align-items: center;
}
.tab .title {
  font-size: 14px;
  margin-right: 10px;
}
.tab .split {
  margin: 0 3px;
}
.detail .num {
  display: inline-block;
  width: 48px;
  padding-right: 10px;
  text-align: right;
  border-right: 1px solid grey;
}
.detail .playCount {
  display: inline-block;
  width: 48px;
  text-align: right;
}
</style>
