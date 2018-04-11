<template>
  <div id="#app">
    <v-Header :seller="seller"></v-Header>
    <div class="tab border-1px">
      <router-link class="tab-item" to="/goods">商品</router-link>
      <router-link class="tab-item" to="/ratings">评论</router-link>
      <router-link class="tab-item" to="/seller">商家</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
import vHeader from 'components/header/header'

const ERR_OK = 0
export default {
  name: 'App',
  data() {
    return {
      seller: {}
    }
  },
  created() {
    // vue-resource方法
    this.$http.get('/api/seller').then((response) => {
        response = response.body
        
        if (ERR_OK === 0) {
          this.seller = response.data
        }
    })
  },
  components: {
    vHeader: vHeader
   }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import 'common/stylus/mixin'
  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    border-1px( rgba(7,17,27,0.1))
    .tab-item
      flex: 1
      display: block
      text-align:center
      text-decoration: none
      font-size: 14px
      color: rgb(77,85,93)
      &.router-link-exact-active
        color: rgb(240,20,20)

</style>
