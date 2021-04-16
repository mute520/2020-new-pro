<template>
  <div>
    <quillEditor v-if="false" class="editor"
      ref="myQuillEditor"
      v-model="content"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
      @change="onEditorChange($event)">
    </quillEditor>
    <JoditEditor v-if="false" v-model="content" @change="change2" ref="JoditEditor"></JoditEditor>
    <el-button @click="start" size="mini">开始打字</el-button>
    <el-button @click="stop" size="mini">停止打字</el-button>

    <TinyEditor v-model="content" @change="change3" />
    <p>输出content：{{content}}</p>
    <div class="ppc">
      <ul>
        <li v-for="d in 10" :key="d"></li>
      </ul>
    </div>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

import JoditEditor from '@/components/JoditEditor'
import TinyEditor from '@/components/TinyEditor'

// console.log('VueTinymce', VueTinymce)

// 工具栏配置
const toolbarOptions = [
  ['bold', 'italic', 'underline'], // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
  [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
  [{ size: ['small', false, 'large', 'huge'] }], // 字体大小-----[{ size: ['small', false, 'large', 'huge'] }]
  [{ font: [] }], // 字体种类-----[{ font: [] }]
  ['clean'], // 清除文本格式-----['clean']
  // ['blockquote', 'code-block'], // 引用  代码块-----['blockquote', 'code-block']
  // [{ header: 1 }, { header: 2 }], // 1、2 级标题-----[{ header: 1 }, { header: 2 }]
  // [{ script: 'sub' }, { script: 'super' }], // 上标/下标-----[{ script: 'sub' }, { script: 'super' }]
  // [{ indent: '-1' }, { indent: '+1' }], // 缩进-----[{ indent: '-1' }, { indent: '+1' }]
  // [{ direction: 'rtl' }], // 文本方向-----[{'direction': 'rtl'}]
  // [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
  // [{ align: [] }], // 对齐方式-----[{ align: [] }]
  // ['image', 'video'] // 链接、图片、视频-----['link', 'image', 'video']
]

export default {
  name: 'editor',
  components: { quillEditor, JoditEditor, TinyEditor },
  data() {
    return {
      editor: 'null',
      content: 'content...',
      editorOption: {
        //  富文本编辑器配置
        modules: {
          //工具栏定义的
          toolbar: toolbarOptions
        },
        //主题
        theme: "snow",
        placeholder: "请输入正文",
      },
      timer: null,
    }
  },
  mounted() {
  },
  methods: {
    //失去焦点事件
    onEditorBlur(quill) {
      console.log('editor blur!', quill)
    },
    //获得焦点事件
    onEditorFocus(quill) {
      console.log('editor focus!', quill)
    },
    // 准备富文本编辑器
    onEditorReady(quill) {
      console.log('editor ready!', quill)
    },
    //内容改变事件
    onEditorChange({ quill, html, text }) {
      console.log('editor change!', quill, html, text)
      this.content = html
    },
    start() {
      this.timer = setInterval(() => {
        let c = Math.floor(Math.random() * 16).toString(16)
        this.content += c
      }, 0)
      // this.$nextTick(() => {
      //   console.log('ref:', this.$refs['JoditEditor'])
      //   const ele = this.$refs['JoditEditor'].$el.querySelector('.jodit-workplace')
      //   if (ele) {
      //     ele.style.maxHeight = `${300}px`
      //   }
      // })
    },
    stop() {
      clearInterval(this.timer)
    },
    // 2
    change2(newVal, oldVal) {
      console.log('change newVal: ', newVal)
      // console.log('change oldVal: ', oldVal)
    },
    change3(newVal) {
      console.log('tinymac change3 newVal: ', newVal)
    },
    setup(newVal, oldVal) {
      console.log('change newVal: ', newVal)
      console.log('change oldVal: ', oldVal)
    },
  },
}
</script>
<style lang="less">
  .ppc {
    width: 300px;
    height: 100px;
    border: 1px solid;
    overflow: auto;
    display: flex;
    ul {
      flex-shrink: 0;
      display: inline-flex;
      list-style: none;
      margin: 0;
      border: 1px solid red;
      li {
        flex-shrink: 0;
        width: 100px;
        height: 50px;
        background: #ff0;
        margin: 10px;
      }
    }
  }
</style>
<style lang='less' >
.editor {
  line-height: normal !important;
  height: 500px;
}
.ql-snow .ql-tooltip[data-mode="link"]::before {
  content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: "保存";
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode="video"]::before {
  content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
  content: "10px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
  content: "18px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
  content: "32px";
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "标准字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
  content: "衬线字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
  content: "等宽字体";
}
.ql-editor .ql-font-monospace {
  font-family: '微软雅黑'
}
</style>