<template>
  <article class="flex-container column schedule-article">
    <header class="flex-container row schedule-header">
      <section>{{ currentDate }} {{ currentMonth }}</section>
      <nav class="flex-container row schedule-header-right">
        <SearchBar @search-query="onSearchTerm"></SearchBar>
        <button class="calButton">
          <img src="@/assets/svg/calOpenIcon.svg" @click="openCalendar" />
        </button>
      </nav>
    </header>
    <article class="grid-container dayview">
      <TimeBar @time-from-timebar="timeFromTimebar"></TimeBar>
      <!-- have this viewable for a full 24 hours around the current day and auto open to the current time-->
      <ToDo @time-of-task="timeOfTask"></ToDo>
    </article>
  </article>
</template>

<style scoped>
.schedule-article {
  flex: auto;
  width: 100%;
}
.schedule-header {
  justify-content: space-between;
  align-items: center;
  grid-area: header;
  border-bottom: 0.15rem solid #f3f3f3;
}
.dayview {
  /* margin-top: 1rem; */
  grid-area: dayview;
  grid-template: 'time todo';
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

<script>
import SearchBar from '@/components/schedule/SearchBar';
import TimeBar from '@/components/schedule/TimeBar';
import ToDo from '@/components/schedule/ToDo';

export default {
  name: 'Schedule',
  components: { SearchBar, TimeBar, ToDo },
  data() {
    return {
      currentMonth: null,
      currentDate: null,
      hour: null,
      minute: null,
    };
  },
  methods: {
    timeFromTimebar(timeArr) {
      console.log(timeArr[0].innerHTML);
    },
    // timeOfTask(y) {
    //   console.log(y);
    // },
    openCalendar() {
      this.$emit('open-cal');
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
      [this.hour, this.minute] = new Date()
        .toLocaleTimeString('en-US')
        .split(/:| /);
    },
  },
  created() {
    this.createDate();
  },
};
</script>
