<template>
  <main class="flex-container row home-main">
    <article class="flex-container column schedule-article">
      <header class="flex-container row schedule-header">
        <section>{{ currentDate }} {{ currentMonth }}</section>
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
    <Calendar
      v-if="openCalendar"
      @calendar-click-date="calClickDate"
    ></Calendar>
  </main>
</template>

<script>
import SearchBar from '@/components/schedule/SearchBar';
import TimeBar from '@/components/schedule/TimeBar';
import ToDo from '@/components/schedule/ToDo';
import Calendar from '@/components/schedule/Calendar';
import AddEvent from '@/components/schedule/AddEvent';

export default {
  name: 'Schedule',
  components: { SearchBar, TimeBar, ToDo, Calendar, AddEvent },
  data() {
    return {
      currentMonth: null,
      currentDate: null,
      // hour: null,
      // minute: null,
      taskTime: null,
      timeArr: null,
      openCalendar: false,
    };
  },
  methods: {
    calClickDate(x) {
      // create new variable, to account for a today button which resets calendar view
      this.currentDate = x;
      console.log(x);
    },
    timeRefData(x) {
      // console.log(x);
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
    createDate() {
      let options = { month: 'long', day: 'numeric' };

      [this.currentMonth, this.currentDate] = new Date()
        .toLocaleDateString('en-US', options)
        .split(' ');
      // .split('/');
      // [this.hour, this.minute] = new Date()
      //   .toLocaleTimeString('en-US')
      //   .split(/:| /);
    },
  },
  created() {
    this.createDate();
  },
  // mounted() {
  //   if (this.taskTime && this.timeArr) {
  //     console.log(this.timeArr.findIndex(el => el === this.taskTime));
  //   }
  // },
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
