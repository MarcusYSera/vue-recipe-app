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
        class="recipe-name input-full-width"
      />
      <!-- <span>Associate Recipe:</span>
      <select v-model="associateRecipe">
        <option
          v-for="(option, index) in recipies"
          :value="option.value"
          :key="index"
          >{{ option.text }}</option
        >
      </select> -->
      <textarea
        v-model="description"
        placeholder="Short Description"
      ></textarea>
      <input
        type="date"
        v-model="currentDate"
        :min="currentDate"
        class="recipe-name date"
      />
      <StartOrEndTimer @selected-time="selectedTime"></StartOrEndTimer>
      <DurationTimer @durationSelected="durationClicked"></DurationTimer>
      <input type="submit" value="Create" class="create-event-button" />
    </form>
  </aside>
</template>

<script>
// issue with hitting enter on name input and the box closes. Adjust button down for this.openAddEvent/ openEvent()
import { mapActions, mapGetters } from 'vuex';
import DurationTimer from '@/components/schedule/event-component/DurationTimer';
import StartOrEndTimer from '@/components/schedule/event-component/StartOrEndTimer';

export default {
  name: 'AddEvent',
  components: { DurationTimer, StartOrEndTimer },
  data() {
    return {
      openAddEvent: false,
      recipeName: '',
      associateRecipe: '',
      description: '',
      currentDate: '',
      endOrStart: '',
      currentTime: '',
      oppositeTime: '',
      // duration needs to be 01:00 or 18:30
      duration: '0 00:00:00',
      region: '',
      recipies: [
        { text: 'Pizza', value: 'pizza' },
        { text: 'Doughnuts', value: 'doughnuts' },
      ],
    };
  },
  computed: {
    ...mapGetters(['user', 'isLoggedIn', 'selectedDateForDBQuery']),
  },
  methods: {
    ...mapActions(['createEventByUserId', 'getEventsByUserIdDate']),
    clearEvent() {
      this.openAddEvent = !this.openAddEvent;
      this.recipeName = '';
      this.associateRecipe = '';
      this.description = '';
      this.endOrStart = '';
      this.currentTime = '';
      this.currentDate = this.getCurrentDate();
      this.duration = '';
    },
    openEvent() {
      this.openAddEvent = !this.openAddEvent;
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
    calculateStartOrEndTime(chosenDate) {
      return new Promise(resolve => {
        this.oppositeTime = new Date(chosenDate);
        let baseTimeHours = this.oppositeTime.getHours();
        let baseTimeMinutes = this.oppositeTime.getMinutes();
        let timePassed = [
          parseInt(this.duration[0]) * 24 + parseInt(this.duration[1]),
          parseInt(this.duration[2]),
        ];
        this.endOrStart === 'Start'
          ? (timePassed = [
              timePassed[0] + baseTimeHours,
              timePassed[1] + baseTimeMinutes,
            ])
          : (timePassed = [
              baseTimeHours - timePassed[0],
              baseTimeMinutes - timePassed[1],
            ]);
        this.oppositeTime.setHours(timePassed[0], timePassed[1]);
        this.oppositeTime = new Date(this.oppositeTime).toISOString();
        resolve();
      });
    },
    async addEventOnSubmit() {
      if (this.isLoggedIn) {
        const chosenDate = `${this.currentDate} ${this.currentTime}`;
        const chosenDateAndTime = new Date(chosenDate).toISOString();
        await this.calculateStartOrEndTime(chosenDateAndTime);
        this.duration[1] =
          this.duration[1] < 10 && this.duration[1] !== '00'
            ? `0${this.duration[1]}`
            : this.duration[1];
        this.duration[2] =
          this.duration[2] < 10 && this.duration[2] !== '00'
            ? `0${this.duration[2]}`
            : this.duration[2];
        this.duration = `${this.duration[0]} ${this.duration[1]}:${this.duration[2]}:00`;
        let newEvent = {
          event_name: this.recipeName,
          event_associate_recipe: this.associateRecipe,
          event_description: this.description,
          event_start: chosenDateAndTime,
          event_end: this.oppositeTime,
          event_duration: this.duration,
        };
        if (this.endOrStart === 'End') {
          const end = newEvent.event_start;
          newEvent.event_start = newEvent.event_end;
          newEvent.event_end = end;
        }
        await this.createEventByUserId([newEvent, this.user.accessToken]);
        const here = new Intl.DateTimeFormat('default');
        await this.getEventsByUserIdDate([
          this.selectedDateForDBQuery,
          here.resolvedOptions().timeZone,
          this.user.accessToken,
        ]);
        this.clearEvent();
      } else {
        alert('Please Login to Create Events');
      }
    },
    durationClicked(arr) {
      if (typeof arr[0] === 'string') {
        arr[0] = '0';
      }
      if (typeof arr[1] === 'string') {
        arr[1] = '00';
      }
      if (typeof arr[2] === 'string') {
        arr[2] = '00';
      }
      this.duration = arr;
    },
    selectedTime(arr) {
      this.currentTime = arr[0];
      this.endOrStart = arr[1];
    },
  },
  created() {
    this.region = new Date();
    this.region = this.region
      .toString()
      .split(' ')[5]
      .split('-')[0];
    this.currentDate = this.getCurrentDate();
  },
};
</script>

<style scoped>
.add-container {
  position: absolute;
  height: 250px;
  width: 300px;
  top: 30px;
  left: -250px;
  z-index: 2;
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
.recipe-name {
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
.input-full-width {
  width: 100%;
}
@media only screen and (min-width: 320px) and (max-width: 415px) {
  .add-container {
    width: 230px;
    left: -185px;
  }
}
</style>
