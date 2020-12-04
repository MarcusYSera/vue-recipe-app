<template>
  <button class="add-button" @click="openEvent">
    <img src="@/assets/svg/addCircle.svg" />
  </button>
  <aside v-if="openAddEvent">
    <input type="text" />
  </aside>
</template>

<script>
export default {
  name: 'AddEvent',
  data() {
    return {
      openAddEvent: false,
    };
  },
  methods: {
    openEvent() {
      this.openAddEvent = !this.openAddEvent;
    },
  },
};
</script>

<style scoped>
.add-button {
  border: none;
  background-color: white;
  padding: 0;
  margin: 0 1vw 0 0;
}
.add-button:focus {
  outline: none;
}
</style>
