<template>
  <div class="grid-container home">
    <Schedule @open-cal="openCal"></Schedule>
    <Calendar v-if="openCalendar"></Calendar>
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
  data() {
    return {
      openCalendar: false,
    };
  },
  methods: {
    openCal() {
      this.openCalendar = !this.openCalendar;
    },
  },
};
</script>

<style scoped>
.home {
  grid-template-columns: 1fr auto;
  grid-template-rows: 1fr 10fr;
  grid-template-areas: 'header header' 'dayview calendarview';
}
</style>
