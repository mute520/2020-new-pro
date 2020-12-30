<template>
  <div id="app">
    <div class="nav">
      <router-link to="/home">Home</router-link>
      <router-link to="/play8001">Play</router-link>
      <router-link to="/play8002">Play</router-link>
      <router-link to="/directive">directive</router-link>
      <router-link to="/lazyLoad">lazyLoad</router-link>
      <router-link to="/svg">SVG</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

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
