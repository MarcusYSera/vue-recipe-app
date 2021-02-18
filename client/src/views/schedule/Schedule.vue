<template>
  <!-- <article class="flex-container row schedule-article"> -->
  <article class="grid-container schedule-article-grid">
    <!-- <div class="flex-container column schedule-div"> -->
    <header class="flex-container row schedule-header">
      <time>{{ selectedDateDisplay }}</time>
      <h4 v-if="user">{{ user.firstName }}</h4>
      <nav class="flex-container row schedule-header-right">
        <SearchBar @search-query="onSearchTerm"></SearchBar>
        <AddEvent></AddEvent>
        <button class="calButton">
          <img src="@/assets/svg/calOpenIcon.svg" @click.prevent="openCal" />
        </button>
      </nav>
    </header>
    <DayView class="todo"></DayView>
    <!-- </div> -->
    <CalendarComponent v-if="openCalendar" class="calendar"></CalendarComponent>
  </article>
</template>

<script>
import DayView from '@/views/schedule/DayView';
import SearchBar from '@/components/schedule/SearchBar';
import CalendarComponent from '@/components/schedule/Calendar';
import AddEvent from '@/components/schedule/AddEvent';

import {
  mapGetters,
  mapActions,
  // mapState,
} from 'vuex';

export default {
  name: 'Schedule',
  components: { DayView, SearchBar, CalendarComponent, AddEvent },
  data() {
    return {
      currentMonth: null,
      currentDate: null,
      currentYear: null,
      // hour: null,
      // minute: null,
      taskTime: null,
      timeArr: null,
      openCalendar: false,
    };
  },
  computed: {
    ...mapGetters([
      'user',
      'selectedDate',
      'isLoggedIn',
      'selectedDateForDBQuery',
    ]),
    selectedDateDisplay() {
      this.updateSelectedDate(this.selectedDate);
      return `${this.currentMonth} ${this.currentDate}`;
    },
    // ...mapState(['user']),
  },
  methods: {
    ...mapActions([
      'setSelectedDate',
      'getEventsByUserIdDate',
      'setDateForDBQuery',
    ]),
    timeRefData(x) {
      this.timeArr = x;
    },
    timeOfTask(y) {
      this.taskTime = y;
    },
    openCal() {
      this.openCalendar = !this.openCalendar;
    },
    onSearchTerm(term) {
      console.log(term);
    },
    updateSelectedDate(UTCDate) {
      let options = { month: 'long', day: 'numeric' };
      [this.currentMonth, this.currentDate] = new Date(UTCDate)
        .toLocaleDateString(undefined, options)
        .split(' ');
    },
    createDate() {
      let rightNow = new Date();
      this.setSelectedDate(rightNow);
      this.updateSelectedDate(rightNow);
      if (this.isLoggedIn) {
        let date = new Intl.DateTimeFormat([], {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }).format(rightNow);
        date = date.split('/');
        date.unshift(date[2]);
        date.pop();
        this.setDateForDBQuery(date.join('-'));
        this.getEventsByUserIdDate([this.user.userId, date.join('-')]);
      }
    },
  },
  created() {
    this.createDate();
  },
  mounted() {},
};
</script>

<style scoped>
.schedule-article-grid {
  grid-template-areas: 'header calendar' 'todo calendar';
  grid-template-rows: 1fr 9fr;
  grid-template-columns: 1fr;
  /* grid-auto-columns: 1fr; */
  /* grid-auto-rows: 0px; */
  /* height: 99%; */
  overflow: hidden;
}
/* .schedule-div {
  flex: auto;
  width: 100%;
  height: 100%;
  padding: 4vh 0.5% 0 0;
} */
header {
  grid-area: header;
}
.schedule-header {
  padding: 0 1vw 3vh 0;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.15rem solid #f3f3f3;
}
.todo {
  grid-area: todo;
}
.calendar {
  grid-area: calendar;
}
.schedule-header-right {
  position: relative;
  /* width: 40vw; */
}
.schedule-header-right > img {
  padding-right: 20px;
}
.calButton {
  padding: 0;
  border: none;
  background-color: #fff;
}
.calButton:focus {
  outline: none;
}
.calButton:hover {
  cursor: pointer;
}
</style>
