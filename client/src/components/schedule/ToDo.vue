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
    <p>Date: {{ item.start_date }} - {{ item.end_date }}</p>
    <p>Event Time: {{ item.event_time_start }} - {{ item.event_time_end }}</p>
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
    ...mapGetters({
      eventData: 'events',
      isLoggedIn: 'isLoggedIn',
      selectedDate: 'selectedDate',
    }),
  },
  methods: {
    calculatePosition(date) {
      return new Promise(resolve => {
        let answer =
          parseInt(date.getHours()) * 4 +
          Math.round(parseInt(date.getMinutes()) / 15) +
          1;
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
      this.eventData.forEach(async e => {
        e.dateObjStart = new Date(e.event_start);
        e.dateObjEnd = new Date(e.event_end);
        e.start_date = e.dateObjStart.toLocaleDateString();
        e.end_date = e.dateObjEnd.toLocaleDateString();
        e.event_time_start = e.dateObjStart.toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
        });
        e.event_time_end = e.dateObjEnd.toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
        });
        if (e.start_date === e.end_date) {
          e.list_position_start = await this.calculatePosition(e.dateObjStart);
          e.list_position_end = await this.calculatePosition(e.dateObjEnd);
        } else if (
          e.dateObjStart.getDate() < this.selectedDate.getDate() &&
          e.dateObjEnd.getDate() === this.selectedDate.getDate()
        ) {
          e.list_position_start = 1;
          e.list_position_end = await this.calculatePosition(e.dateObjEnd);
        } else if (
          e.dateObjEnd.getDate() > this.selectedDate.getDate() &&
          e.dateObjStart.getDate() === this.selectedDate.getDate()
        ) {
          e.list_position_end = 97;
          e.list_position_start = await this.calculatePosition(e.dateObjStart);
        } else if (
          e.dateObjEnd.getDate() !== this.selectedDate.getDate() &&
          e.dateObjStart.getDate() !== this.selectedDate.getDate()
        ) {
          // Test this out after custom duration timer is created
          e.list_position_start = 1;
          e.list_position_end = 97;
        }
        e.today = e.dateObjStart.toLocaleDateString(undefined, options);
      });
    }
  },
};
</script>

<style scoped>
.task-item {
  grid-column: column-end;
  /* overflow: scroll; */
  /* overflow-x: hidden; */
  /* position: sticky; */
  /* top: 0; */
  /* position: -webkit-sticky; */
  /* align-items: flex-start; */
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
