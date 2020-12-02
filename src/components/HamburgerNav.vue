<template>
  <header class="flex-container column hamburger-nav-header">
    <button @click="clickedHamburger" class="hamburgerMenu-button itemOne">
      <img class="hamburger-icon" src="@/assets/svg/hamburger.svg" />
    </button>
    <nav v-if="open" class="flex-container column secondary itemTwo">
      <h3><router-link to="/">Schedule</router-link></h3>
      <h3><router-link to="/about">Recipe</router-link></h3>
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
    closeNav(e) {
      if (!this.$el.contains(e.target)) {
        this.open = false;
      }
    },
  },
  mounted() {
    document.addEventListener('click', this.closeNav);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.closeNav);
  },
};
</script>

<style scoped>
.hamburger-nav-header {
  height: 100vh;
  overflow: hidden;
  justify-content: flex-start;
  align-items: center;
  padding: 4vh 2vw 0 2vw;
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
