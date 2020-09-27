<!--
  pc端发现页
  @author yang 2020-7-13
  @interface personalized/newsong 获取最新歌曲
  @interface personalized 获取推荐歌单
  @interface banner 获取广告信息
-->
<template>
  <div>
    <!-- 轮播图 -->
    <carousel3d
      autoplay
      :autoplayTimeout="3000"
      width="499"
      height="185"
      space="250"
      controlsVisible
      border="0"
      v-if="banners.length"
    >
      <slide v-for="(slide,i) in banners" :key="i" :index="i">
        <img v-lazy="slide.imageUrl" />
      </slide>
    </carousel3d>
    <!-- 推荐歌单 -->
    <Card dis-hover class="recommendation" width="1300" :bordered="noBorder">
      <a slot="title">
        推荐歌单
        <Icon type="md-arrow-dropright" />
      </a>
      <div class="card">
        <recom-list
          v-for="item in recommendation"
          :key="item.id"
          :id="item.id"
          :img="item.picUrl"
          :name="item.name"
          :count="item.playCount"
        ></recom-list>
      </div>
    </Card>
    <!-- 最新音乐 -->
    <Card dis-hover class="recommendation" width="1300" :bordered="noBorder">
      <a slot="title">
        最新音乐
        <Icon type="md-arrow-dropright" />
      </a>
      <div class="card-newest">
        <div class="newsong" v-for="(item,index) in newSong" :key="item.id">
          <div class="image-newest" @click="getsongId(item.id)">
            <img :src="item.picUrl" />
            <div class="newset-play">
              <div class="bg">
                <Icon type="md-play" class="btn" />
              </div>
            </div>
          </div>
          <div class="num">{{(index+1+'').padStart(2,'0')}}</div>
          <div class="text-newest">
            <div class="songName">{{item.name}}</div>
            <div class="artists">
              <span v-for="(item2,i) in item.song.artists" :key="item2.id">
                {{item2.name}}
                <span v-show="item.song.artists.length-1>i">/</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
// 导入轮播图
import { Carousel3d, Slide } from 'vue-carousel-3d'
import RecomList from '@/components/commont/RecomList'
import { getRecomList, getNewSong, getBannerList } from '@/api'
export default {
  // 注册轮播图组件
  components: {
    Carousel3d,
    Slide,
    RecomList,
  },
  data() {
    return {
      // 广告数据
      banners: [],
      // 推荐歌单数据
      recommendation: [],
      // 卡片视图样式
      noBorder: false,
      // 最新歌曲
      newSong: [],
      // 歌曲地址
      songUrl: '',
    }
  },
  created() {
    // 获取广告专辑
    this.getbanner()
    // 获取推荐歌单
    this.getRecommendation()
    // 获取新音乐
    this.getnewSong()
  },
  methods: {
    // 获取广告专辑
    async getbanner() {
      const { data: res } = await getBannerList()
      this.banners = res.banners
      console.log(res.banners)
    },
    // 获取推荐歌单
    async getRecommendation() {
      const { data: res } = await getRecomList(10)
      console.log(res)
      if (res.code !== 200) {
        return this.$Message.error('获取推荐歌单失败！')
      }
      this.recommendation = res.result
    },
    // 获取新音乐
    async getnewSong() {
      const { data: res } = await getNewSong()
      console.log(res)
      if (res.code !== 200) {
        return this.$Message.error('获取推荐歌单失败！')
      }
      this.newSong = res.result
    },
    // 获取最新歌曲音乐id
    getsongId(id) {
      this.$store.dispatch('getSong', id)
      // this.$store.commit('change')
    },
  },
}
</script>

<style lang="less" scoped>
.carousel-3d-container {
  width: 1150px;
}

/* 推荐歌单样式 */
.recommendation {
  background: #f5f7f9;
  a {
    margin-left: 50px;
    color: #000;
    font-size: 20px;
    font-weight: 600;
  }
  .card {
    display: grid;
    grid-template-columns: 210px 210px 210px 210px 210px;
    grid-template-rows: 260px 260px;
    grid-gap: 30px;
    justify-content: center;
  }
}

/* 最新歌曲样式 */
.card-newest {
  display: grid;
  grid-template-columns: 500px 500px;
  grid-template-rows: 80px;
  /* column-gap: 20px; */
  align-items: center;
  justify-content: space-around;
}
.newsong {
  display: flex;
  padding: 20px 10px;
  align-items: center;
  user-select: none;
  border-radius: 10px;
}
.newsong:hover {
  background: #dfdcdc;
}
.newsong .image-newest {
  position: relative;
}
.newsong .image-newest img {
  width: 60px;
  height: 60px;
  border-radius: 10px;
  cursor: pointer;
}
.newset-play {
  visibility: hidden;
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
}
.newsong .image-newest:hover .newset-play {
  visibility: visible;
}
.newsong .num {
  padding: 0 10px;
  color: #b9b3b3;
}
.text-newest .artists {
  color: #b9b3b3;
  cursor: pointer;
}
.text-newest .artists:hover span {
  color: #3f3f3f;
}
</style>
