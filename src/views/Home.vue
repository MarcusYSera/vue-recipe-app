<template>
  <div class="home">
    <Schedule></Schedule>
    <Calendar></Calendar>
  </div>
</template>

<script>
// @ is an alias to /src
import Schedule from '@/components/Schedule.vue';
import Calendar from '@/components/Calendar.vue';

export default {
  name: 'Home',
  components: {
    Schedule,
    Calendar,
  },
};
</script>

<style scoped></style>
