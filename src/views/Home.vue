<template>
  <div class="home">
    <SearchBar @search-query="onSearchTerm" />
    <Recipe />
  </div>
</template>

<script>
// @ is an alias to /src
import SearchBar from '@/components/SearchBar.vue';
import Recipe from '@/components/Recipe.vue';

export default {
  name: 'Home',
  components: {
    SearchBar,
    Recipe,
  },
  methods: {
    onSearchTerm(term) {
      console.log(term);
    },
  },
};
</script>

<style scoped></style>
