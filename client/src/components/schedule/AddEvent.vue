<template>
  <button class="add-button" @click="openEvent">
    <img src="@/assets/svg/addCircle.svg" />
  </button>
  <aside v-if="openAddEvent" class="flex-container add-container">
    <form
      @submit.prevent="addEventOnSubmit"
      class="flex-container column addevent-form"
    >
      <button class="close-add-event" @click="clearEvent">X</button>
      <input
        type="text"
        placeholder=" Add Recipe Name"
        v-model="recipeName"
        class="recipe-name"
      />
      <input
        type="date"
        v-model="currentDate"
        :min="currentDate"
        class="recipe-name"
      />
      <div v-if="!timeChoice" class="start-or-end-button-group">
        <button @click="timeOption('start')" class="start-button">
          Start Time
        </button>
        <p class="or-text">or</p>
        <button @click="timeOption('end')" class="end-button">End Time</button>
      </div>
      <input v-else type="time" v-model="currentTime" class="recipe-name" />
      <input type="submit" value="Create" class="create-event-button" />
    </form>
  </aside>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'AddEvent',
  data() {
    return {
      openAddEvent: false,
      timeChoice: false,
      recipeName: '',
      currentDate: '',
      endOrStart: '',
      currentTime: '',
    };
  },
  computed: { ...mapGetters(['user']) },
  methods: {
    ...mapActions(['createEventByUserId', 'getEventsByUserId']),
    timeOption(choice) {
      this.endOrStart = choice;
      this.timeChoice = true;
    },
    clearEvent() {
      this.openAddEvent = !this.openAddEvent;
      this.timeChoice = false;
      this.recipeName = '';
      this.endOrStart = '';
      this.currentTime = this.getCurrentTime();
      this.currentDate = this.getCurrentDate();
    },
    openEvent() {
      this.openAddEvent = !this.openAddEvent;
      this.timeChoice = false;
    },
    getCurrentTime() {
      let newTime = new Date()
        .toLocaleTimeString(undefined, { hour12: false })
        .split(':');
      newTime.pop();
      if (newTime[0] === '24') {
        newTime[0] = '00';
      }
      return newTime.join(':');
    },
    getCurrentDate() {
      let t = new Date().toLocaleDateString().split('/');
      if (parseInt(t[1]) < 10) {
        t[1] = '0' + t[1];
      }
      if (parseInt(t[0]) < 10) {
        t[0] = '0' + t[0];
      }
      let holder = t.pop();
      t.unshift(holder);
      return t.join('-');
    },
    async addEventOnSubmit() {
      if (this.user) {
        let id = this.user.userId;
        let newEvent = {
          // user_fkid: this.user.userId,
          event_name: this.recipeName,
          event_date: this.currentDate,
          event_start_end: this.endOrStart,
          event_time: this.currentTime,
        };
        // console.log(this.user.userId);
        await this.createEventByUserId([id, newEvent]);
        console.log('finished event creation');
        this.clearEvent();
        console.log('cleared event');
      } else {
        alert('Please Login to Create Events');
      }
    },
  },
  created() {
    this.currentTime = this.getCurrentTime();
    this.currentDate = this.getCurrentDate();
    this.getEventsByUserId(this.user.userId);
  },
  updated() {
    console.log('going to retrieve events');
    this.getEventsByUserId(this.user.userId);
  },
};
</script>

<style scoped>
.start-or-end-button-group button {
  border-radius: 8px;
  padding: 0 1vw;
  margin: 0 0.4vw;
}
.start-or-end-button-group > * {
  height: 3.5vh;
  display: inline;
  position: relative;
}
.or-text {
  z-index: 100;
  margin: 0 -1vw;
  padding: 0 0.25vw;
  border-radius: 12px;
  background-color: #ffffff;
}
.end-button {
  color: #ffffff;
  background-color: #7dcea0;
}
.start-button {
  background-color: #e0e1e2;
}
.add-container {
  position: absolute;
  height: 250px;
  width: 300px;
  top: 30px;
  left: -250px;
  border: 1px solid black;
  background-color: white;
}
.add-button {
  border: none;
  background-color: white;
  padding: 0;
  margin: 0 1vw 0 0;
}
.add-button:focus {
  outline: none;
}
/* .addevent-form > * { */
/* margin: 1vh 2vw; */
/* } */
.recipe-name,
.start-or-end-button-group button {
  border: none;
}
.addevent-form {
  width: 100%;
  height: 100%;
  padding: 0 12%;
  justify-content: space-evenly;
  align-items: center;
}
.recipe-name:focus,
.close-add-event,
.start-or-end-button-group button:focus,
.create-event-button:focus {
  outline: none;
}
.close-add-event {
  border: none;
  background-color: #ffffff;
  align-self: center;
  margin: 0;
  padding: 0;
  position: absolute;
  right: 5%;
  top: 5%;
}
.create-event-button {
  border: 1px solid #7dcea0;
  width: 30%;
  color: #7dcea0;
  border-radius: 5px;
  background-color: #ffffff;
}
.recipe-name {
  width: 100%;
}
</style>
