<template>
  <div class="grid-container main">
    <header>
      <router-link to="/">home</router-link> |
      <router-link to="/about">about</router-link>
    </header>
    <router-view />
    <footer>copyright sera-consulting</footer>
  </div>
</template>

<script>
export default { name: 'App' };
</script>

<style>
html {
  /* font-size: 1.25vw; */
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
.main {
  height: 100%;
  grid-template-rows: 5% 1fr 5%;
  padding: 2%;
}
</style>
