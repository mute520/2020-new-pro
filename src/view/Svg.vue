<template>
  <div class="svg-wrapper" @mousemove="mouseMove">
    <svg class="svg-box">
      <path v-for="item in lineList" marker-end="url(#arrow)" :key="item.id" :d="setD(item)" style="stroke: #f00; fill: none"></path>
      <path v-if="mouseStart" :d="setD(moveLine)" marker-end="url(#arrow)" style="stroke: #f00; fill: none"></path>
      <rect x="10" y="30" style="width:50px;height:50px;fill:none;stroke:red;filter:url(#filter)"></rect>
      <circle cx="100" cy="60" r="30" style="fill:none;stroke:red"></circle>
      <ellipse cx="200" cy="60" rx="50" ry="30" style="fill:none;stroke:red"></ellipse>
      <line x1="280" y1="60" x2="400" y2="60" style="fill:none;stroke:red"></line>
      <polygon points="420 30 450 100 480 30" style="fill:none;stroke:red"></polygon>
      <polyline points="520 30 550 100 580 30" style="fill:none;stroke:red"></polyline>
      <path id="path_1" d="M 50,250 Q 125,0 300,150" style="fill:none;stroke:red;"></path>
      <text><textPath xlink:href="#path_1" startOffset="20%">dfsdfdf</textPath></text>
      <circle cx="20" cy="220" r="10" style="fill:none;stroke:red">
        <animateTransform attributeName="transform" type="scale" from="1" to="2" begin="0s" dur="3s" repeatCount="indefinite"></animateTransform>
      </circle>
      <circle cx="0" cy="0" r="10" style="fill:none;stroke:red;">
        <animateMotion path="M 50,250 Q 125,0 300,150" begin="0s" dur="3s" repeatCount="indefinite"></animateMotion>
      </circle>

      <defs>
        <filter id="filter">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2"/>
        </filter>
      </defs>
      <defs>
        <marker id="arrow" viewBox="0 -5 10 10" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M 0,-5 L 10,0 L 0,5" style="fill:#000;stroke:red"></path>
        </marker>
      </defs>
    </svg>
    <div class="box">
      <div class="btn">
        <el-button @click="add" type="primary" size="mini">添 加</el-button>
        <el-button @click="remove" type="primary" size="mini">删 除</el-button>
      </div>
      <div class="source" @click="mouseClick">source</div>
      <ul class="target">
        <li :class="`label-${item}`" v-for="(item,i) in labelList" @click="labelClick"
         @mouseenter="labelMouseenter(lineList[i])"
         @mouseleave="labelMouseleave(lineList[i])"
         :key="item.id">{{item}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import uuid from 'uuid/dist/v1'

export default {
  name: 'svg-name',
  data() {
    return {
      lineList: [],
      labelList: ['item1', 'item2'],
      sourceOffset: { x: 0, y: 0 },
      timer: null,
      mouseStart: false,
      mouseEnterItem: false,
      moveLine: { x: 0, y: 0 },
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    setD(item) {
      const { x, y } = this.sourceOffset
      return `M ${x},${y} V ${item.y / 2} H ${item.x} L ${item.x},${item.y}`
    },
    init() {
      this.$nextTick(() => {
        const source = document.querySelector('.source')
        this.sourceOffset = { x: source.offsetLeft + source.offsetWidth / 2, y: source.offsetTop + source.offsetHeight }
      })
      this.initChildBox()
    },
    initChildBox() {
      this.$nextTick(() => {
        const list = []
        this.labelList.forEach(item => {
          const target = document.querySelector('.label-' + item)
          list.push({ x: target.offsetLeft + target.offsetWidth / 2, y: target.offsetTop })
        })
        this.lineList = list
      })
    },
    add() {
      this.labelList.push('T-' + uuid().slice(0, 8))
      this.initChildBox()
      if (this.timer) clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.add()
      }, 2000)
    },
    remove() {
      this.labelList.pop()
      this.initChildBox()
      if (this.timer) clearInterval(this.timer)
    },

    mouseClick() {
      this.mouseStart = true
    },
    mouseMove(e) {
      if (!this.mouseStart) return
      this.moveLine = { x: e.x, y: e.y - 100 / 2 }
    },
    labelClick() {
      this.mouseStart = false
    },
    labelMouseenter(item) { console.log('item', item)
      this.mouseStart = false
      // this.moveLine.x = item.x
      // this.moveLine.y = item.y
      this.moveLine = item
    },
    labelMouseleave(item) {
      this.mouseStart = true
    },
  },
}
</script>

<style lang="stylus" scoped>
.svg-wrapper {
  position: relative
}
.svg-wrapper,
.svg-box {
  width: 100%;
  height: 100%;
}
.svg-box, .box {
  position: absolute;
}
.box {
  width: 100%;
  .source, .target li {
    width: 60px;
    min-height: 50px;
    margin: 10px auto;
    text-align: center;
    border: 1px solid;
    word-break: break-all
  }
  .source {}
  .target {
      display: flex;
      justify-content: space-around;
      margin-top: 200px
    li {}
  }
}

</style>