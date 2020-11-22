<template>
  <main>
    <header class="flex-container row schedule-header">
      <div>{{ currentDate }} {{ currentMonth }}</div>
      <div class="flex-container row schedule-header-right">
        <img
          src="@/assets/svg/search.svg"
          v-if="!searchOpen"
          @click="clickedSearch"
        />
        <SearchBar @search-query="onSearchTerm" v-else></SearchBar>
        <img src="@/assets/svg/calOpenIcon.svg" @click="openCalendar" />
      </div>
    </header>
    <article></article>
  </main>
</template>

<script>
import SearchBar from '@/components/SearchBar';

export default {
  name: 'Schedule',
  components: { SearchBar },
  data() {
    return {
      searchOpen: false,
      currentMonth: null,
      currentDate: null,
      hour: null,
      minute: null,
    };
  },
  methods: {
    // openCalendar() {},
    onSearchTerm(term) {
      console.log(term);
    },
    clickedSearch() {
      this.searchOpen = !this.searchOpen;
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
.schedule-header {
  justify-content: space-between;
}
.schedule-header-right > * {
  padding-left: 20px;
}
</style>
