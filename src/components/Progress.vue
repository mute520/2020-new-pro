<template>
  <div>
    <div class="progress">
      <div class="wrap">
        <div class="progress-outer">
          <div class="progress-inner" :style="{width: `${percent}%`}"></div>
        </div>
      </div>
      <div class="text">{{percent}}%</div>
    </div>
    <div class="btn">
      <el-button @click="run" size="mini">start</el-button>
      <el-button @click="stop" size="mini">stop</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'progress',
  data() {
    return {
      percent: 0,
      timer: null,
    }
  },
  methods: {
    run() {
      this.percent = 0
      this.timer && clearInterval(this.timer)
      this.timer = setInterval(() => {
        if (this.percent >= 100) {
          this.percent = 100
          clearInterval(this.timer)
          return
        }
        this.percent += 2
      }, 60)
    },
    stop() {
      clearInterval(this.timer)
    },
  }
}
</script>
<style lang="less" scoped>
.progress {
  display: flex;
  align-items: center;
  margin: 30px;
  border: 1px dotted;
  width: 300px;
  .wrap {
    margin-right: -55px;
    padding-right: 50px;
    width: 100%;
    box-sizing: border-box;
  }
  .progress-outer {
    height: 10px;
    background: #ddd;
    border-radius: 10px;
  }
  .progress-inner {
    height: 10px;
    width: 50%;
    background: #0f9;
    border-radius: 10px;
    transition: all .5s ease;
    // animation: animate 3s infinite;
  }
  .text {
    margin-left: 10px;
  }
}

@keyframes animate {
  0% { width: 0%; }
  // 25% { width: 25%; }
  // 50% { width: 50%; }
  // 75% { width: 75%; }
  100% { width: 100%; }
}

</style>