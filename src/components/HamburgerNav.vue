<template>
  <div class="flex-container main column">
    <button @click="clickedHamburger" class="hamburgerMenu itemOne">
      <img src="@/assets/svg/hamburger.svg" />
    </button>
    <ul v-if="open" class="flex-container column secondary itemTwo">
      <li>
        <h3><a>Schedule</a></h3>
      </li>
      <li>
        <h3><a>Recipe</a></h3>
      </li>
      <li>
        <h3><a>Profile</a></h3>
      </li>
      <li>
        <h3><a>Settings</a></h3>
      </li>
      <li v-if="signedIn">
        <h3><a>Sign Out</a></h3>
      </li>
      <li v-else>
        <h3><a>Sign In</a></h3>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HamburgerNav',
  data() {
    return {
      open: false,
    };
  },
  methods: {
    clickedHamburger() {
      this.open = !this.open;
    },
  },
};
</script>

<style scoped>
.main {
  justify-content: flex-start;
  align-items: center;
}
.secondary > li {
  padding-top: 4.5vh;
  list-style-type: none;
}
.hamburgerMenu {
  border: none;
  background-color: #fff;
  padding: 0;
}
.hamburgerMenu:hover {
  background-color: lightgrey;
}
.hamburgerMenu:focus {
  outline: none;
  background-color: lightgreen;
}
.itemTwo {
}
</style>
