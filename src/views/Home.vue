<template>
  <div class="home">
    <SearchBar @search-query="onSearchTerm" />
  </div>
</template>

<script>
// @ is an alias to /src
import SearchBar from '@/components/SearchBar.vue';

export default {
  name: 'Home',
  components: {
    SearchBar,
  },
  methods: {
    onSearchTerm(term) {
      console.log(term);
    },
  },
};
</script>
