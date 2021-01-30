<template>
  <article class="flex-container row login-main-article">
    <section class="flex-container column login-form-section">
      <h3>Login</h3>
      <div v-if="errors.length">
        <ul>
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </div>
      <form
        @submit.prevent="onSubmit"
        class="flex-container column login-input"
      >
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
    ...mapActions(['getUserByEmail', 'login', 'logout']),
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
        await this.getUserByEmail(this.email).then(async res => {
          console.log(res.data.users.length);
          if (res.data.users.length === 0) {
            this.errors.pop();
            this.errors.push('User does not exist');
          } else if (res.data.users.length === 1) {
            let { password } = res.data.users[0];
            if (bcrypt.compareSync(this.password, password)) {
              this.login(res.data.users[0]);
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
