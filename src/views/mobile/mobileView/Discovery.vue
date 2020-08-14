<!--
  发现页
  @author yang 2020-7-13
  @interface banner - 获取广告信息
  @interface personalized - 获取推荐歌单信息
  @interface personalized/newsong - 获取最新音乐
  @interface /top/album - 获取新碟
  @params {Number} id - 歌曲id
  @params {String} img - 歌曲封面图片地址
  @params {String} name - 歌曲名称
  @params {Array} artists - 歌手名
-->
<template>
  <div class="discovery">
    <!-- 轮播图 -->
    <Carousel autoplay loop class="carousel">
      <CarouselItem v-for="(item,i) in banners" :key="i">
        <div class="demo-carousel">
          <img :src="item.imageUrl" alt />
        </div>
      </CarouselItem>
    </Carousel>

    <!-- 推荐区域 -->
    <bar>
      <bar-item v-for="item in barMenu" :key="'bar'+item.id">
        <Icon :type="item.type" slot="bar-image" class="bar-image" />
        <p slot="bar-text">{{item.title}}</p>
      </bar-item>
    </bar>

    <!-- 推荐歌单 -->
    <div class="newlist distan">
      <div class="desc">
        <p>歌单精选</p>
        <div class="more">查看更多</div>
      </div>
      <div class="list">
        <recom-list
          v-for="item in recommendation"
          :key="item.id"
          :img="item.picUrl"
          :name="item.name"
          :count="item.playCount"
          :width="'100px'"
          :id="item.id"
        ></recom-list>
      </div>
    </div>

    <!-- 推荐歌曲 -->
    <div class="recom-song distan">
      <group-title>
        <p slot="title">音为爱 所以爱</p>
        <span>播放全部</span>
      </group-title>
      <div class="recom-song-group scrollStyle" ref="list">
        <song-item
          v-for="item in recomSong"
          :key="item.id"
          :id="item.id"
          :img="item.picUrl"
          :name="item.name"
          :artists="item.song.artists"
        ></song-item>
      </div>
    </div>

    <!-- 新歌/新碟 -->
    <div class="new">
      <group-title>
        <div slot="title">
          <span :class="songActive?'active':''" @click="getSongActive">新歌</span>
          <span class="split">|</span>
          <span :class="albumActive?'active':''" @click="getAlbumActive">新碟</span>
          <!-- <span v-for="(item,i) in newTitle" :key="item.id">
            {{item.title}}
            <span v-if="newTitle.length-1>i">|</span>
          </span>-->
        </div>
        <span v-if="songActive">更多新歌</span>
        <span v-else>更多新碟</span>
      </group-title>
      <!-- 新歌 -->
      <div class="new-song scrollStyle grid-block" v-if="songActive" ref="scroller1">
        <song-item
          v-for="item in newAlbum"
          :key="item.id"
          :id="item.id"
          :img="item.picUrl"
          :name="item.name"
          :artists="item.artists"
        ></song-item>
      </div>
      <!-- 新碟 -->
      <div class="new-album scrollStyle grid-block" ref="scroller2" v-else>
        <song-item
          v-for="item in newAlbum"
          :key="item.id"
          :id="item.id"
          :img="item.picUrl"
          :name="item.name"
          :artists="item.artists"
        ></song-item>
      </div>
    </div>
  </div>
</template>

<script>
import BarItem from '@/components/commont/BarItem'
import Bar from '@/components/commont/Bar'
import RecomList from '@/components/commont/MoblieRecomList'
import SongItem from '@/components/commont/SongItem'
import GroupTitle from '@/components/commont/GroupTitle'
export default {
  name: 'discovery',
  components: { BarItem, Bar, RecomList, SongItem, GroupTitle },
  data() {
    return {
      banners: [], // 广告信息
      // 推荐区域信息
      barMenu: [
        {
          id: 1,
          title: '每日推荐',
          type: 'md-calendar'
        },
        {
          id: 2,
          title: '歌单',
          type: 'md-list'
        },
        {
          id: 3,
          title: '排行榜',
          type: 'md-podium'
        },
        {
          id: 4,
          title: '电台',
          type: 'md-musical-notes'
        },
        {
          id: 5,
          title: '私人FM',
          type: 'md-radio'
        }
      ],
      recommendation: [], // 推荐歌单
      recomSong: [], // 推荐音乐
      songActive: true, // 新歌/新碟栏标题
      albumActive: false, // 新歌/新碟栏标题
      newAlbum: [],
      // 滑动鼠标位置
      startx: 0,
      movex: 0,
      flag: false,
      translatex: 0,
      index: 0
    }
  },
  created() {
    this.getbanner()
    this.getRecommendation()
    this.getRecomSong()
    this.getNewAlbum()
  },
  methods: {
    // 获取广告专辑
    async getbanner() {
      const { data: res } = await this.$http.get('banner')
      this.banners = res.banners
      console.log(this.banners)
    },
    // 获取推荐歌单
    async getRecommendation() {
      const { data: res } = await this.$http.get('personalized', {
        params: { limit: 6 }
      })
      console.log(res)
      if (res.code !== 200) {
        return this.$Message.error('获取推荐歌单失败！')
      }
      this.recommendation = res.result
    },
    // 获取新音乐
    async getRecomSong() {
      const { data: res } = await this.$http.get('personalized/newsong')
      console.log(res)
      if (res.code !== 200) {
        return this.$Message.error('获取推荐歌单失败！')
      }
      this.recomSong = res.result
    },
    // 获取新碟
    async getNewAlbum() {
      const { data: res } = await this.$http.get('/top/album', {
        params: { limit: 9 }
      })
      console.log(res)
      if (res.code !== 200) {
        return this.$Message.error('获取推荐歌单失败！')
      }
      this.newAlbum = res.albums
    },
    // 切换新歌/新碟
    getSongActive() {
      this.songActive = true
      this.albumActive = false
      this.$nextTick(() => {
        this.$refs.scroller1.scrollTo({
          left: 0,
          behavior: 'smooth'
        })
      })
    },
    // 切换当前点击的高亮状态
    getAlbumActive() {
      this.songActive = false
      this.albumActive = true
      this.$nextTick(() => {
        this.$refs.scroller2.scrollTo({
          left: 0,
          behavior: 'smooth'
        })
      })
    }

    // 当在这位置进行上下滑无法滑动

    // // 获取滑动开始位置
    // startList(e) {
    //   // console.log(e)
    //   this.startx = e.targetTouches[0].pageX
    // },
    // // 滑动内容跳动距离
    // moveList(e) {
    //   // console.log(e)
    //   this.movex = e.targetTouches[0].pageX - this.startx
    //   this.flag = true
    //   e.preventDefault()
    // },
    // // 手指离开时判断是播放还是回弹
    // moveListEnd() {
    //   if (this.flag) {
    //     if (Math.abs(this.movex) > 50) {
    //       if (this.movex > 0 && this.translatex !== 0) {
    //         this.index--
    //       } else if (this.movex < 0 && this.index < 4) {
    //         this.index++
    //       }
    //       this.translatex = -this.index * 340
    //       this.$refs.list.scrollTo({
    //         left: -this.translatex,
    //         behavior: 'smooth'
    //       })
    //     } else {
    //       this.translatex = -this.index * 340
    //       this.$refs.list.scrollTo({
    //         left: this.translatex,
    //         behavior: 'smooth'
    //       })
    //     }
    //   }
    // }
  }
}
</script>

<style lang="less" scoped>
.discovery {
  width: 100%;
  padding: 38px 10px;
  overflow: hidden;
}
// 组件间距
.distan {
  margin: 20px 0;
}
.scrollStyle {
  width: 100%;
  margin: 10px 0;
  overflow-x: auto;
}
// 轮播图
.carousel {
  margin: 10px auto 0;
  width: 100%;
  text-align: center;
  .demo-carousel {
    img {
      width: 100%;
      height: 100%;
    }
  }
}
// 推荐区域
.bar {
  margin: 8px 0;
  .bar-image {
    font-size: 24px;
    font-weight: 600;
    color: #fff8dc;
  }
}
// 推荐歌单
.newlist {
  .desc {
    line-height: 20px;
    p {
      display: inline-block;
      font-size: 18px;
      font-weight: 600;
    }
    .more {
      font-size: 10px;
      float: right;
      padding: 0 8px;
      border: 1px solid #cccccc;
      border-radius: 15px;
      &:hover {
        background: rgba(181, 202, 221, 0.5);
      }
    }
  }
  .list {
    width: 100%;
    margin-top: 10px;
    overflow-x: auto;
    &.list::-webkit-scrollbar {
      display: none;
    }
  }
}
// 推荐音乐
.recom-song {
  .recom-song-group {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    scroll-snap-type: x mandatory;
    .recom-song-item {
      scroll-snap-align: left;
    }
    &.recom-song-group::-webkit-scrollbar {
      display: none;
    }
  }
}
// 新歌新碟
.new {
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
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr;
    &.grid-block::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
