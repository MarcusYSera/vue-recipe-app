<template>
  <aside class=" flex-container column calendar-aside-main">
    <header class="flex-container column calendar-header">
      <nav class="flex-container row">
        <button class="cal-button" @click="changeMonth('prev')">
          &lsaquo;
        </button>
        <h3 class="cal-month">{{ month }} {{ displayedYear }}</h3>
        <button class="cal-button" @click="changeMonth('next')">
          &rsaquo;
        </button>
      </nav>
      <p class="flex-container resetBtnDiv">
        <button class="resetDateBtn" @click="resetDate(true)">
          Today
        </button>
      </p>
    </header>
    <article class="grid-container calendar-article-body">
      <h6 ref="0">Sun</h6>
      <h6 ref="1">Mon</h6>
      <h6 ref="2">Tue</h6>
      <h6 ref="3">Wed</h6>
      <h6 ref="4">Thu</h6>
      <h6 ref="5">Fri</h6>
      <h6 ref="6">Sat</h6>
      <div
        v-for="index in daysInMonth"
        :key="`day-${index}`"
        @click="clickedDate(index)"
        class="dayNum-item flex-container"
        :class="today.getDate() === index ? computeCircleToday : ''"
        :style="[index == 1 ? computeGridStart : '']"
      >
        <p :class="index == selectedDate.getDate() ? chosenDay : ''">
          {{ index }}
        </p>
      </div>
    </article>
  </aside>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'CalendarComponent',
  data() {
    return {
      today: new Date(),
      month: null,
      todayMonth: null,
      todayYear: null,
      displayedDate: new Date(this.selectedDate),
      displayedMonth: null,
      displayedYear: null,
      daysInMonth: null,
      dayOfWeekNum: null,
      circleVisible: true,
    };
  },
  computed: {
    ...mapGetters(['selectedDate', 'user']),
    computeGridStart() {
      let x = new Date(
        this.displayedDate.getFullYear(),
        this.displayedDate.getMonth(),
        1
      );
      let column = x.getDay() + 1;
      return `grid-column: ${column}`;
    },
    chosenDay() {
      if (
        this.selectedDate.getMonth() == this.displayedMonth &&
        this.selectedDate.getFullYear() == this.displayedYear
      ) {
        return 'selected-date';
      }
      return '';
    },
    computeCircleToday() {
      if (
        this.displayedDate.getMonth() === this.today.getMonth() &&
        this.displayedDate.getFullYear() === this.today.getFullYear()
      ) {
        return 'circle-today';
      }
      return '';
    },
  },
  methods: {
    ...mapActions([
      'setSelectedDate',
      'setDateForDBQuery',
      'getEventsByUserIdDate',
    ]),
    calculateMonth(x) {
      const options = { month: 'long', day: 'numeric', year: 'numeric' };
      if (x) {
        [this.month] = new Date(this.displayedYear, this.displayedMonth)
          .toLocaleDateString(undefined, options)
          .split(' ');
      } else {
        [this.month, , this.todayYear] = new Date(this.selectedDate)
          .toLocaleDateString(undefined, options)
          .split(' ');
        this.todayMonth = this.month;
      }
    },
    changeMonth(x) {
      if (x === 'prev') {
        this.displayedMonth = this.displayedDate.getMonth() - 1;
        this.calculateMonth(x);
        if (this.displayedMonth === -1) {
          this.displayedMonth = 11;
          this.displayedYear--;
        }
      } else if (x === 'next') {
        this.displayedMonth = this.displayedDate.getMonth() + 1;
        this.calculateMonth(x);
        if (this.displayedMonth === 12) {
          this.displayedMonth = 0;
          this.displayedYear++;
        }
      }
      this.displayedDate = new Date(this.displayedYear, this.displayedMonth);
      this.getDaysInCurrentMonth();
    },
    async clickedDate(x) {
      if (x < 10) {
        x = `0${x}`;
      } else {
        x = x.toString();
      }
      let formatedDate = `${this.displayedYear}-${this.month}-${x}`;
      let selectedUTC = new Date(formatedDate);
      this.setSelectedDate(selectedUTC);
      if (this.displayedDate.getMonth() + 1 < 10) {
        formatedDate = `${this.displayedYear}-0${this.displayedDate.getMonth() +
          1}-${x}`;
      } else {
        formatedDate = `${this.displayedYear}-${this.displayedDate.getMonth() +
          1}-${x}`;
      }
      this.setDateForDBQuery(formatedDate);
      if (this.user) {
        let here = new Intl.DateTimeFormat('default');
        await this.getEventsByUserIdDate([
          formatedDate,
          here.resolvedOptions().timeZone,
          this.user.accessToken,
        ]);
      }
    },
    getDaysInCurrentMonth() {
      this.daysInMonth = new Date(
        this.displayedDate.getFullYear(),
        this.displayedDate.getMonth() + 1,
        0
      ).getDate();
    },
    resetDate(hardReset) {
      if (hardReset) {
        let rightNow = new Date();
        this.setSelectedDate(rightNow);
      }
      this.calculateMonth();
      this.displayedDate = new Date(this.selectedDate);
      this.displayedMonth = this.displayedDate.getMonth();
      this.displayedYear = this.displayedDate.getFullYear().toString();
      this.getDaysInCurrentMonth();
      this.clickedDate(this.displayedDate.getDate());
      this.circleVisible = true;
    },
  },

  created() {
    console.log('created');
    this.resetDate();
  },
};
</script>

<style scoped>
.calendar-aside-main {
  grid-area: calendar;
  flex: initial;
  width: 25vw;
  background: #ffffff;
  position: relative;
}
.calendar-aside-main:after {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: #2a2e418f;
  top: 0;
  right: 0;
  display: block;
  content: '';
}
.calendar-aside-body {
  margin: 0 1vw;
  padding: 2vh 0;
  border-top: 2px solid #f3f3f313;
}
.calendar-header {
  border-bottom: 2px solid rgba(0, 0, 0, 0.178);
  padding: 1vh 0 1vh;
  margin: 0 1vw;
}
.calendar-header > * {
  justify-content: center;
}
.calendar-header .cal-button {
  padding: 0;
  border: 0;
  background: none;
  font-size: 1.5em;
  cursor: pointer;
}
.resetBtnDiv {
  padding: 0.75vh 0 0 0;
}
.cal-button,
.dayNum-item p,
.cal-month,
.resetDateBtn,
.dayAbbreviations {
  z-index: 1;
  color: #e4e4e4;
}
.resetDateBtn {
  background: none;
  border: 1px solid white;
  width: 4em;
}
.cal-button:focus,
.resetDateBtn:focus {
  outline: none;
}
.cal-button:hover,
.resetDateBtn:hover {
  color: white;
}
.cal-month {
  margin: 0 1vw;
  padding-top: 0.33vh;
  width: 7em;
  text-align: center;
}
.calendar-aside-body {
  height: 40%;
}
.calendar-article-body {
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(7, 1fr);
  width: 25vw;
  height: 25vw;
}
.calendar-article-body h6 {
  align-self: center;
  justify-self: center;
}
.dayNum-item {
  z-index: 2;
  align-items: center;
  justify-content: center;
}

.circle-today {
  height: 100%;
  width: 100%;
  background-color: #7dcea0;
  border-radius: 50%;
  z-index: 1;
}
.selected-date {
  border-bottom: double thick black;
}
</style>
