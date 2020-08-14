<script>
import { mapState } from 'vuex'
// import _ from 'lodash'
export default {
  name: 'SongTable',
  props: {
    songs: {
      type: Array,
      default: () => [],
    },
    title: {
      type: Array,
      default: () => [],
    },
  },
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
      tableValue: this.songs,
    }
  },
  computed: {
    ...mapState(['playMenuList']),
    // 设置播放列表歌单
    getPlayMenuList: {
      get() {
        return this.playMenuList
      },
      set(newVal) {
        this.$store.commit('setPlayMenuList', newVal)
      },
    },
  },
  methods: {
    onPlaySongs(obj, i) {
      this.$store.dispatch('getSong', obj.id)
      this.getPlayMenuList = this.tableValue
      console.log(this.tableValue)
      console.log(this.getPlayMenuList)
    },
  },
  render() {
    const tableAttr = {
      props: {
        data: this.songs,
        columns: this.title,
        stripe: true,
      },
      on: {
        ...this.$listeners,
        'on-row-dblclick': this.onPlaySongs,
      },
      style: {
        'margin-top': '10px',
      },
    }
    return this.songs.length ? <Table {...tableAttr}></Table> : null
  },
}
</script>

<style lang="less" scoped>
</style>
