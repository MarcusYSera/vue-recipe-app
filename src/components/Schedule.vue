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
    <article class="dayview">
      <section class="flex-container column">
        <TimeBar />
        <!-- have this viewable for a full 24 hours around the current day and auto open to the current time-->
      </section>
      <section>
        <p>to do</p>
      </section>
    </article>
  </article>
</template>

<script>
import SearchBar from '@/components/SearchBar';
import TimeBar from '@/components/TimeBar';

export default {
  name: 'Schedule',
  components: { SearchBar, TimeBar },
  data() {
    return {
      currentMonth: null,
      currentDate: null,
      hour: null,
      minute: null,
    };
  },
  methods: {
    openCalendar() {
      this.$emit('open-cal', true);
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

<style scoped>
.schedule-article {
  flex: auto;
  width: 100%;
}
.schedule-header {
  justify-content: space-between;
  align-items: center;
  grid-area: header;
}
.dayview {
  grid-area: dayview;
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
