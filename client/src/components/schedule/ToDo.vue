<template>
  <section v-if="!isLoggedIn" class="task-item one">
    <h3>Example of a Task at 12:00 A.M.</h3>
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, facilis
      ab. Vero dolorum nihil, laborum, recusandae doloremque hic corporis at
      harum reprehenderit facilis cupiditate dolores amet. Possimus, repudiandae
      recusandae. Incidunt?
    </p>
  </section>
  <section
    v-if="!isLoggedIn"
    class="task-item two"
    :style="{ gridRow: `5 row-start` }"
  >
    <h3>Example of a Task at 1:00 A.M.</h3>
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae, facilis
      ab. Vero dolorum nihil, laborum, recusandae doloremque hic corporis at
      harum reprehenderit facilis cupiditate dolores amet. Possimus, repudiandae
      recusandae. Incidunt?
    </p>
  </section>

  <section
    v-else
    class="task-item two"
    v-for="(item, index) in eventData"
    v-bind:key="index + item.event_name"
    :style="{
      gridRow: `${item.list_position_start} row-start/ ${item.list_position_end} row-start`,
    }"
  >
    <h3>{{ item.event_name }}</h3>
    <!-- <p>Recipe: {{ item.associate_recipe }}</p> -->
    <p>Description: {{ item.event_description }}</p>
    <p>Event {{ item.event_start_end }}: {{ item.event_time }}</p>
    <p>Finish:</p>
    <p>
      Duration: {{ item.event_duration.hours }} hrs
      {{ item.event_duration.minutes }} min
    </p>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ToDo',
  computed: {
    ...mapGetters({ eventData: 'events', isLoggedIn: 'isLoggedIn' }),
  },
  methods: {
    calculateStartPosition(date) {
      return new Promise(resolve => {
        let answer =
          parseInt(date.getHours()) * 4 +
          Math.round(parseInt(date.getMinutes()) / 15) +
          1;
        resolve(answer);
      });
    },
    calculateEndPosition(start, duration) {
      return new Promise(resolve => {
        let answer =
          start + duration.hours * 4 + Math.round(duration.minutes / 15);
        resolve(answer);
      });
    },
  },
  updated() {
    if (this.eventData.length > 0) {
      let options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      console.log(this.eventData);
      this.eventData.forEach(async e => {
        let dateObj = new Date(e.event_start);
        e.event_time = dateObj.toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
        });
        e.list_position_start = await this.calculateStartPosition(dateObj);
        e.list_position_end = await this.calculateEndPosition(
          e.list_position_start,
          e.event_duration
        );
        e.today = dateObj.toLocaleDateString(undefined, options);
      });
    }
  },
};
</script>

<style scoped>
.task-item {
  grid-column: column-end;
  /* max-height: 64px; */
  overflow: scroll;
  overflow-x: hidden;
}
.one {
  border-left: 2px solid #3d83f9;
  background-color: #3d83f915;
}
.two {
  border-left: 2px solid #eea57c;
  background-color: #eea57c15;
}
</style>
