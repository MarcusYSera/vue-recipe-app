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
      this.$emit('search-query', event.target.value);
    },
  },
};
</script>

<style scoped>
input {
  width: 75%;
  color: black;
}
div {
  text-align: center;
  margin: 20px;
}
</style>
