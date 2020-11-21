<template>
  <div class="home">
    <SearchBar @search-query="onSearchTerm" />
    <Schedule></Schedule>
  </div>
</template>

<script>
// @ is an alias to /src
import SearchBar from '@/components/SearchBar.vue';
import Schedule from '@/components/Schedule.vue';

export default {
  name: 'Home',
  components: {
    SearchBar,
    Schedule,
  },
  methods: {
    onSearchTerm(term) {
      console.log(term);
    },
  },
};
</script>

<style scoped></style>
