<!--
  推荐歌单小组件
  @author yang 2020-7-13
  @params {Number} id - 歌单id
  @params {String} img - 歌单封面图片地址
  @params {String} name - 歌单名称
  @params {Number} count - 歌单播放量
  @params {Boolean} showPlay - 是否展示播放按钮
  @params {String} width - 封面图片大小
-->
<template>
  <div class="item" @click="showPlayList" :style="{width:this.width}">
    <div class="image">
      <img v-lazy="img" :style="{width:this.width,height:this.width}" />
    </div>
    <div class="text">
      <p>{{name}}</p>
    </div>
    <div class="count">
      <Icon type="ios-play" />
      <span>{{countNum}}</span>
    </div>
    <div class="play">
      <div class="bg">
        <Icon type="md-play" class="btn" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecomList',
  props: {
    id: Number,
    img: String,
    name: String,
    count: Number,
    width: {
      type: String,
      default: '210px'
    }
  },
  methods: {
    /**
     * 点击跳转歌单详情
     * @param {Number} id - 歌单id
     * */
    showPlayList() {
      this.$router.push('/list/' + this.id)
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
.item {
  position: relative;
  width: 210px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}
.item .image img {
  width: 210px;
  height: 210px;
  border-radius: 10px;
  transition: 0.3s;
}
.count {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f0eaea;
  font-size: 12px;
}
.play {
  visibility: hidden;
  position: absolute;
  bottom: 55px;
  right: 5px;
  transition: 0.05s;
}
.bg {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50px;
}
.item:hover img {
  box-shadow: 0 0 10px black;
  transform: scale(1.01);
}
.item:hover .play {
  visibility: visible;
}
</style>
