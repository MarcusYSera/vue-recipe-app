<template>
  <aside class="calendar-article">
    <header class="calendar-header">
      <button>
        <img src="@/assets/svg/prevArrow.svg" />
      </button>
      <h3>{{ month }}</h3>
      <button>
        <img src="@/assets/svg/nextArrow.svg" />
      </button>
    </header>
    <article class="grid-template">
      <section class="dayAbbreviations">
        <h6>Sun</h6>
        <h6>Mon</h6>
        <h6>Tue</h6>
        <h6>Wed</h6>
        <h6>Thu</h6>
        <h6>Fri</h6>
        <h6>Sat</h6>
      </section>
      <section class="dayNumerical" v-for="index in 30" :key="index">
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
      days: 30,
    };
  },
  methods: {},
  mounted() {
    const options = { month: 'long' };
    this.month = new Date().toLocaleDateString(undefined, options);
  },
};
</script>

<style scoped>
.calendar-article {
  flex: initial;
  height: 100%;
  background: #2c3355af;
}
.calendar {
  grid-area: calendarview;
}
.calendar-header {
  border-bottom: 2px solid black;
}
</style>
