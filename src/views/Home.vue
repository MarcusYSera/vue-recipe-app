<template>
  <main class="flex-container row home-main">
    <Schedule @open-cal="openCal"></Schedule>
  </main>
</template>

<script>
// @ is an alias to /src
import Schedule from '@/components/Schedule.vue';

export default {
  name: 'Home',
  components: {
    Schedule,
  },
};
</script>

<style scoped>
.home-main {
  height: 100%;
  overflow: hidden;
}
</style>
