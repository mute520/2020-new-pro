<template>
  <div class="home">
    <div class="btn">
      <el-button @click="createVisible = true" type="primary" size="mini">新增</el-button>
    </div>
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
  </div>
</template>

<script>
import { getPosts, getComments, getAlbums, getPhotos, getTodos, getUsers, postPosts, updatePosts, deletePosts } from '@/api'

export default {
  name: 'home',
  data () {
    return {
      list: [],
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
  
</style>