<template>
  <div class="home">
    <div class="btn">
      <el-button @click="createVisible = true" type="primary" size="mini">新增</el-button>
    </div>
    <svg>
      <path d="M 10,20 L 20,40 L 80,0 L 75,0 L 21,35 L 14,20 z" style="stroke:#57e90d;fill:#57e90d;cursor:pointer"></path>
    </svg>
    <progress id="progress" :value="progressValue"></progress>
    <el-table :data="list">
      <el-table-column prop="id" label="id"></el-table-column>
      <el-table-column prop="userId" label="userId"></el-table-column>
      <el-table-column prop="title" label="title"></el-table-column>
      <el-table-column prop="body" label="body"></el-table-column>
    </el-table>
    <el-dialog :visible="createVisible" :before-close="() => createVisible = false">
      <el-form :model="formData" label-position="left" label-width="80px" size="mini">
        <el-form-item label="userId">
          <el-select v-model="formData.userId">
            <el-option v-for="item in options" :value="item.value" :label="item.label" :key="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="title">
          <el-input v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="body">
          <el-input v-model="formData.body"></el-input>
        </el-form-item>
      </el-form>
      <div class="btn align-c" slot="footer">
        <el-button @click="createVisible = false" size="mini">取 消</el-button>
        <el-button @click="confirm" type="primary" size="mini">确 定</el-button>
      </div>
    </el-dialog>
    <div class="box">
      <ul class="box1">
        <li class="pos">aaa</li>
        <li v-for="item in 50" :key="item.id">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getPosts, getComments, getAlbums, getPhotos, getTodos, getUsers, postPosts, updatePosts, deletePosts } from '@/api'
// import Base from './base'
// console.log('Base:', Base)
require(['./base'], function (aa) {
  console.log('aa', aa)
})

import BScroll from 'better-scroll'

export default {
  name: 'home',
  data () {
    return {
      list: [],
      progressValue: 13,
      createVisible: false,
      formData: {
        id: 1,
        userId: 2,
        title: 'title',
        body: 'body',
      },
      options: [{value: 1, label: '张三'}, {value: 2, label: '李四'}, {value: 3, label: '王五'}, {value: 4, label: '六顺'}],
    }
  },
  mounted () {
    // this.getPosts()
    const bscroll = new BScroll('.box', {
      probeType: 3,
      click: true, //点击
      pullUpLoad: true //上拉加载更多
    })
    console.log('bscroll: ', bscroll)
    //监听滚动位置 默认情况下BScroll 是不可以监听滚动位置的，只有在初始化的时候设置了probeType才可以监听
    bscroll.on('scroll', function (position) {
      console.log(position)
    })
    bscroll.on('pullingUp', function () {
        console.log('上拉加载更多');
        //发送网络请求，请求更多页的数据

        //等请求完成，进行数据展示

        //调用finishiPullUp()表示本次上拉加载完成，可以进行下次上拉加载更多，不调用这个的话，默认只能由一次上拉加载更多
        setTimeout(function () {
            bscroll.finishPullUp()
        },2000)
    })
  },
  methods: {
    getPosts () {
      getPosts({userId: 1}).then(res => {
        this.list = res.data
      })
    },
    postPosts () {
      const params = {
        userId: this.formData.userId,
        title: this.formData.title,
        body: this.formData.body,
      }
      postPosts(params).then(res => {
        this.$message.success('create success')
      })
    },
    updatePosts () {
      const params = {
        id: this.formData.id,
        userId: this.formData.userId,
        title: this.formData.title,
        body: this.formData.body,
      }
      updatePosts(params).then(res => {
        this.$message.success('update success')
      })
    },
    deletePosts () {
      const params = {
        id: this.formData.id,
      }
      deletePosts(params).then(res => {
        this.$message.success('delete success')
      })
    },
    confirm () {
      this.createVisible = false
      this.postPosts()
      // this.updatePosts()
      // this.deletePosts()
    },
  },
}
</script>

<style lang="stylus" scoped>
.home
  color: #999
  .btn
    padding: 10px
    &.align-l
      text-align: left
    &.align-c
      text-align: center
    &.align-r
      text-align: right

.box {
  height: 300px;
  border: 1px solid blue;
  position: relative;
  overflow: auto;
  .pos {
    border-color: #ccc;
    position absolute;
    top: 0;
    left: 300px;
  }
  li {
    // position: absolute;
    width: 300px;
    height: 100px;
    border: 1px solid red;
  }
}
  
</style>