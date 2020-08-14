<!--
  歌曲信息小组件
  @author yang 2020-7-13
  @interface song/detial - 获取歌单详细信息
  @params {Number} id - 歌曲id
  @params {String} img - 歌曲封面图片地址
  @params {String} name - 歌曲名称
  @params {Array} artists - 歌手名
-->
<template>
  <div class="recom-song-item">
    <div class="recom-image" @click="getsongId">
      <img v-lazy="img" />
    </div>
    <div class="recom-text">
      <div class="songName">{{name}}</div>
      <span class="split-tag">-</span>
      <div class="artists" v-if="artists">
        <span v-for="(item,i) in artists" :key="item.id">
          {{item.name}}
          <span v-if="artists.length-1>i">/</span>
        </span>
      </div>
    </div>
    <div class="recom-play">
      <div class="bg">
        <Icon type="md-play" class="btn" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SongItem',
  props: {
    id: Number,
    img: String,
    name: String,
    artists: Array
  },
  methods: {
    getsongId() {
      this.$store.dispatch('getSong', this.id)
    }
  },
  computed: {
    /**
     * 格式化歌手信息
     */
    parseArtists() {
      return this.artists.join(' / ')
    }
  }
}
</script>

<style lang="less" scoped>
.recom-song-item {
  display: flex;
  width: 340px;
  padding: 3px 0;
  align-items: center;
  user-select: none;
  border-radius: 10px;

  .recom-image {
    img {
      width: 60px;
      height: 60px;
      border-radius: 10px;
      cursor: pointer;
    }
  }

  .recom-text {
    display: flex;
    justify-content: flex-start;
    text-align: center;
    width: 200px;
    margin: 0 20px 0 10px;
    .songName {
      margin-right: 10px;
    }
    .split-tag {
      color: #b9b3b3;
    }
    .artists {
      margin-left: 5px;
      color: #b9b3b3;
      cursor: pointer;
    }
  }

  .recom-play {
    top: 25%;
    left: 25%;
    cursor: pointer;
    .bg {
      height: 26px;
      width: 26px;
      line-height: 26px;
      .btn {
        padding: 8px;
        border-radius: 50%;
        color: #fff8dc;
        background: rgb(136, 189, 243);
      }
    }
  }
}
</style>
