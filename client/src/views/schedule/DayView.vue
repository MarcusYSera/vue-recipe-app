<template>
  <section class="grid-container dayview">
    <TimeBar @time-ref="timeRefData"></TimeBar>
    <ToDo @time-of-task="timeOfTask"></ToDo>
  </section>
</template>

<script>
import TimeBar from '@/components/schedule/TimeBar';
import ToDo from '@/components/schedule/ToDo';

export default {
  name: 'DayView',
  components: { TimeBar, ToDo },
};
</script>

<style scoped>
.dayview {
  /* margin-top: 1rem; */
  grid-area: dayview;
  grid-template: 'time todo' / 5rem 1fr;
  max-height: 100%;
  overflow: scroll;
  overflow-x: hidden;
}
</style>
