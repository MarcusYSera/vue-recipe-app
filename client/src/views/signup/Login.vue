<template>
  <article class="flex-container row login-main-article">
    <section class="flex-container column login-form-section">
      <h3>Login</h3>
      <div v-if="errors.length">
        <ul>
          <li v-for="(error, index) in errors" :key="`login-${index}`">
            {{ error }}
          </li>
        </ul>
      </div>
      <form
        @submit.prevent="onSubmit"
        class="flex-container column login-input"
      >
        <input
          type="text"
          placeholder="Email"
          v-model="user.email"
          autocomplete="username"
        />
        <input
          type="password"
          placeholder="Password"
          autocomplete="current-password"
          v-model="user.password"
        />
        <!-- need to wait for json token for this -->
        <!-- <input type="checkbox" value="keepSignedIn" /> -->
        <button type="submit" value="Submit">Login</button>
      </form>
    </section>
    <section class="login-bottom-section">
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
import {
  mapActions,
  // mapGetters
} from 'vuex';
import router from '../../router';

export default {
  name: 'Login',
  data() {
    return {
      errors: [],
      user: { email: '', password: '' },
    };
  },
  computed: {
    // ...mapGetters(['user', 'loggedIn']),
  },
  methods: {
    ...mapActions(['getUserByEmail', 'login', 'logout']),
    async onSubmit() {
      this.errors = [];
      if (!this.user.email) {
        this.errors.push('Email Required');
      }
      if (!this.user.password) {
        this.errors.push('Password Required');
        return;
      }
      if (
        !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          this.user.email
        )
      ) {
        this.errors.push('Invalid Email');
        return;
      }
      console.log(this.user.email);
      let response = await this.getUserByEmail(this.user.email);
      let user = response.data.users;
      if (user.length === 0) {
        this.errors.pop();
        this.errors.push('User does not exist');
        return;
      }
      try {
        console.log('login');
        await this.login(this.user); // response should be a jwt
        router.push('/schedule');
      } catch (error) {
        this.errors.push('Incorrect Password'); // verifying password on the backend
        return;
      }
    },
  },
};
</script>

<style scoped>
.login-main-article {
  height: 100%;
  width: 100%;
  justify-content: center;
  background: #ffffff;
  position: relative;
}
.login-main-article:after {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  display: block;
  content: '';
  background-color: #00000013;
}
.login-form-section,
.login-bottom-section {
  z-index: 1;
  background: #ffffff;
  text-align: center;
  height: 30%;
  width: 30%;
  padding: 1vh;
}
.login-main-article > *,
.login-bottom-section > * {
  align-self: center;
}
/* .login-input {
} */
.login-bottom-section {
  border-left: 1px solid #d9d9d9;
}
.login-input > * {
  height: 4vh;
  border-style: solid;
  border-width: 1px;
  border-color: #d9d9d9;
  margin: 1vh 4vw;
}
.login-input button {
  margin: 1vh 10vw;
}
</style>
