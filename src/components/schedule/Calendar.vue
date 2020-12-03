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
        <h6 ref="0">Sun</h6>
        <h6 ref="1">Mon</h6>
        <h6 ref="2">Tue</h6>
        <h6 ref="3">Wed</h6>
        <h6 ref="4">Thu</h6>
        <h6 ref="5">Fri</h6>
        <h6 ref="6">Sat</h6>
      </section>
      <section class="grid-container dayNum">
        <p v-for="(value, index) in startDate" :key="index"></p>
        <p
          v-for="index in days"
          :key="index"
          class="dayNum"
          @click="clickedDate(index)"
          :class="'hello'"
        >
          {{ index }}
        </p>
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
      isToday: null,
    };
  },
  methods: {
    clickedDate(x) {
      this.$emit('calendar-click-date', x);
    },
    getCurrentMonth() {
      const options = { month: 'long', day: 'numeric' };
      [this.month, this.isToday] = new Date()
        .toLocaleDateString(undefined, options)
        .split(' ');
      console.log(this.month);
      console.log(this.isToday);
    },
    getDaysInCurrentMonth() {
      let [month, , year] = new Date().toLocaleDateString(undefined).split('/');
      // this.currentDate = date;
      let x = new Date(year, month, 0).toDateString();
      this.days = parseInt(x.split(' ')[2]);
    },
    convertToNum(x) {
      if (x === 'Sun') {
        return 0;
      } else if (x === 'Mon') {
        return 1;
      } else if (x === 'Tue') {
        return 2;
      } else if (x === 'Wed') {
        return 3;
      } else if (x === 'Thu') {
        return 4;
      } else if (x === 'Fri') {
        return 5;
      } else if (x === 'Sat') {
        return 6;
      }
      return x;
    },
  },
  computed: {
    startDate() {
      let [month, , year] = new Date().toLocaleDateString(undefined).split('/');
      let x = new Date(year, month - 1, 1).toDateString();
      x = x.split(' ')[0];
      x = this.convertToNum(x);
      // console.log(x);
      return x;
    },
  },
  mounted() {
    this.getCurrentMonth();
    this.getDaysInCurrentMonth();
  },
};
</script>

<style scoped>
.dayNum {
  justify-content: space-between;
  grid-template: repeat(6, 1fr) / repeat(7, 1fr);
  /* grid-template-rows: repeat(6, 1fr); */
  /* grid-template-columns: repeat(7, 1fr); */
}
.today {
  background-color: blue;
}
.dayAbbreviations {
  justify-content: space-between;
}
.calendar-aside {
  flex: initial;
  height: 100%;
  width: 40vw;
  background: #2c3355af;
}
.calendar-header {
  border-bottom: 2px solid black;
}
</style>
