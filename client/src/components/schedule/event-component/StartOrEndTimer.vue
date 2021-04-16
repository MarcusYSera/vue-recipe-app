<template>
  <div v-if="!timeChoice" class="start-or-end-button-group">
    <button @click="timeOption('Start')" class="start-button">
      Start Time
    </button>
    <p class="or-text">or</p>
    <button @click="timeOption('End')" class="end-button">End Time</button>
  </div>
  <input
    v-else
    type="time"
    v-model="currentTime"
    v-on:input="timeSelection"
    class="recipe-name"
  />
</template>

<script>
export default {
  name: 'StartOrEndTimer',
  data() {
    return {
      timeChoice: false,
      currentTime: '',
      endOrStart: '',
    };
  },
  methods: {
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
    timeOption(choice) {
      this.endOrStart = choice;
      this.timeChoice = true;
      this.$emit('selected-time', [this.currentTime, this.endOrStart]);
    },
    timeSelection(event) {
      this.$emit('selected-time', [event.target.value, this.endOrStart]);
    },
  },
  created() {
    this.currentTime = this.getCurrentTime();
  },
};
</script>

<style scoped>
.start-or-end-button-group button {
  border-radius: 8px;
  padding: 0 1vw;
  margin: 0 0.4vw;
  border: none;
}
.start-or-end-button-group > * {
  height: 3.5vh;
  display: inline;
  position: relative;
}
.or-text {
  z-index: 100;
  margin: 0 -1vw;
  padding: 0 0.25vw;
  border-radius: 12px;
  background-color: #ffffff;
}
.end-button {
  color: #ffffff;
  background-color: #7dcea0;
}
.start-button {
  background-color: #e0e1e2;
}
</style>
