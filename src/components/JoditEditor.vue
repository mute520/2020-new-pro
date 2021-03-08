<template>
  <div class="jodit-editor">
    <textarea id="jodit-editor"></textarea>
  </div>
</template>

<script>
// import { Jodit } from 'jodit'
// import { Jodit } from 'jodit/build/jodit'
import { Jodit } from 'jodit/build/jodit.es2018'
import 'jodit/build/jodit.es2018.css'
// import 'jodit/build/jodit.css'

export default {
  name: 'joditEditor',
  props: {
    value: {
      type: String,
      default: ''
    },
    buttons: {
      type: Array,
      default: () => ['source', '|', 'bold', 'underline', 'italic', '|', 'font', 'fontsize', 'brush', '|', 'ul', 'ol', '|', 'undo', 'redo', 'eraser']
    },
    extraButtons: {
      type: Array,
      default: () => []
    },
    config: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      editor: null
    }
  },
  watch: {
    value(value) {
      if (this.editor) {
        this.editor.value = value
      }
    }
  },
  computed: {
    editorConfig () {
      const config = {
        autofocus: true,
        enter: 'div',
        language: 'zh_cn',
        showTooltipDelay: 100,
        ...this.config,
        // minHeight: '100%',
        // toolbarButtonSize: 'small',
        // toolbar: false,
        extraButtons: [
          {
            text: 'abbb',
            name: 'selectall',
            // iconURL: require('@/assets/images/logo.png'),
            exec: function (editor) {
                // editor.selection.insertHTML((new Date).toDateString());
                editor.execCommand('selectall')
            }
          }
        ]

      }

      if (this.buttons) {
        config.buttons = this.buttons
        config.buttonsMD = this.buttons
        config.buttonsSM = this.buttons
        config.buttonsXS = this.buttons
      }

      // if (this.extraButtons) config.extraButtons = this.extraButtons
      return config
    }
  },
  mounted() {
    this.init()
    this.$el.addEventListener('keydown', this.keydownTab)
  },
  methods: {
    init() {
      this.editor = new Jodit('#jodit-editor', this.editorConfig)
      this.editor.value = this.value
      this.editor.events.on('change', (newVal, oldVal) => {
        // console.log('change newVal: ', newVal)
        // console.log('change oldVal: ', oldVal)
        this.$emit('change', newVal, oldVal)
      })
      // console.log('editor:', this.editor)
      // this.$nextTick(() => {
      //   console.log('ref:', this.$el)
      //   const ele = this.$el.querySelector('.jodit-workplace')
      //   if (ele) {
      //     ele.style.maxHeight = `${300}px`
      //   }
      // })
      this.editor.e.on('afterGenerateColorPicker', (form, extra) => {
        const elm_bg_color = this.editor.create.fromHTML('<button class="jodit-ui-button">清除背景颜色</button>')
        const elm_font_color = this.editor.create.fromHTML('<button class="jodit-ui-button">清除字体颜色</button>')

        Jodit.ns.Dom.detach(extra)
        extra.appendChild(elm_bg_color)
        extra.appendChild(elm_font_color)

        elm_bg_color.addEventListener('click', () => {
          const style = new Jodit.ns.Style({
            style: { backgroundColor: 'transparent' }
          })
          style.apply(this.editor)
          console.log('backgroundColor:', style.options.style)
        })
        elm_font_color.addEventListener('click', () => {
          const style = new Jodit.ns.Style({
            style: { color: '#000' }
          })
          style.apply(this.editor)
          console.log('color:', style.options.style)
        })
      })
    },
    keydownTab(event) {
      event.preventDefault();
        if (event.key === 'Tab' || event.keyCode === 9) {
          console.log('event tab', event)
        }
    },
  },
}
</script>

<style>
  
</style>