<template>
  <header class="flex-container column hamburger-nav-header">
    <button @click="clickedHamburger" class="hamburgerMenu-button itemOne">
      <img class="hamburger-icon" src="@/assets/svg/hamburger.svg" />
    </button>
    <nav v-if="open" class="flex-container column secondary itemTwo">
      <h3><a>Schedule</a></h3>
      <h3><a>Recipe</a></h3>
      <h3><a>Profile</a></h3>
      <h3><a>Settings</a></h3>
      <h3 v-if="signedIn"><a>Sign Out</a></h3>
      <h3 v-else><a>Sign In</a></h3>
    </nav>
  </header>
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
.hamburger-nav-header {
  justify-content: flex-start;
  align-items: center;
  padding: 0 2.5rem 0 2rem;
}
.secondary > * {
  padding-top: 4.5vh;
  list-style-type: none;
}
.hamburgerMenu-button {
  border: none;
  background-color: #fff;
  padding: 0;
}
.hamburgerMenu-button:hover {
  background-color: lightgrey;
}
.hamburgerMenu-button:focus {
  outline: none;
  /* background-color: lightgreen; */
}
</style>
