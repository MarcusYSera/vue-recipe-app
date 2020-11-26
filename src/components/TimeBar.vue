<template>
  <time v-for="current in hourData" v-bind:key="current">
    {{ current }}
  </time>
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
  methods: {},
  created() {
    if (!this.twentyFour) {
      for (let i = 0; i < this.hourData.length; i++) {
        let hour = this.hourData[i].split(':')[0];
        let minute = this.hourData[i].split(':')[1];
        if (parseInt(hour) === 0) {
          this.hourData[i] = '12:' + minute + ' A.M.';
          console.log(this.hourData[i]);
          continue;
        }
        if (parseInt(hour) > 12 && parseInt(hour) < 24) {
          hour = (parseInt(hour) - 12).toString();
          minute = minute + ' P.M.';
        }
        this.hourData[i] = [hour, minute].join(':');
        // console.log(this.hourData[i]);
      }
    }
  },
};
</script>

<style scoped></style>
