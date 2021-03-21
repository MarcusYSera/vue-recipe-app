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
        class="dayNum-item"
        :style="[
          index == 1 ? computeGridStart : '',
          index == todayDay ? calculateCircleToday() : '',
        ]"
      >
        <p
          :style="
            index == selectedDate.getDate() &&
            selectedDate.getMonth() == displayedMonth &&
            selectedDate.getFullYear() == displayedYear
              ? chosenDay
              : ''
          "
        >
          {{ index }}
        </p>
      </div>
      <div class="circleToday" :style="calculateCircleToday('circ')"></div>
    </article>
  </aside>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'CalendarComponent',
  data() {
    return {
      month: null,
      todayDay: null,
      todayMonth: null,
      todayYear: null,
      displayedDate: null,
      displayedMonth: null,
      displayedYear: null,
      daysInMonth: null,
      dayOfWeekNum: null,
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
      return `border-bottom: double thick black;`;
    },
  },
  methods: {
    ...mapActions([
      'setSelectedDate',
      'setDateForDBQuery',
      'getEventsByUserIdDate',
    ]),
    calculateCircleToday(x) {
      console.log('hello');
      let today = new Date();
      let start = new Date(
        this.displayedDate.getFullYear(),
        this.displayedDate.getMonth(),
        1
      );
      if (
        today.getFullYear() == this.displayedDate.getFullYear() &&
        today.getMonth() == this.displayedDate.getMonth()
      ) {
        let row = 2;
        let circle = (today.getDate() + start.getDate()) % 7;
        if (circle == 0) {
          row += (today.getDate() + start.getDate()) / 7;
        } else {
          row += Math.floor((today.getDate() + start.getDate()) / 7);
        }
        return `grid-area: ${row}/${circle}/${row}/${circle}`;
      } else {
        if (x == 'circ') {
          console.log('circ');
          return 'display: none';
        }
        console.log('else statement');
        return '';
      }
    },
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
    clickedDate(x) {
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
        this.getEventsByUserIdDate([
          this.user.userId,
          formatedDate,
          here.resolvedOptions().timeZone,
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
    },
  },

  created() {
    this.resetDate();
    this.todayDay = new Date().getDate();
  },
  mounted() {
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
.calendar-header .cal-button {
  font-size: 1.5em;
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
  /* grid-template-areas: '. . . . . . .' '. . . . . . .' '. . . . . . .' '. . . . . . .' '. . . . . . .' '. . . . . . .' '. . . . . . .'; */
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(7, 1fr);
  align-items: center;
  justify-items: center;
  /* text-align: center; */
  width: 25vw;
  height: 25vw;
}
.dayNum-item {
  z-index: 2;
}
/* .dayNum,
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
} */
/* .dayNum-item:first-child {
  grid-column: var(--grid-column);
} */
/* .dayNum-item p {
  position: absolute;
  top: 30%;
  left: 45%;
} */
/* .dayNum-item img {
  position: relative;
  top: 20%;
  left: 30%;
  z-index: 0;
} */

.circleToday {
  height: 100%;
  width: 100%;
  background-color: #7dcea0;
  border-radius: 50%;
  z-index: 1;
}
/* .selectedDateStyle {
  border-bottom: double thick #7dcea0;
} */
</style>
