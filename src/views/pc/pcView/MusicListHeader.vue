<!--
  歌单的信息部分
  @interface playlist/detail 获取歌单的信息
-->
<template>
  <Row :style="{'margin-top':'10px'}" v-if="songsList">
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
        <img v-lazy="songsList.creator.avatarUrl" />
        <span class="nickname">{{songsList.creator.nickname}}</span>
        <span class="createTime">{{changeCreateTime+' 创建'}}</span>
      </div>

      <!-- 播放按钮 -->
      <div class="playAll">
        <Button type="error" class="all">播放全部</Button>
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
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Header',
  computed: {
    ...mapState(['songsList']),
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
    },
  },
}
</script>

<style lang="less" scoped>
.listAvatar {
  width: 200px;
  height: 200px;
  margin-top: 15px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
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

  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }

  .nickname {
    margin: 0 10px;
  }
}

/* 歌单按钮 */
.playAll .default {
  margin: 0 5px;
}
.all {
  margin-right: 5px;
}

.tab {
  height: 50px;
  display: flex;
  align-items: center;
  .split {
    margin: 0 3px;
  }
  .title {
    font-size: 14px;
    margin-right: 10px;
  }
}

.description {
  height: 74px;
  overflow: hidden;
  .title {
    font-size: 14px;
    margin-right: 10px;
  }
}

.detail {
  margin-top: 5px;
  .num {
    display: inline-block;
    width: 48px;
    padding-right: 10px;
    text-align: right;
    border-right: 1px solid grey;
  }
  .playCount {
    display: inline-block;
    width: 48px;
    text-align: right;
  }
}
</style>
