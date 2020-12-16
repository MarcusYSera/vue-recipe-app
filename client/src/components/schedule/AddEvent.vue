<template>
  <button class="add-button" @click="openEvent">
    <img src="@/assets/svg/addCircle.svg" />
  </button>
  <aside v-if="openAddEvent" class="add-container">
    <input type="text" placeholder=" Add Recipe Name" v-model="recipeName" />
    <input type="date" :value="currentDate" :min="currentDate" />
    {{ currentDate }}
    <input type="time" v-model="currentTime" />
    {{ currentTime }}
    <button type="submit">Create</button>
  </aside>
</template>

<script>
export default {
  name: 'AddEvent',
  data() {
    return {
      openAddEvent: false,
      recipeName: '',
    };
  },
  computed: {
    currentTime: {
      get: () => {
        let newTime = new Date()
          .toLocaleTimeString(undefined, { hour12: false })
          .split(':');
        newTime.pop();
        return newTime.join(':');
      },
      set: newValue => {
        return newValue;
      },
    },
    currentDate: () => {
      let t = new Date().toLocaleDateString().split('/');
      let holder = t.pop();
      t.unshift(holder);
      console.log(holder);
      console.log(t.join('-'));
      return t.join('-');
    },
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
