<template>
  <!-- <Carousel
    autoplay
    loop
    v-model="value"
    :autoplay-speed="autoSpeed"
    dots="outside"
    trigger="hover"
  >
    <CarouselItem v-for="item in banners" :key="item.encodeId">
      <div class="demo-carousel">
        <img :src="item.imageUrl" />
      </div>
    </CarouselItem>
  </Carousel>-->
  <div>
    <!-- 轮播图 -->
    <carousel3d autoplay width="499" height="185" space="250" controlsVisible border="0">
      <slide v-for="(slide,i) in banners" :key="i" :index="i">
        <img :src="slide.imageUrl" />
      </slide>
    </carousel3d>
    <!-- 推荐歌单 -->
    <Card dis-hover class="recommendation" width="1300" :bordered="noBorder">
      <a slot="title">
        推荐歌单
        <Icon type="md-arrow-dropright" />
      </a>
      <div class="card">
        <div class="item" v-for="item in recommendation" :key="item.id">
          <div class="image">
            <img :src="item.picUrl" alt />
          </div>
          <div class="text">
            <p>{{item.name}}</p>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import { Carousel3d, Slide } from 'vue-carousel-3d'
export default {
  components: {
    Carousel3d,
    Slide
  },
  data() {
    return {
      // 广告数据
      banners: [],
      // 推荐歌单数据
      recommendation: [],
      // 卡片视图样式
      noBorder: false
    }
  },
  created() {
    // 获取最新专辑
    this.getnewest()
    this.getRecommendation()
  },
  methods: {
    async getnewest() {
      const { data: res } = await this.$http.get('banner')
      console.log(res)
      if (res.code !== 200) {
        return this.$message.error('获取最新专辑失败！')
      }
      this.banners = res.banners
    },
    async getRecommendation() {
      const { data: res } = await this.$http.get('personalized', {
        params: { limit: 10 }
      })
      console.log(res)
      this.recommendation = res.result
    }
  }
}
</script>

<style scoped>
.carousel-3d-container {
  width: 1310px;
}
.recommendation {
  background: #f5f7f9;
}
.card {
  display: grid;
  grid-template-columns: 210px 210px 210px 210px 210px;
  grid-template-rows: 260px 260px;
  grid-gap: 30px;
  justify-content: center;
}
.recommendation a {
  margin-left: 50px;
  color: #000;
  font-size: 20px;
  font-weight: 600;
}
.item {
  width: 210px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}
.item .image img {
  width: 100%;
  border-radius: 10px;
  transition: 0.3s;
}
.item .image img:hover {
  box-shadow: 0 0 10px black;
  transform: scale(1.01);
}
</style>
