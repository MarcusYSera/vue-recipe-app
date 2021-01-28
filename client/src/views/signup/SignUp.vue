<template>
  <article>
    <h3>Sign Up</h3>
    <form @submit.prevent="onSubmit">
      <input type="text" placeholder="First Name" v-model="firstName" />
      <input type="text" placeholder="Last Name" v-model="lastName" />
      <input
        type="email"
        placeholder="Email"
        autocomplete="username"
        v-model="email"
      />
      <input
        type="password"
        placeholder="Password"
        autocomplete="new-password"
        v-model="password"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        autocomplete="new-password"
        v-model="confirmPassword"
      />
      <button type="submit" value="Submit">Sign Up</button>
    </form>
    <nav>
      <p>
        Already have an account?
        <router-link :to="{ name: 'login' }">Login</router-link>
      </p>
    </nav>
  </article>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'SignUp',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  },
  computed: {
    ...mapGetters(['user']),
  },
  methods: {
    ...mapActions(['createUser']),
    async onSubmit() {
      let newUser = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
      };
      await this.createUser(newUser);
      console.log(this.user);
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.password = '';
      this.confirmPassword = '';
    },
  },
};
</script>

<style scoped></style>
