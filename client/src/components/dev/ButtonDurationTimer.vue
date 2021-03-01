<template>
  <aside class="flex-container column duration-timer-aside">
    <div class="flex-container column">
      <h3>
        Days
      </h3>
      <div class="grid-container days-grid">
        <button class="day" v-for="(day, index) in days" v-bind:key="index.day">
          {{ day - 1 }}
        </button>
        <input class="custom-input day-custom-input" type="text" />
      </div>
    </div>
    <div class="flex-container column">
      <h3>
        Hours
      </h3>
      <div class="grid-container hours-grid">
        <button v-for="(hour, index) in hours" v-bind:key="index.hour">
          {{ hour - 1 }}
        </button>
        <input class="custom-input" type="text" />
      </div>
    </div>
    <div class="flex-container column">
      <h3>
        Minutes
      </h3>
      <div class="grid-container minutes-grid">
        <button v-for="(minute, index) in minutes" v-bind:key="index.minute">
          {{ minute }}
        </button>
        <input class="custom-input" type="text" />
      </div>
    </div>
    <div class="flex-container row action-buttons">
      <button>Set</button>
      <button>Clear</button>
      <button>Close</button>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'ButtonDurationTimer',
  data() {
    return {
      days: 8,
      hours: 13,
      minutes: [0, 15, 30, 45],
      setDays: 0,
      setHours: 0,
      setMinutes: 0,
    };
  },
};
</script>

<style scoped>
.duration-timer-aside {
  gap: 0.25rem;
}
.days-grid,
.hours-grid,
.minutes-grid,
.action-buttons {
  gap: 0.75rem;
  /* grid-row-gap: 0.75rem; */
  /* grid-column-gap: 0.25rem; */
}
.days-grid,
.hours-grid,
.minutes-grid {
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(2, 1fr);
}
.days-grid {
  grid-template-areas: '. . . . c-input c-input c-input' '. . . . c-input c-input c-input';
}
.hours-grid {
  grid-template-areas: '. . . . . . .' '. . . . . . c-input';
}
.minutes-grid {
  grid-template-areas: '. . . . c-input';
}
.custom-input {
  grid-area: c-input;
  width: 10vw;
}
.day-custom-input {
  height: 2.25vh;
}
</style>
