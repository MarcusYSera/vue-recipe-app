<template>
  <button class="add-button" @click="openEvent">
    <img src="@/assets/svg/addCircle.svg" />
  </button>
  <aside v-if="openAddEvent" class="add-container">
    <input type="text" placeholder=" Add Recipe Name" />
    <input type="text" placeholder="Select Date/Calendar Module " />
    <button type="submit">Create</button>
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
  height: 200px;
  width: 250px;
  top: 30px;
  left: -200px;
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
