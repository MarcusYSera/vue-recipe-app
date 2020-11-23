<template>
  <div class="grid-container app-main">
    <!-- <header> -->
    <HamburgerNav class="hamNav"></HamburgerNav>
    <!-- <router-link to="/">home</router-link> -->
    <!-- | -->
    <!-- <router-link to="/about">about</router-link> -->
    <!-- </header> -->
    <router-view class="main-content-grid-area" />
    <footer class="bottomFooter">copyright sera-consulting</footer>
  </div>
</template>

<script>
import HamburgerNav from '@/components/HamburgerNav';

export default {
  name: 'App',
  components: { HamburgerNav },
};
</script>

<style>
html {
  font-size: 16px;
}
body {
  margin: 0;
  height: 100vh;
}
#app {
  height: 100%;
}
.grid-container {
  display: grid;
}
.flex-container {
  display: flex;
}
.row {
  flex-direction: row;
}
.column {
  flex-direction: column;
}
* {
  margin: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
</style>

<style scoped>
.app-main {
  height: 100%;
  grid-template-areas: 'navi mainContent' 'bottomFooter bottomFooter';
  grid-template-rows: 1fr 0.5%;
  grid-template-columns: auto 1fr;
  padding: 2%;
}
.hamNav {
  grid-area: navi;
}
.main-content-grid-area {
  grid-area: mainContent;
}
.bottomFooter {
  grid-area: bottomFooter;
  justify-self: center;
}
</style>
