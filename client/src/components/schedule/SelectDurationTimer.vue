<template>
  <div class="flex-container row button-container">
    <p>Duration:</p>
    <div class="mock-button-div" @click="openOptions('day')">
      {{ selectedDay }}
    </div>
    <div v-if="dayOpen" class="flex-container column number-button day">
      <!-- adjust focus to the input when this button is opened, similar to the search button -->
      <!-- <input type="text" /> -->
      <button
        v-for="(day, index) in days"
        :key="index"
        @click="selectedDuration('day', day - 1)"
      >
        {{ day - 1 }}
      </button>
    </div>

    <h5>:</h5>
    <div class="mock-button-div" @click="openOptions('hour')">
      {{ selectedHour }}
    </div>
    <div v-if="hourOpen" class="flex-container column number-button hour">
      <!-- <input type="text" /> -->
      <button
        v-for="(hour, index) in hours"
        :key="index"
        @click="selectedDuration('hour', hour - 1)"
      >
        {{ hour - 1 }}
      </button>
    </div>
    <h5>:</h5>
    <div class="mock-button-div" @click="openOptions('minute')">
      {{ selectedMinute }}
    </div>
    <div v-if="minuteOpen" class="flex-container column number-button minute">
      <!-- <input type="text" /> -->
      <button
        v-for="(minute, index) in minutes"
        :key="index"
        @click="selectedDuration('minute', minute - 1)"
      >
        {{ minute - 1 }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectDurationTimer',
  data() {
    return {
      days: 8,
      selectedDay: 'Days',
      dayOpen: false,
      hours: 24,
      selectedHour: 'Hours',
      hourOpen: false,
      minutes: 60,
      selectedMinute: 'Minutes',
      minuteOpen: false,
    };
  },
  methods: {
    openOptions(choice) {
      if (choice === 'day') {
        this.dayOpen = true;
      } else if (choice === 'hour') {
        this.hourOpen = true;
      } else if (choice === 'minute') {
        this.minuteOpen = true;
      }
    },
    selectedDuration(choice, day) {
      if (choice === 'day') {
        this.selectedDay = day;
        this.dayOpen = false;
        this.$emit('durationSelected', ['day', day]);
      } else if (choice === 'hour') {
        this.selectedHour = day;
        this.hourOpen = false;
        this.$emit('durationSelected', ['hour', day]);
      } else if (choice === 'minute') {
        this.selectedMinute = day;
        this.minuteOpen = false;
        this.$emit('durationSelected', ['minute', day]);
      }
    },
  },
};
</script>

<style scoped>
.button-container p {
  /* color: -internal-light-dark(black, white); */
  color: grey;
}
.header-container {
  justify-content: space-around;
}
.button-container {
  justify-content: space-around;
  align-items: flex-start;
  width: 100%;
}
.button-container > .mock-button-div {
  padding: 0 0.25rem;
  text-align: center;
  width: 100%;
}
.number-button {
  position: absolute;
  width: 20%;
  /* width: max-content; */
  background: lightgrey;
  flex: 1 0 auto;
  row-gap: 0.5vh;
  height: 20vh;
  overflow-y: scroll;
  /* padding: 3px; */
  border: 4px solid lightgrey;
}
.number-button::-webkit-scrollbar {
  width: 4px;
}
.day {
  left: 32%;
}
.hour {
  left: 49%;
}
.minute {
  left: 68%;
}
</style>
