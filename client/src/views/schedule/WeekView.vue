<template>
  <article class="grid-container weekview">
    <TimeBar></TimeBar>
  </article>
</template>

<script>
import TimeBar from '@/components/schedule/TimeBar';

export default {
  name: 'WeekView',
  components: { TimeBar },
};
</script>

<style scoped>
.weekview {
  grid-area: dayview;
}
</style>
