<template>
  <div id="app">
    <router-view class="main-content"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
.main-content {
  height: 100%;
  overflow: hidden;
}
</style>
