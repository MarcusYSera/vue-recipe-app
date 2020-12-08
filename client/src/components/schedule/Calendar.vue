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
        <div v-for="(value, index) in startDate" :key="index"></div>
        <div
          v-for="index in days"
          :key="index"
          @click="clickedDate(index)"
          class="dayNum-item"
        >
          <p>
            {{ index }}
          </p>
          <img
            src="@/assets/svg/calCircle.svg"
            v-if="index === currentDate"
            class="today"
          />
        </div>
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
      currentMonth: null,
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
    isTodayComputed(x) {
      console.log(x);
      return x;
    },
  },
  created() {
    this.currentDate = new Date().getDate();
    console.log(this.currentDate);
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
  /* height: 95%; */
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
  /* background-color: #2c3355af; */
}
.cal-button:focus {
  outline: none;
  /* border: none; */
}
.cal-button img {
  width: 100%;
  height: 100%;
  /* background-color: #2c3355af; */
}
.cal-month {
  margin: 0 1vw;
}
.calendar-aside-body {
  height: 40%;
}
.dayAbbreviations {
  flex: 0;
  justify-content: space-around;
}
.dayNum {
  grid-template: repeat(6, 1fr) / repeat(7, 1fr);
  flex: 1;
  /* align-items: center;
  justify-items: center; */
  /* position: relative; */
  /* height: 100%; */
  /* grid-template-rows: repeat(6, 1fr); */
  /* grid-template-columns: repeat(7, 1fr); */
}
.dayNum-item {
  height: 100%;
  width: 100%;
  position: relative;
}
.dayNum-item p {
  position: absolute;
  top: 30%;
  left: 50%;
  z-index: 1;
}
.dayNum-item img {
  position: relative;
  top: 20%;
  left: 30%;
  z-index: 0;
}
.today {
  /* top:25vh; */
  /* background: url(../../assets/svg/calCircle.svg) no-repeat center;
  height: 100%;
  width: 100%;
  text-align: center;
  line-height: 3.2; */
  /* padding-top: 30%; */
}
</style>
