<template>
  <div class="wrap">
    <el-button @click="visible = true" size="mini">上传</el-button>
    <div class="students">
      <el-input v-model="deleteId" size="mini"></el-input>
      <el-button @click="deleteStudentById" size="mini">删除</el-button>
    </div>
    <div class="hover-poper">hover
      <transition>
        <div class="hover-box">
          <ul>
            <li v-for="item in 10" :key="item">{{item}}</li>
          </ul>
        </div>
      </transition>
    </div>
    <el-dialog :visible.sync="visible" custom-class="upload-dialog" title="上传数据">
      <div class="item">
        <div class="label">文件名称：</div>
        <el-input v-model="fileName"></el-input>
      </div>
      <div class="item">
        <div class="label">上传文件：</div>
        <div class="upload-tool">
          <div class="title" v-show="fileName && isSuccessUpload">{{fileName}}</div>
          <el-button @click="clickUpload" v-if="!isSuccessUpload" type="text" icon="el-icon-plus">添加文件</el-button>
          <el-button @click="clickUpload" v-else type="text" icon="el-icon-refresh-right">重新上传</el-button>
        </div>
      </div>
      <div class="item">
        <div class="label">可见名单：</div>
        <el-radio-group v-model="radio" @change="radioChange">
          <el-radio label="all">全体可见</el-radio>
          <el-radio label="appoint">指定人员可见</el-radio>
        </el-radio-group>
      </div>
      <div class="select-multiple" v-if="radio === 'appoint'">
        <div class="show-box">
          <div class="show-box-inner">
            <div class="show-box-item" v-for="d in 5" :key="d.id">肖惠康（xiaohuikang802）</div>
          </div>
          <i class="el-icon-arrow-down"></i>
        </div>
        <div class="select-person-box">
          <div class="left">
            <div :class="{'left-item': ManagerIndex===i}" v-for="(item, i) in checkedTopManager" @click="clickManager(i)" :key="item.id">
              <el-checkbox v-model="item.checkAll" @change="handleCheckAllChange($event, item)" :indeterminate="item.isIndeterminate">{{item.name}}</el-checkbox>
            </div>
          </div>
          <div class="right">
            <el-checkbox-group v-model="checkedTopManager[ManagerIndex].checkedPerson" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="person in checkedTopManager[ManagerIndex].personList" :label="person" :key="person">{{person}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
      <div class="btn">
        <el-button @click="cancel" size="mini">取消</el-button>
        <el-button @click="submit" type="primary" size="mini">确定</el-button>
      </div>
    </el-dialog>
    <div class="light-box">
      <div class="light1">Neon Button <span></span></div>
      <div class="light" v-for="n in 5" :class="['light'+n]" :key="n">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        Neon cButton
      </div>
    </div>
    <div class="flex">
      <div class="left"></div>
      <div class="right">
        <ul>
          <!-- <li><img :src="require('@/assets/images/svgs/star.svg')" alt=""></li> -->
          <li>aaa</li>
          <li>aaa</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { youdao, deleteById, productGet } from '@/api'
import '@/assets/images/svgs/star.svg'

export default {
  name: 'abc',
  data() {
    return {
      visible: false,
      fileName: '',
      isSuccessUpload: false, // 是否上传成功
      fileFormData: '', // 等待确定要上传的文件 formData
      radio: 'appoint', // all appoint
      checkAll: false,
      ManagerValue: '', // 当前高管
      ManagerIndex: 0, // 高管列下标
      checkedTopManager: [
        {name: '高管助理1', checkAll: false, isIndeterminate: false, checkedPerson: [], personList: ['王玉珍(wangyuzhen396)', '肖惠康(xiaohuikang802)', '梁丽青(liangliqing)']},
        {name: '高管助理2', checkAll: false, isIndeterminate: false, checkedPerson: [], personList: ['王玉珍(wangyuzhen396)2', '肖惠康(xiaohuikang802)2', '梁丽青(liangliqing)2']},
        {name: '高管领导', checkAll: false, isIndeterminate: false, checkedPerson: [], personList: ['王玉珍(wangyuzhen396)3', '肖惠康(xiaohuikang802)3', '梁丽青(liangliqing)3']},
      ],
      deleteId: '17',
    }
  },
  mounted() {
    // productGet({}).then(res => {})
  },
  methods: {
    deleteStudentById() {
      if (!this.deleteId) {
        this.$message.error('请输入要删除的学生学号')
        return
      }
      deleteById({ id: this.deleteId }).then(res => {
        console.log('deleteById res', res)
      })
    },
    radioChange(value) {
      console.log('value：', value)
    },
    clickUpload() {
      let input = document.createElement('input')
      input.setAttribute('type', 'file')
      document.body.appendChild(input)
      input.click()
      input.onchange = this.fileChange
      document.body.removeChild(input)
    },
    fileChange(event) {
      let target = event.target
      let file = target.files[0]
      console.log('files', target.files, target.value)
      let fileSize = 0;
      fileSize = file.size;
      let size = fileSize / 1024;
      if (size > 1000) {
        alert("附件不能大于1M");
        target.value = "";
        return false;   //阻止submit提交
      }
      
      let suff = file.name.substring(file.name.lastIndexOf(".") + 1).toLowerCase();
      if (suff != "jpg" && suff != "jpeg" && suff != "png" && suff != "gif") {
        alert("请选择图片格式文件上传(jpg,png,gif,gif等)！");
        target.value = "";
        return false;   //阻止submit提交
      }
      this.isSuccessUpload = true
      this.fileName = file.name
      let fileFormData = new FormData()
      fileFormData.append('file', file)
      this.fileFormData = fileFormData
    },
    clickManager(index) {
      if (this.ManagerIndex === index) return
      this.ManagerIndex = index
      this.ManagerValue = this.checkedTopManager[index]
      this.checkedTopManager.forEach((item, i) => {
        if (index === i) {
          return
        }
        item.checkAll = false
        item.isIndeterminate = false
        item.checkedPerson = []
      })

    },
    handleCheckAllChange(val, item) {
      console.log('val, item', val, item)
      item.checkedPerson = val ? item.personList : [];
      item.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      console.log('value:', value)
      const currentItem = this.checkedTopManager[this.ManagerIndex]
      let checkedCount = value.length;
      currentItem.checkAll = checkedCount === currentItem.personList.length;
      currentItem.isIndeterminate = checkedCount > 0 && checkedCount < currentItem.personList.length;
    },
    cancel() {
      this.visible = false
      this.fileName = ''
      this.fileFormData = ''
    },
    submit() {
      console.log('fileName', this.fileName)
      console.log('radio', this.radio)
      console.log('fileFormData', this.fileFormData)
      console.log('checkedTopManager', this.checkedTopManager)
      this.visible = false
      this.fileName = ''
      this.fileFormData = ''
    },
  },
}
</script>

<style lang="less" scoped>
.flex {
  border: 1px solid blue;
  width: 600px;
  height: 200px;
  display: flex;
  color: #fff;
  .left {
    border: 1px solid red;
    width: 200px;
    flex-shrink: 0;
  }
  .right {
    width: calc(100% - 200px);
    border: 1px solid #ff0;
    ul {
      margin-left: 30px;
      li {
        list-style-type: disc;
        list-style-image: url('~@/assets/images/svgs/star.svg');
      }
    }
  }
}
.hover-poper {
  cursor: pointer;
  position: relative;
  .hover-box {
    position: absolute;
    top: 100%;
    background: #fff;
    box-shadow: 0 0 10px #666;
    border-radius: 4px;
    overflow: hidden;
    visibility: hidden;
    max-height: 0;
    li {
      padding: 5px 10px;
      transition: all .3s;
      &:hover {
        background: #94b1f5;
      }
    }
  }
  &:hover .hover-box {
    // transition: all .9s;
    visibility: visible;
    max-height: 200px;
  }
}

.el-dialog {
  &.upload-dialog {
    .el-dialog__body {
      .item {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .label {
          flex-shrink: 0;
          width: 100px;
        }
        .upload-tool {
          flex-grow: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
      .select-multiple {
        .show-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 10px;
          border: 1px solid #dcdfe6;
          border-radius: 5px;
          .show-box-inner {
            display: flex;
            flex-wrap: wrap;
            max-height: 83px;
            overflow: auto;
            .show-box-item {
              margin-right: 35px;
            }
          }
          .el-icon-arrow-down {
            cursor: pointer;
          }
        }
        .select-person-box {
          height: 200px;
          display: flex;
          .left {
            width: 33%;
            padding: 10px 0;
            border: 1px solid red;
            overflow: auto;
            .el-checkbox {
              width: 100%;
              margin: 5px 0;
            }
            .left-item {
              background: #edf5ff;
              transition: all .3s;
            }
          }
          .right {
            flex-grow: 1;
            padding: 10px;
            border: 1px solid red;
            .el-checkbox-group {
              height: 100%;
              display: flex;
              flex-direction: column;
              overflow: auto;
              .el-checkbox {
                // display: block;
                margin: 5px 0;
              }
            }
          }
        }
      }
      .btn {
        padding-top: 20px;
        text-align: right;
        .el-button {
          width: 100px;
        }
      }
    }
  }
}

.wrap {
  background: #000;
  height: 500px;
}
.light-box {
  display: flex;
}
.light1 {
  // width: 300px;
  // height: 2px;
  // background: linear-gradient(to right, transparent, #03e9f4);
  // background: linear-gradient(to left,transparent,#03e9f4);
  padding: 10px 20px;
  margin: 10px 30px;
  color: #fff;
  position: relative;
  cursor: pointer;
  overflow: hidden;
  transition: all .3s;
  &::before, &::after, & > span {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    transition: all .3s;
  }
  &::before {
    top: 0;
    left: 100%;
    background: linear-gradient(to left, transparent, #03e9f4);
  }
  &::after {
    bottom: 0;
    left: -100%;
    background: linear-gradient(to right, transparent, #03e9f4);
  }
  & > span {
    width: 100%;
    left: 0;
    transform: rotate(90deg);
    background: linear-gradient(to right, transparent, #03e9f4);
  }
  &:hover {
    background: #03e9f4;
    color: #050801;
    box-shadow: 0 0 5px #03e9f4,
                0 0 25px #03e9f4,
                0 0 50px #03e9f4,
                0 0 200px #03e9f4;
    &::before, &::after, & > span {
      left: 0;
      width: 100%;
    }
  }
}
// case 2
.light {
  position: relative;
  padding: 25px 30px;
  color: #03e9f4;
  font-size: 24px;
  text-transform: uppercase;
  transition: 0.5s;
  letter-spacing: 4px;
  cursor: pointer;
  overflow: hidden;
  // animation: rotate .1s linear infinite;
}
.light5 {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.light:hover {
  // background-color: #03e9f4;
  // color: #050801;
  // box-shadow: 0 0 5px #03e9f4,
  //             0 0 25px #03e9f4,
  //             0 0 50px #03e9f4,
  //             0 0 200px #03e9f4;
  & > div {
    opacity: 1;
  }
}
.light div {
  position: absolute;
  opacity: 0;
  transition: 0.5s;
}
.light div:nth-child(1){
  width: 100%;
  height: 2px;
  top: 0;
  left: -100%;
  background: linear-gradient(to right,transparent,#03e9f4);
  transform: rotate(0);
  animation: animate1 2s linear infinite;
}
.light div:nth-child(2){
  width: 2px;
  height: 100%;
  top: -100%;
  right: 0;
  background: linear-gradient(to bottom,transparent,#03e9f4);
  animation: animate2 2s linear infinite;
  animation-delay: 0.5s;
}
.light div:nth-child(3){
  width: 100%;
  height: 2px;
  bottom: 0;
  right: -100%;
  background: linear-gradient(to left,transparent,#03e9f4);
  animation: animate3 2s linear infinite;
  animation-delay: 1s;
}
.light div:nth-child(4){
  width: 2px;
  height: 100%;
  bottom: -100%;
  left: 0;
  background: linear-gradient(to top,transparent,#03e9f4);
  animation: animate4 2s linear infinite;
  animation-delay: 1.5s;
}
@keyframes animate1 {
  0% {
    left: -100%;
  }
  50%,100% {
    left: 100%;
  }
}
@keyframes animate2 {
  0% {
    top: -100%;
  }
  50%,100% {
    top: 100%;
  }
}
@keyframes animate3 {
  0% {
    right: -100%;
  }
  50%,100% {
    right: 100%;
  }
}
@keyframes animate4 {
  0% {
    bottom: -100%;
  }
  50%,100% {
    bottom: 100%;
  }
}
// @keyframes rotate {
//   0% {
//     transform: rotate(0deg);
//   }
//   100% {
//     transform: rotate(360deg);
//   }
// }

.students {
  display: flex;
  width: 200px;
  margin: 10px;
}

</style>