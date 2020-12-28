<template>
  <div class="play">
    <h2>{{msg}}</h2>
    <p>动态路由：{{param}}</p>
    <p>动态路由参数product：{{product}}</p>
    <ul>
      <li v-for="item in list" :key="item.uid">
        <el-button type="primary" size="mini">ID：{{item.uid}}</el-button>
        <p>日期：{{item.date}}</p>
        <p>图片：<img :src="item.image" alt="mock-image" /></p>
        <p>内容：{{item.content}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { productGet, productPost } from '@/api'

export default {
  name: 'play',
  data () {
    return {
      msg: 'play',
      list: []
    }
  },
  computed: {
    param () { return this.$route.params },
    product () { return this.$route.params.product },
  },
  mounted () {
    this.getProductData().then(res => {
      console.log('async', '')
    })
  },
  methods: {
    async getProductData () {
      const params = { modelId: 203, userRole: 'Admin' }
      productGet(params).then(res => {
        console.log('res: ', res.data)
        this.list = res.data
      })
      // productPost(params).then(res => {
      //   console.log('res: ', res.data)
      //   this.list = res.data
      // })
    },
  },
}
</script>

<style lang="stylus" scoped>
ul
  list-style: none
  padding: 0
  text-align: left
  li
    border-top: 1px dashed

</style>