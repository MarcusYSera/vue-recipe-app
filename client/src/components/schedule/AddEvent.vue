<template>
  <button class="add-button" @click="openEvent">
    <img src="@/assets/svg/addCircle.svg" />
  </button>
  <aside v-if="openAddEvent" class="add-container">
    <form @submit.prevent="addEventOnSubmit">
      <input type="text" placeholder=" Add Recipe Name" v-model="recipeName" />
      <input type="date" v-model="currentDate" :min="currentDate" />
      <input type="time" v-model="currentTime" />
      <input type="submit" value="create" />
    </form>
  </aside>
</template>

<script>
export default {
  name: 'AddEvent',
  data() {
    return {
      openAddEvent: false,
      recipeName: '',
      currentTime: '',
      currentDate: '',
    };
  },
  computed: {},
  methods: {
    openEvent() {
      this.openAddEvent = !this.openAddEvent;
    },
    getCurrentTime() {
      let newTime = new Date()
        .toLocaleTimeString(undefined, { hour12: false })
        .split(':');
      newTime.pop();
      if (newTime[0] === '24') {
        newTime[0] = '00';
      }
      return newTime.join(':');
    },
    getCurrentDate() {
      let t = new Date().toLocaleDateString().split('/');
      let holder = t.pop();
      t.unshift(holder);
      return t.join('-');
    },
    addEventOnSubmit() {
      let newEvent = {
        name: this.recipeName,
        time: this.currentTime,
        date: this.currentDate,
      };
      console.log(newEvent);
      this.recipeName = '';
      this.currentTime = this.getCurrentTime();
      this.currentDate = this.getCurrentDate();
    },
  },
  created() {
    this.currentTime = this.getCurrentTime();
    this.currentDate = this.getCurrentDate();
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
