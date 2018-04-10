<template>
  <div id="#app">
    <v-Header></v-Header>
    <div class="tab">
      <router-link class="tab-item" to="/goods">商品</router-link>
      <router-link class="tab-item" to="/ratings">评论</router-link>
      <router-link class="tab-item" to="/seller">商家</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import vHeader from './components/header/header'

export default {
  name: 'App',
  components: {
    vHeader: vHeader
   }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    .tab-item
      flex: 1
      text-align:center
</style>
