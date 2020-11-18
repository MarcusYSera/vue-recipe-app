<template>
  <div>
    hello
    <a href="@/assets/img/test.pdf"></a>
  </div>
</template>

<script>
export default {
  name: 'Recipe',
  data() {
    return { iframe: { src: window.location.href } };
  },
};
</script>

<style></style>
