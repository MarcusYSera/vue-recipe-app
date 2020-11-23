<template>
  <aside class="searchbar-aside">
    <button @click="clickedSearch">
      <img src="@/assets/svg/search.svg" />
    </button>
    <input
      @input="onInput"
      v-if="searchOpen"
      type="text"
      placeholder="Search Bar"
    />
  </aside>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      searchOpen: false,
    };
  },
  methods: {
    clickedSearch() {
      this.searchOpen = !this.searchOpen;
    },
    onInput(event) {
      this.$emit('search-query', event.target.value);
    },
    closeSearch(e) {
      if (!this.$el.contains(e.target)) {
        this.searchOpen = false;
      }
    },
  },
  mounted() {
    document.addEventListener('click', this.closeSearch);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeSearch);
  },
};
</script>

<style scoped>
input {
  width: 75%;
  color: black;
}
.searchbar-aside {
  text-align: center;
  margin: 20px;
}
</style>
