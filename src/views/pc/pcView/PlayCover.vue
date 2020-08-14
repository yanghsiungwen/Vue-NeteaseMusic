<template>
  <transition name="slider">
    <div v-if="isShowPlayCover">
      <coverLyc></coverLyc>
      <div class="others">
        <div class="allComments">
          <div class="hotComments">
            <p>精彩评论</p>
            <div class="comment" v-for="item in commentList.hotComments" :key="item.commentId">
              <div class="userAvatat">
                <img :src="item.user.avatarUrl" alt />
              </div>
              <div class="content">
                <div class="text">
                  <span>{{item.user.nickname}}:</span>
                  <span class>{{item.content}}</span>
                </div>
                <div class="time">
                  <span>{{item.time | changeTime}}</span>
                  <div class="like">
                    <Icon type="ios-thumbs-up" class="icon" />
                    <span>{{item.likedCount}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="newestcomments">
            <p>最新评论({{commentList.total}})</p>
            <div class="comment" v-for="item in commentList.comments" :key="item.commentId">
              <div class="userAvatat">
                <img :src="item.user.avatarUrl" alt />
              </div>
              <div class="content">
                <div class="text">
                  <span>{{item.user.nickname}}:</span>
                  <span class>{{item.content}}</span>
                </div>
                <div class="time">
                  <span>{{item.time | changeTime}}</span>
                  <div class="like">
                    <Icon type="ios-thumbs-up" class="icon" />
                    <span>{{item.likedCount}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Page
            class="page"
            :total="commentList.total"
            @on-change="getAnotherComment"
            :pageSize="30"
          />
        </div>

        <div class="recommend">
          <p>相似歌曲</p>
          <div class="simiSong" v-for="item in simiSong" :key="item.id">
            <div class="songImg">
              <img :src="item.album.picUrl" alt />
            </div>
            <div>
              <div class="songName">
                <span>{{item.name}}</span>
              </div>
              <div class="artist">
                <span v-for="(item2,i) in item.artists" :key="i">
                  {{item2.name}}
                  <span v-if="item.artists.length-1>i">/</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'
import coverLyc from './CoverLyc'
export default {
  name: 'playCover',
  components: { coverLyc },
  data() {
    return {
      // 评论列表
      commentList: [],
      // 相似歌曲
      simiSong: []
    }
  },
  created() {
    // this.initComment()
  },
  watch: {
    id() {
      this.initComment()
    }
  },
  methods: {
    // 获取首页评论
    initComment() {
      this.getComment()
      this.getSimiSong()
    },
    // 当页码改变获取该页的评论
    getAnotherComment(pageSize) {
      this.getComment(pageSize)
    },
    // 请求歌单信息
    async getComment(pageSize) {
      const params = {
        id: this.musicMes.id,
        limit: 30,
        offset: 0
      }
      params.offset = pageSize ? (pageSize - 1) * 30 : 0
      const { data: res } = await this.$http.get('comment/music', { params })
      console.log(res)
      this.commentList = res
    },
    // 请求相似歌曲
    async getSimiSong() {
      const { data: res } = await this.$http.get('simi/song', {
        params: { id: this.musicMes.id }
      })
      console.log(res)
      this.simiSong = res.songs
    }
  },
  computed: {
    ...mapState(['musicMes', 'isShowPlayCover']),
    id() {
      return this.musicMes.id
    }
  },
  filters: {
    changeTime(val) {
      const dt = new Date(val)
      const y = dt.getFullYear()
      const m = (dt.getMonth() + 1 + '').padStart(2, '0')
      const d = (dt.getDate() + '').padStart(2, '0')
      const hh = (dt.getHours() + '').padStart(2, '0')
      const mm = (dt.getMinutes() + '').padStart(2, '0')
      const ss = (dt.getSeconds() + '').padStart(2, '0')
      return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    }
  }
}
</script>

<style scoped>
/* 评论区 */
.others {
  width: 1100px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.others p {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 15px;
}
.allComments .comment {
  width: 650px;
  /* display: flex;
  align-items: center; */
  border-bottom: 1px solid #dddedf;
  margin-bottom: 10px;
}
.userAvatat {
  vertical-align: top;
  display: inline-block;
}
.userAvatat img {
  height: 35px;
  width: 35px;
  border-radius: 50%;
  margin-right: 10px;
}
.content {
  width: calc(100% - 45px);
  display: inline-block;
}
.text span {
  font-size: 14px;
}
.text span:first-child {
  color: #769acb;
}
.time {
  width: 100%;
  padding: 10px 0;
}
.time .like {
  float: right;
}
.newestcomments {
  margin-top: 50px;
}

/* 页码 */
.allComments .page {
  margin: 20px 0;
  display: flex;
  justify-content: center;
}

/* 相似歌曲 */
.recommend {
  width: 300px;
}
.simiSong {
  width: 100%;
  display: flex;
  align-items: center;
}
.simiSong img {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}
.simiSong {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-bottom: 10px;
}
</style>
