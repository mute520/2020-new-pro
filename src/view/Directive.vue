<template>
  <div>
    <h1>directive</h1>
    <el-button v-copy="copyContent" size="mini">点击我进行（一键复制）复制内容哦！</el-button>
    <el-button v-longpress="{callback: longPress, time: 2000}" size="mini">longpress 长按</el-button>
    <el-button v-drag>drag button</el-button>
    <div v-drag class="drag">drag box</div>
    <div v-water-marker="{str: 'hello world!'}" class="water"></div>
    <input v-focus v-emoji type="text">
    <el-button v-debounce="{callback: fun, time: 3000}" size="mini">debounce btn</el-button>
    <div v-dragcc style="left: 400px"></div>
    <el-input v-model="value" @input="changeValue" size="mini"></el-input>
    <div class="box">{{value}}</div>
  </div>
</template>

<script>
export default {
  name: 'directive',
  computed: {},
  data() {
    return {
      msg: 'directive',
      copyContent: '我是您复制的内容...',
      value: '8888888888.888',
    }
  },
  methods: {
    longPress(event) {
      console.log('长按才执行的函数event', event)
    },
    fun(event) {
      console.log('执行的函数event', event)
    },
    adjustFontSize(value, maxWidth, currentFontSize) {
      const str = value + ''
      maxWidth = parseFloat(maxWidth)
      currentFontSize = parseFloat(currentFontSize)
      let span = document.createElement('span')
      span.innerText = str
      document.body.appendChild(span)
      const spanWidth = span.offsetWidth
      document.body.removeChild(span)
      if (spanWidth > maxWidth) {
        return currentFontSize * (maxWidth / spanWidth)
      } else {
        return currentFontSize * (maxWidth / spanWidth)
      }
    },
    changeValue(value) {
      console.log('value: ', value)
      const ele = document.querySelector('.box')
      const size = this.adjustFontSize(value, ele.offsetWidth, '14px')
      ele.style.fontSize = size + 'px'
      console.log('size: ', size) 
    }
  },
  
}
</script>

<style lang="stylus" scoped>
h1
  color: #99f
  text-align: center
.water
  width: 200px
  height: 200px
  margin-top: 20px
  border: 1px solid red
.box
  width: 150px
  border: 1px dashed red
  transition: all .3s

</style>