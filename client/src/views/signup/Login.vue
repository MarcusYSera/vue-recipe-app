<template>
  <article>
    <section>
      <h3>Login</h3>
      <div v-if="errors.length">
        <ul>
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </div>
      <form @submit.prevent="onSubmit">
        <input
          type="text"
          placeholder="Email"
          v-model="email"
          autocomplete="username"
        />
        <input
          type="password"
          placeholder="Password"
          autocomplete="current-password"
          v-model="password"
        />
        <!-- need to wait for json token for this -->
        <!-- <input type="checkbox" value="keepSignedIn" /> -->
        <button type="submit" value="Submit">Login</button>
      </form>
    </section>
    <section>
      <p>Need an Account?</p>
      <router-link :to="{ name: 'signup' }" tag="button">
        Create Account
      </router-link>
    </section>
    <!-- <nav> -->
    <!-- <p> -->
    <!-- Forgot your -->
    <!-- <router-link to="/passwordrecovery">password</router-link>? -->
    <!-- </p> -->
    <!-- </nav> -->
  </article>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import bcrypt from 'bcryptjs';
import router from '../../router';

export default {
  name: 'Login',
  data() {
    return {
      errors: [],
      email: '',
      password: '',
    };
  },
  computed: {
    ...mapGetters(['user', 'loggedIn']),
  },
  methods: {
    ...mapActions(['getUserByEmail', 'logout']),
    async onSubmit() {
      this.errors = [];
      if (!this.password) {
        this.errors.push('Password Required');
      }
      if (
        !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          this.email
        )
      ) {
        this.errors.push('Invalid Email');
      } else {
        await this.getUserByEmail(this.email, 'login').then(async res => {
          console.log(res.data.users.length);
          if (res.data.users.length === 0) {
            this.errors.pop();
            this.errors.push('User does not exist');
          } else if (res.data.users.length === 1) {
            let { password } = res.data.users[0];
            if (bcrypt.compareSync(this.password, password)) {
              router.push('/schedule');
              this.email = '';
              this.password = '';
            } else {
              if (this.password) {
                this.errors.push('Incorrect Password');
              }
              this.logout;
            }
          }
        });
      }
    },
    bcryptPassword(password) {
      return new Promise(resolve => {
        this.password = bcrypt.hashSync(password, 10);
        resolve();
      });
    },
  },
};
</script>

<style scoped></style>
