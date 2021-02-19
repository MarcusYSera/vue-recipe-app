<template>
  <!-- <article class="flex-container column todo-article"> -->
  <section v-if="!isLoggedIn" class="task-item one">
    <h3>Example of a Task at 12:00 A.M.</h3>
    <!-- <time hidden ref="taskTime">1:00 A.M.</time> -->
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
    <!-- <time hidden ref="taskTime">1:00 A.M.</time> -->
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
    :style="{ gridRow: `4 row-start` }"
  >
    <h3>{{ item.event_name }}</h3>
    <!-- <time hidden ref="taskTime">{{ item.event_time }}</time> -->
    <p>
      event {{ item.event_start_end }}: {{ item.today }} {{ item.event_time }}
    </p>
  </section>
  <!-- </article> -->
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ToDo',
  data() {
    return {
      top: '10px',
    };
  },
  computed: {
    ...mapGetters({ eventData: 'events', isLoggedIn: 'isLoggedIn' }),
  },
  methods: {
    // computedTop(time) {
    //   let date = new Date(time.event_date);
    //   console.log(date.getHours());
    //   let x = `${date.getMinutes()}`;
    //   return x;
    // },
  },
  updated() {
    if (this.eventData.length > 0) {
      let options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      this.eventData.forEach(e => {
        let nom = new Date(e.event_date);
        e.event_time = nom.toLocaleTimeString();
        e.today = nom.toLocaleDateString(undefined, options);
      });
    }
  },
};
</script>

<style scoped>
.todo-article {
  grid-area: todo;
  width: 100%;
}
.task-item {
  grid-column: column-end;
  max-height: 64px;
  overflow: scroll;
  overflow-x: hidden;
}
.one {
  /* grid-column: column-end; */
  /* grid-row: 1 row-start; */
  border-left: 2px solid #3d83f9;
  background-color: #3d83f915;
  /* margin-top: 20rem; */
  /* 3 rem + 1 rem for existing text */
}
.two {
  /* grid-column: column-end; */
  /* grid-row: 5 row-start; */
  border-left: 2px solid #eea57c;
  background-color: #eea57c15;
  /* margin-top: 24rem; */
}
</style>
