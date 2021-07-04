<template>
  <div class="wrapper">
    <div class="box1" v-if="false">
      <div class="vl-list">
        <VirtualList
          :list-data="dataList"
          :estimated-item-size="24"
          v-slot="slotProps">
          <div class="context">
            <span style="color:#f00;font-weight:bold">{{slotProps.item.id}}</span>
            {{ slotProps.item.value }}
          </div>
        </VirtualList>
      </div>
      <div class="pt">
        <div class="cd"></div>
        <div class="dd"></div>
      </div>
    </div>
  </div>
</template>

<script>
import VirtualList from '@/components/VirtualList'
import faker from 'Faker'

let dataList = []
for (let id = 0; id < 10000; id++) {
  // faker.lorem.sentences()
  dataList.push({ id, value: faker.Lorem.sentences() /* 长文本 */ })
}

export default {
  name: 'infinite',
  components: { VirtualList },
  data () {
    return {
      msg: 'infinite',
      count: 10,
      dataList,
      percent: 0,
      timer: null,
    }
  },
  mounted () {  },
  methods: {
    load () {
      this.count += 2
    },
  },
}
</script>

<style lang="stylus" scoped>

.vl-list
  width: 280px
  height: 200px
  box-shadow: 0 0 10px #000
  margin-top: 10px
  border-radius: 10px
  overflow: hidden
  .context
    box-shadow: 0 0 5px #00f
    margin: 5px
    padding: 5px
    border-radius: 10px

.box1
  display: flex
  margin-bottom 20px

.pt
  width: 200px
  height: 300px
  border: 1px solid red
  position: relative
  overflow-y: auto
  .cd, .dd
    position: absolute
    top: 0
    left: 0
    height: 1000px
    width: 50px
    background: #ff0
  .dd
    height: 200px
    background: #f00
    left: 100px
    transform: translateY(30px)
</style>
