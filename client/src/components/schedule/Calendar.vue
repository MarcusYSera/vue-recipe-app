<template>
  <aside class=" flex-container column calendar-aside-main">
    <header class="flex-container row calendar-header">
      <button class="cal-button">
        <img src="@/assets/svg/prevArrow.svg" />
      </button>
      <h3 class="cal-month">{{ month }}</h3>
      <button class="cal-button">
        <img src="@/assets/svg/nextArrow.svg" />
      </button>
    </header>
    <article class="flex-container column calendar-aside-body">
      <section class="grid-container dayAbbreviations">
        <h6 ref="0">Sun</h6>
        <h6 ref="1">Mon</h6>
        <h6 ref="2">Tue</h6>
        <h6 ref="3">Wed</h6>
        <h6 ref="4">Thu</h6>
        <h6 ref="5">Fri</h6>
        <h6 ref="6">Sat</h6>
      </section>
      <section class="grid-container dayNum">
        <!-- <div v-for="(value, index) in startDate" :key="index"></div> -->
        <div
          v-for="index in daysInMonth"
          :key="index"
          @click="clickedDate(index)"
          class="dayNum-item"
          :style="startDate"
        >
          <p :class="{ circleToday: index === today }">
            {{ index }}
          </p>
          <!-- <img
            src="@/assets/svg/calCircle.svg"
            v-if="index === currentDate"
            class="today"
          /> -->
        </div>
      </section>
    </article>
  </aside>
</template>

<script>
export default {
  name: 'CalendarComponent',
  data() {
    return {
      month: null,
      daysInMonth: null,
      dayOfWeekNum: null,
    };
  },
  methods: {
    clickedDate(x) {
      this.$emit('calendar-click-date', x);
    },
    getCurrentMonth() {
      const options = { month: 'long', day: 'numeric' };
      [this.month] = new Date()
        .toLocaleDateString(undefined, options)
        .split(' ');
    },
    getDaysInCurrentMonth() {
      var date = new Date();
      this.daysInMonth = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
      ).getDate();
    },
  },
  computed: {
    startDate() {
      let date = new Date();
      let firstOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      let x = new Date(firstOfMonth).getDay() + 1;
      return { '--grid-column': x };
    },
  },
  created() {
    this.today = new Date().getDate();
  },
  mounted() {
    this.getCurrentMonth();
    this.getDaysInCurrentMonth();
  },
};
</script>

<style scoped>
.calendar-aside-main {
  flex: initial;
  width: 40vw;
  background: #2c3355af;
}
.calendar-header {
  justify-content: center;
  border-bottom: 2px solid black;
  padding: 4vh 0;
}
.cal-button {
  padding: 0;
  border: 0;
}
.cal-button:focus {
  outline: none;
}
.cal-button img {
  width: 100%;
  height: 100%;
}
.cal-month {
  margin: 0 1vw;
}
.calendar-aside-body {
  height: 40%;
}
.dayNum,
.dayAbbreviations {
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
}
.dayAbbreviations {
  flex: 0;
}
.dayNum {
  flex: 1;
}
.dayNum-item {
  height: 100%;
  width: 100%;
  position: relative;
}
.circleToday {
  background-color: #7dcea0;
  border-radius: 50%;
}
.dayNum-item:first-child {
  grid-column: var(--grid-column);
}
.dayNum-item p {
  position: absolute;
  top: 30%;
  left: 45%;
  z-index: 1;
}
.dayNum-item img {
  position: relative;
  top: 20%;
  left: 30%;
  z-index: 0;
}
</style>
