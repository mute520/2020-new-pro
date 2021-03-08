<template>
  <div class="custom-editor margin-top-20">
    <textarea :id="id" name="content" v-model="outContent"></textarea>
    <input id="inputFile" @change="selectedFile" type="file" name style="visibility:hidden;height:0;" />
  </div>
</template>

<script>
import 'kindeditor/themes/default/default.css'
import 'kindeditor/kindeditor-all-min'
import 'kindeditor/lang/zh-CN'
// 以下四个配置文件
import items from './config/items'
import htmlTags from './config/htmlTags'
import fontSizeTable from './config/fontSizeTable'
import otherConfig from './config/otherConfig'

export default {
  name: 'custom-editor',
  props: {
    html: { // 编辑器内容 url
      type: String,
      default: ''
    },
    content: { // 编辑器内容
      type: String,
      default: ''
    },
    id: { // 编辑器id
      type: String,
      // required: true,
      default: 'kindeditor-id'
    },
    width: { // 宽
      type: String,
      default: '100%'
    },
    height: { // 高
      type: String,
      default: '300'
    },
    minWidth: { // 最小宽
      type: Number,
      default: 650
    },
    minHeight: { // 最小高
      type: Number,
      default: 400
    },
    items: { // toolbar 工具栏配置
      type: Array,
      default: () => [ ...items ]
    },
    htmlTags: { // 标签配置
      type: Object,
      default: () => { return { ...htmlTags } }
    },
    fontSizeTable: { // 字号配置
      type: Array,
      default: () => [ ...fontSizeTable ]
    },
    langType: { // 语言配置
      type: String,
      default: 'zh-CN'
    },
    themeType: { // 主题配置
      type: String,
      default: 'default'
    },
    bodyClass: { // body 的样式
      type: String,
      default: 'ke-content'
    },
    // 其他配置项
    ...otherConfig
  },
  data () {
    return {
      editor: null,
      outContent: this.content
    }
  },
  watch: {
    content(val) { // 内容
      this.editor && val !== this.outContent && this.editor.html(val)
    },
    outContent(val) { // 分发编辑器内容改变事件
      this.$emit("update:content", val)
      this.$emit("on-content-change", val)
      this.$emit("input", val)
    },
    html(val) { // 初始化编辑器内容
      if ( this.html && (this.html.startsWith("https://") || this.html.startsWith("http://")) ) {
        this.loadUrl(val)
      } else {
        this.outContent = ''
        this.outContent ? this.editor.appendHtml(this.outContent) : ''
      }
    }
  },
  created () {
    if ( this.html && (this.html.startsWith("https://") || this.html.startsWith("http://")) ) {
      this.loadUrl(this.html)
    } else {
      this.outContent = ''
      setTimeout(() => {
        this.outContent ? this.editor.appendHtml(this.outContent) : ''
      }, 1000)
    }
  },
  mounted () {
    this.initEditor() // 初始访问时创建
    // this.editor.focus() // 添加焦点
    // 添加点击图片回调函数
    this.editor.clickToolbar("image", () => {
      this.editor.hideDialog() // 禁用自带的图片弹窗
      this.handleOpenFile() // 打开文件
    })
  },
  activated () { // keep-alive 进入时创建
    this.initEditor()
  },
  deactivated () { // keep-alive 离开时移除
    this.removeEditor()
  },
  beforeDestroy () { // 实例销毁之前移除
    this.removeEditor()
  },
  methods: {
    // 打开文件
    handleOpenFile() {
      let input = document.getElementById('inputFile')
      // 解决同一个文件不能监听的问题
      input.addEventListener( 'click', function() { this.value = '' }, false )
      input.click() // 点击input
    },
    // 选择好文件
    async selectedFile($event) {
      const file = $event.target.files[0]
      // 把图片上传到后端服务器 拿到url  uploadImage 是自己后端上传图片的接口
      // 调用appendHtml方法把图片追加到富文本
      // const url= await uploadImage(file)
      // this.editor.appendHtml( `<img style="max-width:100%" src="https://${data.Location}">` ) 
    },
    // 编辑器内容上传到cos，调用返回url
    async content2Url() {
      // 把html片段上传到后端服务器 拿到url  uploadHtml 是自己后端上传的接口
      // try {
      //   const res = await uploadHtml(this.outContent)
      //   return res
      // } catch (error) {
      //   this.$message.error(error.data.message)
      // }
    },
    // 加载html填充编辑器内容
    loadUrl(url) {
      if (url && url.length > 0) {
        return
        axios.get(url).then(response => {
          // 处理HTML显示
          this.outContent = response.data
          this.editor.appendHtml(this.outContent)
          this.$emit("subLoadUrlToHtml", response.data)
        }).catch(() => {
          this.outContent = "服务器数据加载失败，请重试!"
          this.editor.appendHtml(this.outContent)
        })
      }
    },
    // 移除编辑器实例
    removeEditor() {
      window.KindEditor.remove(`#${this.id}`)
    },
    // 初始化编辑器
    initEditor() {
      this.removeEditor()
      this.editor = window.KindEditor.create("#" + this.id, {
        width: this.width,
        height: this.height,
        minWidth: this.minWidth,
        minHeight: this.minHeight,
        items: this.items,
        noDisableItems: this.noDisableItems,
        filterMode: this.filterMode,
        htmlTags: this.htmlTags,
        wellFormatMode: this.wellFormatMode,
        resizeType: this.resizeType,
        themeType: this.themeType,
        langType: this.langType,
        designMode: this.designMode,
        fullscreenMode: this.fullscreenMode,
        basePath: this.basePath,
        themesPath: this.themesPath,
        pluginsPath: this.pluginsPath,
        langPath: this.langPath,
        minChangeSize: this.minChangeSize,
        loadStyleMode: this.loadStyleMode,
        urlType: this.urlType,
        newlineTag: this.newlineTag,
        pasteType: this.pasteType,
        dialogAlignType: this.dialogAlignType,
        shadowMode: this.shadowMode,
        zIndex: this.zIndex,
        useContextmenu: this.useContextmenu,
        syncType: this.syncType,
        indentChar: this.indentChar,
        cssPath: this.cssPath,
        cssData: this.cssData,
        bodyClass: this.bodyClass,
        colorTable: this.colorTable,
        afterCreate: this.afterCreate,
        // 编辑器内容改变回调
        afterChange: () => {
          this.editor ? (this.outContent = this.editor.html()) : ''
        },
        afterTab: this.afterTab,
        afterFocus: this.afterFocus,
        afterBlur: this.afterBlur,
        afterUpload: this.afterUpload,
        uploadJson: this.uploadJson,
        fileManagerJson: this.fileManagerJson,
        allowPreviewEmoticons: this.allowPreviewEmoticons,
        allowImageUpload: this.allowImageUpload,
        allowFlashUpload: this.allowFlashUpload,
        allowMediaUpload: this.allowMediaUpload,
        allowFileUpload: this.allowFileUpload,
        allowFileManager: this.allowFileManager,
        fontSizeTable: this.fontSizeTable,
        imageTabIndex: this.imageTabIndex,
        formatUploadUrl: this.formatUploadUrl,
        fullscreenShortcut: this.fullscreenShortcut,
        extraFileUploadParams: this.extraFileUploadParams,
        filePostName: this.filePostName,
        fillDescAfterUploadImage: this.fillDescAfterUploadImage,
        afterSelectFile: this.afterSelectFile,
        pagebreakHtml: this.pagebreakHtml,
        allowImageRemote: this.allowImageRemote,
        autoHeightMode: this.autoHeightMode,
        fixToolBar: this.fixToolBar,
        tabIndex: this.tabIndex
      })
    }
  },
}
</script>