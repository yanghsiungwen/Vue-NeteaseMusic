<!--
  推荐歌单栏
  @author yang 2020-7-13
  @params {Number} id - 歌单id
  @params {String} img - 歌单封面图片地址
  @params {String} name - 歌单名称
  @params {Number} count - 歌单播放量
-->
<template>
  <div class="group">
    <div class="item" @click="showPlayList">
      <div class="image">
        <img :src="img" alt />
      </div>
      <div class="text">
        <p>{{name}}</p>
      </div>
      <div class="count">
        <Icon type="ios-play" />
        <span>{{countNum}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MobileRecomList',
  props: {
    id: Number,
    img: String,
    name: String,
    count: Number
  },
  methods: {
    /**
     * 点击跳转歌单详情
     * @param {Number} id - 歌单id
     * */
    showPlayList() {
      this.$router.push('/m/list/' + this.id)
    }
  },
  computed: {
    /**
     * 格式播放量
     * */
    countNum() {
      if (this.count >= 100000000) {
        return (this.count / 100000000).toFixed(2) + '亿'
      } else {
        return Math.ceil(this.count / 10000) + '万'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.group {
  width: 660px;
  .item {
    position: relative;
    width: 100px;
    height: 140px;
    margin: 0 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    float: left;
    .image img {
      width: 100px;
      height: 100px;
      border-radius: 10px;
      transition: 0.3s;
    }
    .text {
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .count {
      position: absolute;
      top: 2px;
      right: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #f0eaea;
      font-size: 10px;
    }
  }
}
</style>
