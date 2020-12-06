<template>
  <button class="add-button" @click="openEvent">
    <img src="@/assets/svg/addCircle.svg" />
  </button>
  <aside v-if="openAddEvent" class="add-container">
    <input type="text" placeholder=" Add Recipe Name" />
    <input
      type="date"
      :value="getCurrentDate(currentDate)"
      :min="getCurrentDate(currentDate)"
    />
    <input type="time" :value="getCurrentTime(currentDate)" />
    <button type="submit">Create</button>
  </aside>
</template>

<script>
export default {
  name: 'AddEvent',
  data() {
    return {
      openAddEvent: false,
      currentDate: new Date(),
    };
  },
  methods: {
    openEvent() {
      this.openAddEvent = !this.openAddEvent;
    },
    getCurrentDate(date) {
      return date.toISOString().split('T')[0];
    },
    getCurrentTime(date) {
      let newTime = date
        .toLocaleTimeString(undefined, { hour12: false })
        .split(':');
      newTime.pop();
      return newTime.join(':');
      // return date.toLocaleTimeString(undefined, { hour12: false });
    },
  },
  // created() {
  //   let [month, date, year] = new Date()
  //     .toLocaleDateString(undefined)
  //     .split('/');
  //   this.currentDate = `${year}-${month}-${date}`;
  //   console.log(this.currentDate);
  //   return this.currentDate;
  // },
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
