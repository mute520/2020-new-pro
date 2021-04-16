<template>
  <div id="app">
    <div class="nav">
      <router-link v-for="item in navList" :to="item.path" :key="item.path">{{item.name}}</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      navList: [
        { path: '/css', name: 'CSS' },
        { path: '/home', name: 'Home' },
        { path: '/play8001', name: 'play8001' },
        { path: '/play8002', name: 'play8002' },
        { path: '/directive', name: 'directive' },
        { path: '/lazyLoad', name: 'lazyLoad' },
        { path: '/svg', name: 'svg' },
        { path: '/editor', name: 'editor' },
        { path: '/work', name: 'work' },
      ]
    }
  },
}
</script>

<style>
/* @import url('https://fonts.googleapis.com/css2?family=Langar&family=Ma+Shan+Zheng&display=swap'); */
html,
body,
#app {
  margin: 0;
  width: 100%;
  height: 100%;
  /* font-family: 'Langar', cursive; */
  /* font-family: 'Ma Shan Zheng'; */
}
.nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
}
.nav a {
  color: #fff;
  background: #52544c;
  flex-grow: 1;
  padding: 10px 0;
  text-decoration: none;
  border-right: 1px solid #fff;
  transition: all .2s;
}
.nav a.router-link-active {
  background: #4edd1f;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
