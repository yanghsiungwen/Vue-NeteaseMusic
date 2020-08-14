<!--
  发现页推荐区的组件
  @author yang 2020-7-13
-->
<template>
  <div class="item">
    <div class="img">
      <slot name="bar-image"></slot>
    </div>
    <p>
      <slot name="bar-text"></slot>
    </p>
  </div>
</template>

<script>
export default {
  name: 'BarItem'
}
</script>

<style lang="less" scoped>
.item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  .img {
    padding: 8px;
    border-radius: 50%;
    background: rgb(136, 189, 243);
    margin-bottom: 5px;
  }
}
</style>
