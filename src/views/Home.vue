<template>
  <main class="flex-container row home-main">
    <Schedule @open-cal="openCal"></Schedule>
    <Calendar v-if="openCalendar"></Calendar>
  </main>
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
.home-main {
  height: 100%;
  overflow: hidden;
}
/* .schedule-article {
  flex: 1;
} */
/* .calendar-article {
  flex: 0;
} */
</style>
