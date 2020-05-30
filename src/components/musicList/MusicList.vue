<template>
  <div>
    <Row :style="{'margin-top':'10px'}">
      <!-- 歌单封面 -->
      <i-col :span="4" offset="1">
        <div class="listAvatar">
          <img :src="songsList.coverImgUrl" v-show="songsList.coverImgUrl" />
        </div>
      </i-col>

      <!-- 歌单信息 -->
      <i-col :span="8" :style="{'margin-left':'10px'}">
        <!-- 歌单名 -->
        <div class="listName">
          <Tag color="red">歌单</Tag>
          {{songsList.name}}
        </div>

        <!-- 歌单创建者信息 -->
        <div class="creator">
          <img :src="songsList.creator.avatarUrl" v-if="songsList" />
          <span class="nickname">{{songsList.creator.nickname}}</span>
          <span class="createTime">{{changeCreateTime}}</span>创建
        </div>

        <!-- 播放按钮 -->
        <div class="playAll">
          <Button type="error">播放全部</Button>
          <Button class="default">收藏</Button>
          <Button class="default">分享</Button>
          <Button class="default">下载全部</Button>
        </div>

        <!-- 歌单标签 -->
        <div class="tab">
          <span class="title">标签:</span>
          <a href="javascript:;" v-if="songsList.tags.length === 0">添加标签</a>
          <span v-for="(item,i) in songsList.tags" :key="i">
            {{item}}
            <span v-if="songsList.tags.length-1>i" class="split">/</span>
          </span>
        </div>

        <!-- 歌单描述 -->
        <div class="description">
          <span class="title">简介:</span>
          <a href="javascript:;" v-if="songsList.tags.length === 0">添加简介</a>
          <span :title="songsList.description">{{songsList.description}}</span>
        </div>
      </i-col>

      <!-- 歌单数量歌单播放数 -->
      <i-col :span="4">
        <div class="detail">
          <div class="num">
            <span :style="{display:'block'}">歌曲数</span>
            <span>{{songsList.trackCount}}</span>
          </div>
          <div class="playCount">
            <span :style="{display:'block'}">播放数</span>
            <span>{{changePlayCount}}</span>
          </div>
        </div>
      </i-col>
    </Row>
    <!-- 歌单歌曲列表 -->
    <Table
      stripe
      :columns="tableTitle"
      :data="tableValue"
      :style="{'margin-top':'10px'}"
      @on-row-dblclick="playSongs"
    ></Table>
    <div :style="{height:'90px'}"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      // 音乐歌单列表标题
      tableTitle: [
        {
          type: 'index',
          width: '70px',
          align: 'center'
        },
        {
          title: '音乐标题',
          key: 'name'
        },
        {
          title: '歌手',
          key: 'artist'
        },
        {
          title: '专辑',
          key: 'album'
        },
        {
          title: '时长',
          key: 'dt',
          width: '100px'
        }
      ]
    }
  },
  methods: {
    // 获取点播的歌曲url
    playSongs(obj, i) {
      this.$store.dispatch('getSong', obj.id)
      console.log(i)
    }
  },
  computed: {
    ...mapState(['songsList', 'tableValue']),
    // 歌单创建时间
    changeCreateTime() {
      const dt = new Date(this.songsList.createTime)
      const y = dt.getFullYear()
      const m = (dt.getMonth() + 1 + '').padStart(2, '0')
      const d = (dt.getDate() + '').padStart(2, '0')
      return y + '-' + m + ' - ' + d
    },
    // 歌单播放数量
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
  margin-top: 15px;
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
.description {
  height: 74px;
  overflow: hidden;
}
.tab .title,
.description .title {
  font-size: 14px;
  margin-right: 10px;
}
.tab .split {
  margin: 0 3px;
}
.detail {
  margin-top: 5px;
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
.ivu-table:after {
  z-index: -1;
}
</style>
