<template>
  <article class="grid-container schedule-article-grid">
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
    <DayView></DayView>
    <CalendarComponent v-if="openCalendar"></CalendarComponent>
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
        let here = new Intl.DateTimeFormat('default');
        this.getEventsByUserIdDate([
          this.user.userId,
          date.join('-'),
          here.resolvedOptions().timeZone,
        ]);
      }
    },
  },
  created() {
    if (!this.selectedDate) {
      this.createDate();
    }
  },
  mounted() {},
};
</script>

<style scoped>
.schedule-article-grid {
  grid-template-areas: 'header calendar' 'dayview calendar';
  grid-template-rows: 1fr 9fr;
  grid-template-columns: 1fr;
  overflow: hidden;
}
header {
  grid-area: header;
}
.schedule-header {
  padding: 0 1vw;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.15rem solid #f3f3f3;
}
.schedule-header-right {
  position: relative;
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
