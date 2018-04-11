import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Goods from 'components/goods/goods'
import Seller from 'components/seller/seller'
import Ratings from 'components/ratings/ratings'

import 'common/stylus/index.styl'
Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  routes: [
    {
      path: '/',
      component: Goods
    },
    {
      path: '/goods',
      component: Goods
    },
    {
      path: '/seller',
      component: Seller
    },
    {
      path: '/ratings',
      component: Ratings
    }
  ]
})
