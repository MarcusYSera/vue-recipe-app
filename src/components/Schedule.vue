<template>
  <article class="flex-container column schedule-article">
    <header class="flex-container row schedule-header">
      <div>{{ currentDate }} {{ currentMonth }}</div>
      <div class="flex-container row schedule-header-right">
        <SearchBar @search-query="onSearchTerm"></SearchBar>
        <button class="calButton">
          <img src="@/assets/svg/calOpenIcon.svg" @click="openCalendar" />
        </button>
      </div>
    </header>
    <article class="dayview">Day to day view</article>
  </article>
</template>

<script>
import SearchBar from '@/components/SearchBar';

export default {
  name: 'Schedule',
  components: { SearchBar },
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
