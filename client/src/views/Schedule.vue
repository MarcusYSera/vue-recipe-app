<template>
  <main class="flex-container row home-main">
    <article class="flex-container column schedule-article">
      <header class="flex-container row schedule-header">
        <section>{{ selectedDateDisplay }}</section>
        <h4 v-if="user">{{ user.firstName }}</h4>
        <nav class="flex-container row schedule-header-right">
          <SearchBar @search-query="onSearchTerm"></SearchBar>
          <AddEvent></AddEvent>
          <button class="calButton">
            <img src="@/assets/svg/calOpenIcon.svg" @click.prevent="openCal" />
          </button>
        </nav>
      </header>
      <article class="grid-container dayview">
        <TimeBar @time-ref="timeRefData"></TimeBar>
        <!-- have this viewable for a full 24 hours around the current day and auto open to the current time-->
        <ToDo @time-of-task="timeOfTask"></ToDo>
      </article>
    </article>
    <CalendarComponent v-if="openCalendar"></CalendarComponent>
  </main>
</template>

<script>
import SearchBar from '@/components/schedule/SearchBar';
import TimeBar from '@/components/schedule/TimeBar';
import ToDo from '@/components/schedule/ToDo';
import CalendarComponent from '@/components/schedule/Calendar';
import AddEvent from '@/components/schedule/AddEvent';

import {
  mapGetters,
  mapActions,
  // mapState,
} from 'vuex';

export default {
  name: 'Schedule',
  components: { SearchBar, TimeBar, ToDo, CalendarComponent, AddEvent },
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
.home-main {
  /* height: 99%; */
  overflow: hidden;
}
.schedule-article {
  flex: auto;
  width: 100%;
  height: 100%;
  padding: 4vh 0.5% 0 0;
}
.schedule-header {
  padding: 0 1vw 3vh 0;
  justify-content: space-between;
  align-items: center;
  grid-area: header;
  border-bottom: 0.15rem solid #f3f3f3;
}
.dayview {
  /* margin-top: 1rem; */
  grid-area: dayview;
  grid-template: 'time todo' / 5rem 1fr;
  max-height: 100%;
  overflow: scroll;
  overflow-x: hidden;
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
