<template>
  <button class="add-button" @click="openEvent">
    <img src="@/assets/svg/addCircle.svg" />
  </button>
  <aside v-if="openAddEvent" class="add-container">
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
.add-container {
  position: absolute;
  height: 500px;
  width: 400px;
  top: 0;
  left: 0;
  border: 1px solid black;
}
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
