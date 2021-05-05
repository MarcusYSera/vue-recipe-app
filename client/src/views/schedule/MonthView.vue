<template>
  <article class="grid-container monthview">
    MonthView
    <!-- <TimeBar></TimeBar> -->
  </article>
</template>

<script>
// import TimeBar from '@/components/schedule/TimeBar';

export default {
  name: 'MonthView',
  // components: { TimeBar },
};
</script>

<style scoped>
.monthview {
  grid-area: dayview;
}
</style>
