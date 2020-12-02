<template>
  <aside class="calendar-aside">
    <header class="calendar-header">
      <button>
        <img src="@/assets/svg/prevArrow.svg" />
      </button>
      <h3>{{ month }}</h3>
      <button>
        <img src="@/assets/svg/nextArrow.svg" />
      </button>
    </header>
    <article>
      <section class="flex-container row dayAbbreviations">
        <h6>Sun</h6>
        <h6>Mon</h6>
        <h6>Tue</h6>
        <h6>Wed</h6>
        <h6>Thu</h6>
        <h6>Fri</h6>
        <h6>Sat</h6>
      </section>
      <section
        class="grid-container dayNumerical"
        v-for="index in days"
        :key="index"
      >
        {{ index }}
      </section>
    </article>
  </aside>
</template>

<script>
export default {
  name: 'Calendar',
  data() {
    return {
      month: null,
      days: null,
      currentDate: null,
    };
  },
  methods: {
    getCurrentMonth() {
      const options = { month: 'long' };
      this.month = new Date().toLocaleDateString(undefined, options);
    },
    getDaysInCurrentMonth() {
      let [month, date, year] = new Date()
        .toLocaleDateString(undefined)
        .split('/');
      this.currentDate = date;
      let x = new Date(year, month, 0).toDateString();
      this.days = parseInt(x.split(' ')[2]);
    },
  },
  mounted() {
    this.getCurrentMonth();
    this.getDaysInCurrentMonth();
  },
};
</script>

<style scoped>
.calendar-article {
  grid-template:
    'dayName dayName dayName dayName dayName dayName dayName' repeat(7, 1fr)
    'numDay numDay numDay numDay numDay numDay numDay' repeat(7, 1fr)
    'numDay numDay numDay numDay numDay numDay numDay' repeat(7, 1fr)
    'numDay numDay numDay numDay numDay numDay numDay' repeat(7, 1fr)
    'numDay numDay numDay numDay numDay numDay numDay' repeat(7, 1fr)
    'numDay numDay numDay numDay numDay numDay numDay' repeat(7, 1fr)
    'numDay numDay numDay numDay numDay numDay numDay' repeat(7, 1fr);
}
.dayAbbreviations {
  grid-area: dayName;
  justify-content: space-between;
}
.dayNumerical {
  grid-area: numDay;
}
.calendar-aside {
  flex: initial;
  height: 100%;
  width: 40vw;
  background: #2c3355af;
}
.calendar {
  grid-area: calendarview;
}
.calendar-header {
  border-bottom: 2px solid black;
}
</style>
