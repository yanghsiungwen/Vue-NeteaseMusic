<!--
  移动端栏目的标题
  @author yang 2020-7-13
  @param {Boolean} more - 控制显示右侧的按钮显示
-->
<template>
  <div class="desc">
    <div class="title">
      <slot name="title"></slot>
    </div>
    <div class="more" v-if="more">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GroupTitle',
  props: {
    more: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="less" scoped>
.desc {
  line-height: 20px;
  .title {
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
</style>
