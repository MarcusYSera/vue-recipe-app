<template>
  <article class="dev-area">
    Development Page
    <!-- <ButtonDurationTimer></ButtonDurationTimer> -->
    <!-- <SelectDurationTimer></SelectDurationTimer> -->
    <StartOrEndTimer @selected-time="selectedTime"></StartOrEndTimer>
  </article>
</template>

<script>
// import ButtonDurationTimer from '@/components/dev/ButtonDurationTimer';
// import SelectDurationTimer from '@/components/dev/SelectDurationTimer';
import StartOrEndTimer from '@/components/schedule/event-component/StartOrEndTimer';

export default {
  name: 'Dev',
  components: {
    // ButtonDurationTimer,
    StartOrEndTimer,
    // SelectDurationTimer
  },
  methods: {
    selectedTime(arr) {
      console.log(arr);
    },
  },
};
</script>

<style scoped>
.dev-area {
  grid-area: mainContent;
}
</style>
