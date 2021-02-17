<template>
  <main class="grid-container app-main">
    <!-- <header> -->
    <HamburgerNav class="hamNav"></HamburgerNav>
    <!-- <router-link to="/">home</router-link> -->
    <!-- | -->
    <!-- <router-link to="/about">about</router-link> -->
    <!-- </header> -->
    <router-view class="main-content-grid-area" />
    <!-- <footer class="bottomFooter">copyright sera-consulting</footer> -->
  </main>
</template>

<script>
import HamburgerNav from '@/components/HamburgerNav';

export default {
  name: 'App',
  components: { HamburgerNav },
};
</script>

<style>
button {
  border-radius: 5px;
}
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
*::-webkit-scrollbar {
  border: none;
  height: 1px;
  width: 8px;
  background-color: #ffffff;
}
*::-webkit-scrollbar-thumb {
  background: #2a2e4140;
  border-radius: 25px;
}
</style>

<style scoped>
.app-main {
  height: 100%;
  grid-template-areas: 'navi mainContent';
  /* grid-template-areas: 'navi mainContent' 'bottomFooter bottomFooter';
  grid-template-rows: 1fr 0.5%; */
  grid-template-columns: auto 1fr;
  /* padding: 2%; */
  overflow: hidden;
}
.hamNav {
  grid-area: navi;
}
.main-content-grid-area {
  grid-area: mainContent;
}
/* .bottomFooter {
  grid-area: bottomFooter;
  justify-self: center;
} */
</style>
