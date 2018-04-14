<template>
  <div class="shopcart">
     <div class="content">
       <div class="content-left">
         <div class="logo-wrapper">
           <div class="logo" :class="{'highlight':'totalCount>0'}">
               <i class="icon-shopping_cart" :class="{'highlight':'totalCount>0'}"></i>
           </div>
           <div class="num" v-show="totalCount>0">{{totalCount}}</div>
         </div>
         <div class="price" :class="{'highlight':'totalPrice>0'}">￥{{totalPrice}}</div>
         <div class="desc">另需配送费￥{{deliveryPrice}}</div>
       </div>
       <div class="content-right">
         <div class="pay" :class="payClass">
          {{payDesc}}
         </div>
       </div>
       <div class="ball-container">
        <div v-for="ball in balls" :key="ball.id">
          <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
     </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'shopcart',
    props: {
        selectFoods: {
            type: Array,
            default() {
              return [
                {
                   price: 30,
                   count: 1
                }
              ]
            }
        },
        deliveryPrice:{
           type: Number,
           default: 0
        },
        minPrice:{
          type:Number,
          default: 0
        }
    },
    data() {
      return {
        balls: [
         {
           show: false
         },
         {
           show: false
         },
         {
           show: false
         },
         {
           show: false
         },
         {
           show: false
         }
        ],
        dropBalls:[]
      }
    },
    methods: {
      // 遍历所有小球，判断状态是否为true ,否则设为true，得到dom对象，并且push进dropBall数组
      drop(el) {
       for ( let i = 0; i < this.balls.length; i++) {
         let ball = this.balls[i]
         if (!ball.show) {
           ball.show = true 
           ball.el = el
           this.dropBalls.push(ball)
           return 
         }
       }
    },
    // 遍历所有为true的小球，获取他们的位置，计算开始位置与最终位置的差值，进行外层和内层的变换
    beforeDrop(el) {
        let count = this.balls.length
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect()
            let x = rect.left - 32
            let y = -(window.innerHeight - rect.top - 22)
            el.style.display = ''
            el.style.webkitTransform = `translate3d(0,${y}px,0)`
            el.style.transform = `translate3d(0,${y}px,0)`
            let inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`
            inner.style.transform = `translate3d(${x}px,0,0)`
          }
        }
      },
      dropping(el, done) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)'
          el.style.transform = 'translate3d(0,0,0)'
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = 'translate3d(0,0,0)'
          inner.style.transform = 'translate3d(0,0,0)'
          el.addEventListener('transitionend', done)
        })
      },
      afterDrop(el) {
        let ball = this.dropBalls.shift()
        if (ball) {
          ball.show = false
          el.style.display = 'none'
        }
      }
    },
    computed: {
      // 计算总价
      totalPrice() {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        })
        return total
      },
      payClass() {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough'
        } else {
          return 'enough'
        }
      },
       payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice
          return `还差￥${diff}元起送`
        } else {
          return '去结算'
        }
      },
      // 计算总数量
      totalCount() {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      }
    }
  }

</script>
<style lang="stylus" rel="stylesheet/stylus">
.shopcart 
  position: fixed 
  left: 0 
  bottom: 0 
  width: 100% 
  height: 48px 
  z-index: 50
  .content 
    display: flex
    background: #141d27
    .content-left
       flex: 1 
       font-size: 0
       .logo-wrapper 
         display: inline-block 
         position: relative 
         top: -10px 
         margin: 0 12px 
         padding: 6px 
         width: 56px 
         height: 56px 
         box-sizing: border-box 
         border-radius: 50%
         vertical-align: top 
         background: #141d27
         .logo 
           width: 100% 
           height: 100% 
           border-radius: 50% 
           text-align: center 
           background: #2b343c
           &.highlight
              background: rgb(0, 160, 220)
           .icon-shopping_cart
              line-height: 44px 
              font-size: 24px 
              color:#80858a
              &.highlight
                color: #fff
         .num 
           position: absolute 
           top: 0 
           right: 0 
           width: 24px 
           height: 16px 
           line-height: 16px 
           text-align: center 
           border-radius: 16px 
           font-size: 9px
           font-weight: 700 
           color: #ffffff 
           background: rgb(240,20,20)
           box-shadow: 0 4px 8px rgba(0,0,0,0.4)
       .price
         display: inline-block
         vertical-align: top  
         line-height: 24px
         margin-top: 12px
         padding-right: 12px
         box-sizing: border-box 
         border-right: 1px solid rgba(255,255,255,0.1) 
         font-size: 16px 
         color: rgba(255,255,255,0.4)
         font-weight: 700
         &.highlight
            color: #fff
      .desc  
         display: inline-block
         vertical-align: top
         margin: 12px 0 0 12px
         line-height:24px 
         color: rgba(255,255,255,0.4) 
         font-size: 12px 
    .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          color: rgba(255,255,255,0.4) 
          background: #2b333b
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0, 160, 220)
          transition: all 0.4s linear        
</style>
