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
    <input type="file" @change="change">
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
    },
    //上传图片信息保存在数组中并且回显
    change(event) {
      let file = event.target.files[0];
      let windowURL = window.URL || window.webkitURL;
      //图片格式为PNG或JPG且小于5M
      if (/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/.test(file.name) && file.size < 5000000 ) {
        if (file) {
          let dataURl = windowURL.createObjectURL(file);
          file.url = dataURl;
          // this.multipartFile.push(file);
          this.url = dataURl;
          this.getImgBase64(dataURl);
        }
      } else {
        Toast({
          message: "银行印鉴卡格式为PNG或JPG且小于5M",
          position: "middle",
          duration: 1500,
        });
      }
    },
    image2Base64(img) {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);
      var dataURL = canvas.toDataURL("image/jpg");
      return dataURL;
    },
    getImgBase64(src) {
      var base64 = "";
      var img = new Image();
      img.src = src;
      let that =this
      img.onload = function () {
          base64 = that.image2Base64(img);
          console.log(base64);
          var el = document.createElement('img')
          el.src = base64
          document.body.appendChild(el)
      };
    },
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