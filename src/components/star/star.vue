<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" :key="itemClass.id" :class="itemClass" class="star-item"></span>
  </div>
</template>
<script type="text/ecmascript-6">
const LENGTH = 5
const CLS_ON = 'on'
const CLS_HALF = 'half' 
const CLS_OFF = 'off'

  export default {
    name: 'star',
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType () {
        return 'star-' + this.size
      },
      itemClasses () {
       let result = []
      //  计算分数
       let score = Math.floor(this.score * 2) / 2
      //  求余数
       let hasDecimal = score % 1 !== 0
      //  求整数
       let integer = Math.floor(score)
      //  循环整数，看有几个整星
       for (let i = 0; i < integer; i++) {
         result.push(CLS_ON)
         }
        //  如果有余数的话，半星放进去数组
       if (hasDecimal) {
         result.push(CLS_HALF)
       }
      //  计算个数是否超过5 ，不够则补全off
       while (result.length < LENGTH) {
         result.push(CLS_OFF)
       }
       return result
     }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin'
.star 
  font-size: 0 
  .star-item 
   display: inline-block 
   background-repeat: no-repeat 
  &.star-48
    .star-item 
      width: 20px 
      height: 20px 
      margin-right: 22px 
      background-size: 20px 20px
      &.on 
       bg-image('star48_on')
      &.half 
       bg-image('star48_half')
      &.off 
       bg-image('star48_off')
  &.star-36
    .star-item 
      width: 15px 
      height: 15px 
      margin-right: 6px 
      background-size: 15px 15px
      &.last-child 
       margin-right: 0
      &.on 
       bg-image('star36_on')
      &.half 
       bg-image('star36_half')
      &.off 
       bg-image('star36_off')
  &.star-24
    .star-item 
      width: 10px 
      height: 10px 
      margin-right: 3px 
      background-size: 10px 10px
      &.on 
       bg-image('star24_on')
      &.half 
       bg-image('star24_half')
      &.off 
       bg-image('star24_off')
</style>
