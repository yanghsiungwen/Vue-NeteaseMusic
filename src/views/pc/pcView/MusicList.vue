<!--
  pc端歌单列表
  @author yang 2020-7-13
  @components {Header}
-->
<template>
  <div class="list">
    <!-- 无限滚动加载 -->
    <Scroll :on-reach-bottom="handleReachBottom" :height="600">
      <Header ref="header"></Header>
      <!-- 歌单歌曲列表 -->
      <Table
        stripe
        :columns="tableTitle"
        :data="trimTableValue"
        :style="{'margin-top':'10px'}"
        @on-row-dblclick="playSongs"
        :row-class-name="addActive"
      ></Table>
      <!-- <song-table :songs="tableValue" :title="tableTitle"></song-table> -->
    </Scroll>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'
import Header from './MusicListHeader'
// import SongTable from '@/components/SongTable'
export default {
  components: { Header },
  data() {
    return {
      // 音乐歌单列表标题
      tableTitle: [
        {
          type: 'index',
          width: '70px',
          align: 'center',
        },
        {
          title: '音乐标题',
          key: 'name',
        },
        {
          title: '歌手',
          key: 'artist',
        },
        {
          title: '专辑',
          key: 'album',
        },
        {
          title: '时长',
          key: 'dt',
          width: '100px',
        },
      ],
      // 处理的歌单
      trimTableValue: [],
    }
  },
  created() {
    this.init()
  },
  methods: {
    /**
     * 页面初始化
     * @interface '/playlist/detail/:id' 歌单详情页
     */
    init() {
      this.$store.dispatch('asyncGetSongList', this.id)
      console.log(this.trimTableValue)
      console.log(this.tableValueCopy)
    },
    /**
     * 双击播放歌曲
     * @param {Object} obj - 点击获取触发事件对象
     * @param {Number} i - 点击获取当前对象的索引号
     * */
    playSongs(obj, i) {
      this.$store.dispatch('getSong', obj.id)
      this.getPlayMenuList = _.cloneDeep(this.tableValue)
      console.log(this.tableValue)
      console.log(this.getPlayMenuList)
    },
    // 滚动到顶部
    scrollToHeader() {
      const { header } = this.$refs
      if (header) {
        header.$el.scrollIntoView({ behavior: 'smooth' })
      }
    },
    /**
     * 无线滚动加载歌单函数，一次加载10个
     * */
    handleReachBottom() {
      return new Promise((resolve) => {
        if (this.tableValueCopy.length) {
          const arr1 = this.tableValueCopy.splice(0, 10)
          this.trimTableValue = [...this.trimTableValue, ...arr1]
        } else {
          this.$Notice.info({
            title: '温馨提示',
            desc: '已经没有更多的歌曲了，请回头听每首歌曲都是精品网抑云！！！',
          })
        }
        resolve()
      })
    },
    /**
     * 当前播放歌曲高亮，添加类名
     * @param {Object} row 当前行的数据
     * @param {Number} index 当前行的索引号
     */
    addActive(row, index) {
      if (this.isActive(row)) {
        return 'active'
      }
    },
    /**
     * 判断当前歌曲与当前行id
     * @param {Object} song 歌曲数据
     */
    isActive(song) {
      return song.id === this.musicMes.id
    },
    /**
     * 判断当前歌曲与当前行index
     * @param {Number} index 歌曲的索引
     */
    // isActive(song){
    //   return song.id === this.musicMes.id
    // }
  },
  computed: {
    ...mapState(['tableValue', 'musicMes']),
    // 深拷贝歌单数据，splice 方法会修改数组所以用到 get set
    tableValueCopy: {
      get() {
        return JSON.parse(JSON.stringify(this.tableValue))
      },
      set(newVal) {
        return newVal
      },
    },
    // 设置播放列表歌单，需要修改数据所以使用 get set
    getPlayMenuList: {
      get() {
        return this.playMenuList
      },
      set(newVal) {
        this.$store.commit('setPlayMenuList', newVal)
      },
    },
    id() {
      // 路由地址的id值
      return Number(this.$route.params.id)
    },
  },
  watch: {
    id: {
      // 监听路由地址id的变化，实现歌单数据获取初始化
      handler() {
        this.init()
        this.scrollToHeader()
      },
    },
    tableValue() {
      // 监听获取的歌单数据变化，发生改变即修改渲染数据
      this.trimTableValue = this.tableValueCopy.splice(0, 10)
    },
  },
}
</script>

<style lang="less">
// 当前播放歌曲高亮
.ivu-table .active td {
  color: #4120d1 !important;
  background: #e9eff5 !important;
}
</style>
