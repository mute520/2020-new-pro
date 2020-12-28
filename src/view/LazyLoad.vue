<template>
  <div class="lazy-load">
    <!-- <ul>
      <li v-for="item in imgSrc" :key="item.id">
        <img v-lazy-load :src="item" :data-src="item" />
      </li>
    </ul> -->
    <img v-for="item in imgSrc" v-lazy-load :src="item" :data-src="item" :key="item" />
    <div class="box">8888888888.888</div>
  </div>
</template>

<script>
export default {
  name: 'lazyLoad', 
  data() {
    return {
      lazyLoad: 'lazyLoad',
      imgSrc: [require('@/assets/images/1.jpeg'), require('@/assets/images/2.jpeg'), require('@/assets/images/3.jpeg'), require('@/assets/images/4.jpeg'), 
              require('@/assets/images/5.jpeg'), require('@/assets/images/6.jpeg'), require('@/assets/images/7.jpeg')]
    }
  },
  methods: {
    adjustFontSize(value, maxWidth, currentFontSize) {
      const str = value + ''
      currentFontSize = parseFloat(currentFontSize)
      let span = document.createElement('span')
      span.innerText = str
      document.appendChild(span)
      const spanWidth = span.offsetWidth
      if (spanWidth > maxWidth) {
        return currentFontSize * (spanWidth / spanWidth + maxWidth)
      } else {
        return currentFontSize
      }
    }
  },
}
</script>

<style lang="stylus" scoped>
.lazy-load
  width: 800px
  height: 500px
  overflow-x: hidden
  overflow-y: auto
  opacity: 0.1

  &::-webkit-scrollbar {
    width: 8px
    height: 8px
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 50px
    background: rgba(42, 46, 52, .3)
  }
  &::-webkit-scrollbar-track {
    background: rgba(151, 168, 190, .3)
  }

.box
  width: 260px
  border: 1px dashed red
  
</style>