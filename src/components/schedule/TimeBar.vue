<template>
  <section class="flex-container column time-bar">
    <time
      v-for="current in hourData"
      v-bind:key="current"
      class="time-item"
      ref="currentTime"
      @click="clicked"
    >
      {{ current }}
    </time>
  </section>
</template>

<script>
import twentyFourData from '@/components/data/TwentyFourHourTimeByFifteenMinutes';

export default {
  name: 'TimeBar',
  data() {
    return {
      hourData: twentyFourData,
      twentyFour: false,
    };
  },
  methods: {
    clicked() {
      console.log(this.$refs.currentTime.innerHTML);
    },
    twelveHourFormat() {
      for (let i = 0; i < this.hourData.length; i++) {
        let hour = this.hourData[i].split(':')[0];
        let minute = this.hourData[i].split(':')[1];
        if (parseInt(hour) < 12 || parseInt(hour) > 23) {
          hour = parseInt(hour).toString();
          if (!minute.split(' ')[1]) {
            minute = minute + ' A.M.';
          }
        }
        if (parseInt(hour) === 0 || parseInt(hour) === 24) {
          hour = '12';
        }
        if (
          parseInt(hour) > 11 &&
          parseInt(hour) < 24 &&
          !minute.split(' ')[1]
        ) {
          if (parseInt(hour) > 12) {
            hour = (parseInt(hour) - 12).toString();
          }
          minute = minute + ' P.M.';
        }
        this.hourData[i] = [hour, minute].join(':');
      }
    },
  },
  created() {
    if (!this.twentyFour) {
      this.twelveHourFormat();
    }
  },
};
</script>

<style scoped>
.time-bar {
  grid-area: time;
  justify-content: space-between;
}
.time-item {
  margin-top: 3rem;
}
</style>
