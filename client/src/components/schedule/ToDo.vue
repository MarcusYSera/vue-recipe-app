<template>
  <article class="flex-container column todo-article">
    <section v-if="!isLoggedIn" class="task-item one">
      <h3>Example of a Task at 1:00 A.M.</h3>
      <time hidden ref="taskTime">1:00 A.M.</time>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae,
        facilis ab. Vero dolorum nihil, laborum, recusandae doloremque hic
        corporis at harum reprehenderit facilis cupiditate dolores amet.
        Possimus, repudiandae recusandae. Incidunt?
      </p>
    </section>

    <section
      v-else
      class="task-item two"
      v-for="(item, index) in events"
      v-bind:key="index"
    >
      <h3>{{ item.event_name }}</h3>
      <p>event {{ item.event_start_end }}: {{ item.event_time }}</p>
      {{ item }}
      <!-- {{ events }} -->
      <!-- <h3>Example of a Task</h3>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae,
        facilis ab. Vero dolorum nihil, laborum, recusandae doloremque hic
        corporis at harum reprehenderit facilis cupiditate dolores amet.
        Possimus, repudiandae recusandae. Incidunt?
      </p> -->
    </section>
    <!-- <section class="task-item three">
      <h3>Example of a Task</h3>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae,
        facilis ab. Vero dolorum nihil, laborum, recusandae doloremque hic
        corporis at harum reprehenderit facilis cupiditate dolores amet.
        Possimus, repudiandae recusandae. Incidunt?
      </p>
    </section>-->
  </article>
</template>

<script>
import {
  mapGetters,
  // mapActions
} from 'vuex';

export default {
  name: 'ToDo',
  computed: { ...mapGetters(['events', 'isLoggedIn']) },
  methods: {
    //  ...mapActions(['getEventsByUserId'])
  },
  mounted() {
    if (!this.isLoggedIn || (this.events && this.isLoggedIn)) {
      this.$emit('time-of-task', this.$refs.taskTime.innerHTML);
    }
  },
  updated() {
    // console.log(this.events);
    console.log(this.events[0].event_date);
  },
};
</script>

<style scoped>
.todo-article {
  grid-area: todo;
  width: 100%;
}
.task-item {
  max-height: 64px;
  overflow: scroll;
  overflow-x: hidden;
}
.one {
  border-left: 2px solid #3d83f9;
  background-color: #3d83f915;
  margin-top: 20rem;
  /* 3 rem + 1 rem for existing text */
}
/* .two {
  border-left: 2px solid #eea57c;
  background-color: #eea57c15;
  margin-top: 24rem;
} */
/* .three {
  border-left: 2px solid #50c878;
  background-color: #50c87815;
  margin-top: 16rem;
} */
/* .four {
  border-left: 2px solid #50c878;
  background-color: #50c87815;
  margin-top: 4rem;
} */
/* .five {
  border-left: 2px solid #50c878;
  background-color: #50c87815;
  margin-top: 8rem;
} */
/* .six {
  border-left: 2px solid #50c878;
  background-color: #50c87815;
  margin-top: 12rem;
} */
</style>
