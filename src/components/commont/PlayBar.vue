<!--
  播放栏
  @author yang 2020-7-13
  @params {Number} id - 歌单id
  @params {String} img - 歌单封面图片地址
  @params {String} name - 歌单名称
  @params {Number} count - 歌单播放量
-->
<template>
  <div class="play-bar" :style="{background:background}" v-show="musicMes.id">
    <div class="song" @click="showCover">
      <!-- 图片区域 -->
      <avatar :src="musicMes.picUrl" :width="'35px'" :radius="'50%'"></avatar>
      <!-- 歌曲信息 -->
      <div class="artist">
        <p>{{musicMes.name}}</p>
        <span>{{musicMes.artists.join(' / ')}}</span>
      </div>
    </div>

    <Icon :type="iconType" class="icon" @click="changeIcon" />
    <Icon type="md-list-box" class="icon" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Avatar from './Avatar'
export default {
  name: 'PlayBar',
  props: {
    background: {
      type: String,
      default: '#f5f7f9'
    }
  },
  components: { Avatar },
  computed: {
    ...mapState(['musicMes', 'iconType'])
  },
  methods: {
    /**
     * 歌词播放页
     */
    showCover() {
      this.$store.commit('showPlayCover')
    },
    /**
     *  播放暂停切换
     */
    changeIcon() {
      this.$store.commit('change')
    }
  }
}
</script>

<style lang="less" scoped>
.play-bar {
  height: 44px;
  display: flex;
  align-items: center;
  // 歌曲信息部分
  .song {
    width: 80%;
    display: flex;
    align-items: center;
    //   头像
    .avatar {
      margin: 0 10px;
    }
    // 歌手信息
    .artist {
      p {
        font-size: 14px;
      }
      span {
        color: #b9b3b3;
      }
    }
  }
  // icon
  .icon {
    font-size: 24px;
    margin: 0 5px;
    line-height: 44px;
  }
}
</style>
