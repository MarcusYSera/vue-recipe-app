<template>
  <header class="flex-container column hamburger-nav-header">
    <button @click="clickedHamburger" class="hamburgerMenu-button itemOne">
      <img class="hamburger-icon" src="@/assets/svg/hamburger.svg" />
    </button>
    <nav v-if="open" class="flex-container column secondary itemTwo">
      <h3
        v-for="(category, index) in navCategories"
        :key="`nav-${index}`"
        @click="itemOpen(category)"
        :class="{ selectedButton: openItem === category }"
      >
        <router-link :to="{ name: category }">{{ category }}</router-link>
      </h3>
      <h3 v-if="isLoggedIn" @click="logout">Sign Out</h3>
      <h3 v-else><router-link :to="{ name: 'login' }">Login</router-link></h3>
      <!-- <p v-if="user">{{ user.firstName }}</p> -->
    </nav>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'HamburgerNav',
  data() {
    return {
      open: false,
      openItem: 'schedule',
      // signedIn: false,
      navCategories: [
        'schedule',
        // 'recipe',
        // 'profile'
      ],
    };
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'user']),
  },
  methods: {
    ...mapActions(['logout']),
    itemOpen(itemName) {
      this.openItem = itemName;
    },
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
a {
  text-transform: capitalize;
  text-decoration: none;
  color: black;
}
.hamburger-nav-header {
  height: 100vh;
  overflow: hidden;
  justify-content: flex-start;
  align-items: center;
  padding: 4vh 2vw 0 2vw;
}
.secondary > * {
  margin-top: 4.5vh;
  list-style-type: none;
}
.selectedButton {
  box-shadow: -0.25rem 0 0 0 grey;
  /* background-color: grey; */
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
