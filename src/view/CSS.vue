<template>
  <div class="wrapper">
    <div class="box1">
      <ul>
        <li v-for="item in 6" :key="item.id">{{item}}</li>
      </ul>
      <div class="box2 both">Both</div>
      <div class="box2 rectangle">Rectangle</div>
      <div class="box2 circle">Circle</div>
    </div>
    <div class="box3">
      <div class="item" v-for="d in 100" :key="d"></div>
    </div>
    <div class="box4"></div>
    <div class="box5">
      LOVE
      <span></span>
    </div>
    <div class="box6">
      <svg width="120" height="240">
      <defs>
        <linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="red"/>
          <stop offset="50%" stop-color="black" stop-opacity="0"/>
          <stop offset="100%" stop-color="blue"/>
      </linearGradient>
      </defs>
      <rect x="10" y="120" rx="15" ry="15" width="100" height="100" fill="url(#Gradient2)"/>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'css',
  data() {
    return {
      css: 'css'
    }
  },
  mounted() {
    this.fn()
  },
  methods: {
    random(min = 1, max = 10) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    },
    fn() {
      let arr = new Array(5)
      console.log('arr', arr)
      console.log('arr', arr[0])
      if (arr) {
        
      }
    },
  },
}
</script>

<style lang="less" scoped>
.wrapper {
  border: 1px solid red;
  width: 100%;
  height: calc(100% - 4px);
  .box1 {
    height: 100px;
    box-shadow: 0 0 10px #000;
    ul {
      display: flex;
      justify-content: space-around;
      margin-top: 10px;
      padding: 10px;
      li {
        position: relative;
        width: 100px;
        padding: 20px 0;
        box-shadow: inset 0 0 0 5px #aaa;
        // border-radius: 4px;
        box-sizing: border-box;
        text-align: center;
        &::before, &::after {
          content: '';
          display: block;
          position: absolute;
          width: 0;
          height: 0;
          // border-radius: 4px;
          // border: 5px solid #eee;
          transition: width 1.25s, height 1.25s;
        }
        &::before {
          top: 0px;
          left: 0px;
        }
        &::after {
          bottom: 0px;
          right: 0px;
        }
        &:hover {
          &::before {
          width: 100%;
          height: 100%;
          transition-delay: 1.25s, 0s;
          border-left: 5px solid red;
          border-bottom: 5px solid red;
        }
        &::after {
          width: 100%;
          height: 100%;
          transition-delay: 3.75s, 2.5s;
          border-right: 5px solid red;
          border-top: 5px solid red;
          
        }
        }
      }
    }
  }
}
.box2 {
  position: relative;
  width: 200px;
  height: 64px;
  line-height: 64px;
  // box-shadow: inset 0 0 0 3px #ddd;
  margin: 50px auto;
  text-align: center;
  color: #333;
  font-size: 16px;
  cursor: pointer;
  transition: color 1s;
  overflow: hidden;
  &::before, &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    top: 0;
    left: 0;
    box-sizing: border-box;
    border: 3px solid transparent;
  }

  &.both:hover {
    color: #00e2ff;
    &::before {
      transition: width .5s, height .5s, border-bottom-color 0s;
      transition-delay: .5s, 0s, .5s;
      width: 200px;
      height: 64px;
      border-left: 3px solid #00e2ff;
      border-bottom: 3px solid #00e2ff;
    }
    &::after {
      transition: width .5s, height .5s, border-right-color .5s;
      transition-delay: 0s, .5s, .5s;
      width: 200px;
      height: 64px;
      border-top: 3px solid #00e2ff;
      border-right: 3px solid #00e2ff;
    }
  }

  &.rectangle {
    &::after {
      top: unset;
      left: unset;
      right: 0;
      bottom: -0px;
    }
    &::before { }
    &:hover {
      &::before {
        width: 0;
        height: 0;
        transition: width 3.25s, height 3.25s;
        transition-delay: 3.25s, 0s, .25s;
        width: 200px;
        height: 64px;
        border-left: 3px solid #00e2ff;
        border-bottom: 3px solid #00e2ff;
      }
      &::after {
        transition: width 3.25s, height 3.25s, border-top-color .25s;
        transition-delay: 9.5s, 6.25s, 0.75s;
        width: 200px;
        height: 70px;
        border-top: 3px solid #00e2ff;
        border-right: 3px solid #00e2ff;
      }
    }   
  }

  &.circle {
    width: 120px;
    height: 120px;
    line-height: 120px;
    border-radius: 50%;
    &::before,
    &::after{
      border-radius: 50%; 
    }
    &:hover {
      color: #00e2ff;
      &::before {
        width: 120px;
        height: 120px;
        border-color: #00e2ff;
        transition: border-top-color .25s linear,
                    border-right-color .25s linear,
                    border-bottom-color .25s linear,
                    border-left-color .25s linear;
        transition-delay: 0s, .25s, .5s, .75s;
      }
      &::after {
        width: 120px;
        height: 120px;
        border-top: 3px solid #00e2ff;
        transform: rotate(270deg);
        transition: transform .75s linear;
        transition-delay: 0s;
      }
    }
  }
}
.box3 {
  width: 300px;
  height: 300px;
  border: 1px solid red;
  display: flex;
  flex-wrap: wrap;
  .item {
    width: 15px;
    height: 25px;
    border: 1px solid #eee;
    background: radial-gradient(ellipse farthest-side at 76% 77%, rgba(245, 228, 212, 0.25) 4%, rgba(255, 255, 255, 0) calc(4% + 1px)), radial-gradient(circle at 76% 40%, #fef6ec 4%, rgba(255, 255, 255, 0) 4.18%), linear-gradient(135deg, #ff0000 0%, #000036 100%), radial-gradient(ellipse at 28% 0%, #ffcfac 0%, rgba(98, 149, 144, 0.5) 100%), linear-gradient(180deg, #cd6e8a 0%, #f5eab0 69%, #d6c8a2 70%, #a2758d 100%); background-blend-mode: normal, normal, screen, overlay, normal;
  }
}
.box4 {
  margin: 20px;
  border: 1px solid rgb(110, 95, 240);
  width: 100px;
  height: 80px;
  position: relative;
  &::before, &::after {
    content: '';
    position: absolute;
    // border: 1px solid #6e5ff0;
    border: 1px solid transparent;
    width: 0px;
    height: 0px;
    transition: width .3s, height .3s;
  }
  &::before {
    top: -11px;
    left: -11px;
    border-right-color: transparent;
    border-top-color: transparent;
  }
  &::after {
    bottom: -11px;
    right: -11px;
    border-left-color: transparent;
    border-bottom-color: transparent;
    transition: width .3s, height .3s, border-width .3s;
    border-width: 0;
  }
  &:hover {
    &::before {
      width: 120px;
      height: 100px;
      transition-delay: .3s, 0s;
      border-left-color: #6e5ff0;
      border-bottom-color: #6e5ff0;
    }
    &::after {
      width: 120px;
      height: 100px;
      transition-delay: .9s, .6s, .6s;
      border-right-color: #6e5ff0;
      border-top-color: #6e5ff0;
      border-width: 1px;
    }

  }
}
.box5 {
  width: 100px;
  margin: 20px;
  padding: 20px 50px;
  position: relative;
  // box-shadow: 0 0 10px 5px #000 inset;
  // color: #fff;
  text-align: center;
  
  &::before, &::after, & span::before, & span::after {
    content: '';
    position: absolute;
    border-left: 1px solid red;
    border-radius: 50px;
    height: 100%;
    transition: all .3s;
    visibility: hidden;
    opacity: 0;
  }
  &::before {
    top: 100%;
    left: 0;
  }
  &::after {
    top: -100%;
    right: 0;
  }
  span {
    &::before, &::after {
      border-top: 1px solid red;    
      border-left: none;    
      width: 100%;
      height: 0;
    }
    &::before {
      top: 0;
      left: -100%;
    }
    &::after {
      bottom: 0;
      left: 100%;
    }
  }
  &:hover {
    &::before, &::after, & span::before, & span::after {
      visibility: visible;
      opacity: 1;
    }
    &::before {
      top: 0;
    }
    &::after {
      top: 0;
    }
    & span::before {
      left: 0;
    }
    & span::after {
      left: 0;
    }
  }
}
</style>