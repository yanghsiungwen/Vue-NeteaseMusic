<!--
  搜索框
  @author yang 2020-7-13
  @interface /search/hot - 热搜列表(简略)
  @interface /search/suggest - 搜索建议
  @params {String} src - 图片地址
  @params {String} width - 图片宽度/高度
  @params {String} radius - 图片圆角大小
-->
<template>
  <div class="search" v-clickoutside:click="hideShow">
    <!-- 输入框 -->
    <Input
      search
      enter-button
      @on-focus="onFocus"
      @on-change="onChange(inputValue)"
      v-model.trim="inputValue"
      ref="input"
      placeholder="搜索音乐，视频，歌曲，电台"
    />
    <!-- 搜索内容显示框 -->
    <div class="search-panel" v-show="showToggle">
      <!-- 搜索关键字内容 -->
      <div class="search-tips" v-if="tipsShow">
        <div class="block" v-for="(normalizeSuggest,index) in normalizeSuggests" :key="index">
          <div class="title">{{normalizeSuggest.title}}</div>
          <div class="song-list">
            <ul>
              <li v-for="item in normalizeSuggest.data" :key="item.id" class="list-item">
                <span>{{item.name}}</span>
                <span v-if="item.artists">{{' - '}}</span>
                <span v-for="(aritst,i) in item.artists" :key="aritst.id">
                  {{aritst.name}}
                  <span v-if="item.artists.length-1>i">/</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 热搜内容 -->
      <div class="search-hot" v-else>
        <!-- 热搜列表 -->
        <div class="block-hot">
          <div class="title">热门搜索</div>
          <div class="hot-item">
            <Button
              class="btn"
              size="small"
              v-for="(item,index) in searchHots"
              :key="index"
            >{{item.first}}</Button>
          </div>
        </div>
        <!-- 搜索历史列表 -->
        <div class="block-his">
          <div class="title">搜索历史</div>
          <div class="content">--没有搜索历史--</div>
        </div>
      </div>
    </div>
    <!-- </toggle> -->
  </div>
</template>

<script>
import { getSearchSuggest } from '@/api'
// import { genArtistisText } from '@/until'
import { debounce } from 'lodash'
import Clickoutside from '@/utils/clickoutside.js'
// import Toggle from './Toggle'
export default {
  name: 'Search',
  // components: { Toggle },
  data() {
    return {
      showToggle: false, // 是否展示搜索信息框
      inputValue: '', // 输入框内容
      searchHots: [], // 热门搜索信息
      suggest: {}, // 搜索关键词得到的信息
    }
  },
  computed: {
    /**
     * 是否显示关键词搜索框
     */
    tipsShow() {
      return (
        this.inputValue.length &&
        ['songs', 'playlist'].find((key) => {
          return this.suggest[key] && this.suggest[key].length
        })
      )
    },
    // 列表展示内容
    normalizeSuggests() {
      return [
        {
          title: '单曲',
          data: this.suggest.songs,
        },
        {
          title: '歌单',
          data: this.suggest.playlists,
        },
        {
          title: 'MV',
          data: this.suggest.mvs,
        },
      ].filter((item) => item.data && item.data.length)
    },
  },
  directives: {
    Clickoutside,
  },
  async created() {
    /**
     * 获取热搜信息
     */
    const {
      data: {
        result: { hots },
      },
    } = await this.$http.get('search/hot')
    console.log(hots)
    this.searchHots = hots
  },
  methods: {
    // 展示下拉框
    onFocus() {
      this.showToggle = true
    },
    hideShow() {
      this.showToggle = false
    },
    /**
     * 搜索内容变化动态显示搜索结果
     * @param {String} val - 输入内容
     * 防抖，控制在0.5s请求一次
     */
    onChange: debounce(function (val) {
      if (!val.trim()) {
        return
      }
      // 关键词搜索
      getSearchSuggest(val).then(({ data: { result } }) => {
        this.suggest = result
        console.log(this.suggest)
      })
    }, 500),
  },
}
</script>

<style lang="less" scoped>
li {
  list-style: none;
}
.search {
  position: relative;

  .ivu-input-with-search {
    margin: 16px auto;
    width: 300px;
    vertical-align: middle;
  }
  .search-panel {
    z-index: 9;
    position: absolute;
    width: 360px;
    background: rgba(233, 239, 245, 1);
    .search-tips {
      overflow-y: auto;
      .block {
        margin-bottom: 20px;
        .title {
          margin: 10px;
          font-size: 14px;
          font-weight: 600;
          height: 20px;
          line-height: 20px;
        }
        .list-item {
          padding: 2px 10px;
          height: 30px;
          line-height: 30px;
          cursor: pointer;
          &:hover {
            background: paleturquoise;
          }
        }
      }
    }
    .search-hot {
      .block-hot {
        margin: 10px;
        .title {
          font-size: 14px;
          height: 20px;
          line-height: 20px;
        }
        .hot-item {
          overflow: hidden;
          .btn {
            float: left;
            margin: 1px 2px;
          }
        }
      }
      .block-his {
        margin: 10px;
        .title {
          font-size: 14px;
          height: 20px;
          line-height: 20px;
        }
        .content {
          height: 26px;
          line-height: 26px;
          display: flex;
          justify-content: center;
        }
      }
    }
  }
}
</style>
