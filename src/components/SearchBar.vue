<template>
  <div>
    <input @input="onInput" type="text" placeholder="Search Bar" />
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  methods: {
    onInput(event) {
      console.log(event.target.value);
      this.$emit('search-query', event.target.value);
    },
  },
};
</script>

<style></style>
