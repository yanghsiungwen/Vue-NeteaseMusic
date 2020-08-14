<!--
  移动端发现页推荐区域
  @author yang 2020-7-13
-->
<template>
  <div class="bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Bar'
}
</script>

<style lang="less" scoped>
.bar {
  display: flex;
}
</style>
