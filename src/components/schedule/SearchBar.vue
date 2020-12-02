<template>
  <aside class="searchbar-aside">
    <button @click.prevent="clickedSearch" class="search-button">
      <img src="@/assets/svg/search.svg" />
    </button>
    <input
      @input="onInput"
      v-if="searchOpen"
      type="text"
      placeholder="Search Bar"
      ref="searchInput"
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
    focusOnInput() {
      this.$refs.searchInput.focus();
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
  updated() {
    if (this.searchOpen === true) {
      this.focusOnInput();
    }
  },
};
</script>

<style scoped>
.search-button {
  border: 0;
  background-color: #fff;
  padding: 0;
}
.search-button:focus {
  outline: none;
}
input {
  width: 75%;
  color: black;
}
.searchbar-aside {
  text-align: center;
  margin: 0 1vw 0 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>
