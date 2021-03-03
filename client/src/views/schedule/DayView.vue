<template>
  <section class="grid-container dayview">
    <!-- <TimeBar@time-ref="timeRefData"></TimeBar> -->
    <TimeBar></TimeBar>
    <!-- <ToDo @time-of-task="timeOfTask"></ToDo> -->
    <ToDo></ToDo>
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
  grid-template-rows: repeat(96, 10vh);
  grid-template-columns: 5rem;
  grid-auto-columns: minmax(23vw, 1fr);
  /* grid-auto-columns: 10px; */
  max-height: 100%;
  overflow: scroll;
  overflow-x: scroll;
}
</style>
