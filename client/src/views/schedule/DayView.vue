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
  grid-template-rows: repeat(96, [row-start] 10vh);
  grid-template-columns: [column-start] 5rem [column-end] 1fr;
  max-height: 100%;
  overflow: scroll;
  overflow-x: hidden;
}
</style>
