<template>
  <section class="flex-container column time-bar">
    <time
      v-for="(current, index) in hourData"
      :key="index"
      :value="current"
      class="time-item"
      :ref="current"
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
    roundTime(currentMin) {
      let rounded = 0;
      if (currentMin < 15) {
        rounded = '00';
      } else if (currentMin > 14 && currentMin < 30) {
        rounded = '15';
      } else if (currentMin > 29 && currentMin < 45) {
        rounded = '30';
      } else if (currentMin > 44) {
        rounded = '45';
      }
      return rounded;
    },
    getCurrentTime() {
      let rightNow = new Date();
      let currentHour = rightNow.getHours();
      let currentMin = rightNow.getMinutes();
      currentMin = this.roundTime(currentMin);
      if (currentHour > 12) {
        currentHour = (currentHour - 12).toString();
        currentMin = `${currentMin} P.M.`;
      } else {
        currentMin = `${currentMin} A.M.`;
      }
      // console.log(`${currentHour}:${currentMin}`);
      rightNow = `${currentHour}:${currentMin}`;
      return rightNow;
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
  mounted() {
    if (!this.twentyFour) {
      this.twelveHourFormat();
    }
    let current = this.getCurrentTime();
    this.$nextTick(() => {
      let currentTime = this.$refs[current];
      currentTime.scrollIntoView();
    });
    this.$emit('time-ref', this.hourData);
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
