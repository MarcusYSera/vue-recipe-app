<template>
  <!-- <section class="flex-container column time-bar"> -->
  <time
    v-for="(current, index) in hourData"
    :key="`timebar-${index}`"
    :value="current"
    class="time-item"
    :style="{ gridRow: ` ${index + 1}` }"
    :ref="current"
  >
    {{ current }}
  </time>
  <!-- </section> -->
</template>

<script>
import twentyFourFifteenData from '@/components/data/TwentyFourHourTimeByFifteenMinutes';
import twentyFourHourData from '@/components/data/TwentyFourHourTimeByHour';

export default {
  name: 'TimeBar',
  data() {
    return {
      // realTwentyFour: null,
      hourData: twentyFourFifteenData,
      hourByHourData: twentyFourHourData,
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
      if (currentHour > 11) {
        currentHour =
          currentHour == 12
            ? currentHour.toString()
            : (currentHour - 12).toString();
        currentMin = `${currentMin} P.M.`;
      } else {
        if (currentHour === 0) {
          currentHour = '12';
        }
        currentMin = `${currentMin} A.M.`;
      }
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
  created() {
    // this.realTwentyFour = JSON.parse(JSON.stringify(twentyFourData));
    if (!this.twentyFour) {
      this.twelveHourFormat();
    }
    let current = this.getCurrentTime();
    this.$nextTick(() => {
      let currentTime = this.$refs[current];
      currentTime.scrollIntoView();
    });
    // this.$emit('time-ref', this.hourData);
    // this.realTwentyFour.forEach((time, index) => {
    //   this.realTwentyFour[index] = time.split(':').join('');
    // });
  },
};
</script>

<style scoped>
.time-bar {
  /* grid-area: time; */
  justify-content: space-between;
}
.time-item {
  /* grid-row: row-start; */
  /* grid-column: column-start; */
  /* grid-area: time; */
  /* margin-top: 3rem; */
}
</style>
