<template>
  <aside class="flex-container column">
    <header class="flex-container row header-container">
      <h4>
        Days
      </h4>
      <h4>
        Hours
      </h4>
      <h4>Minutes</h4>
    </header>
    <div class="flex-container row button-container">
      <button @click="openOptions('day')" v-if="!dayOpen">
        {{ selectedDay }}
      </button>
      <div v-else>
        <input type="text" />
        <div>
          <button
            v-for="(day, index) in days"
            :key="index"
            :value="day - 1"
            @click="selectedDuration('day', day - 1)"
          >
            {{ day - 1 }}
          </button>
        </div>
      </div>
      <button @click="openOptions('hour')" v-if="!hourOpen">
        {{ selectedHour }}
      </button>
      <button @click="openOptions('minute')" v-if="!minuteOpen">
        {{ selectedMinute }}
      </button>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'SelectDurationTimer',
  data() {
    return {
      days: 8,
      selectedDay: 0,
      dayOpen: false,
      hours: 23,
      selectedHour: 0,
      hourOpen: false,
      minutes: 60,
      selectedMinute: 0,
      minuteOpen: false,
    };
  },
  methods: {
    openOptions(choice) {
      if (choice === 'day') {
        this.dayOpen = true;
      }
    },
    selectedDuration(choice, day) {
      if (choice === 'day') {
        this.selectedDay = day;
        this.dayOpen = false;
      }
    },
  },
};
</script>

<style scoped>
aside {
  outline: 1px solid green;
  height: 15vh;
  width: 15vw;
}
.header-container {
  justify-content: space-around;
}
.button-container {
  justify-content: space-around;
}
</style>
