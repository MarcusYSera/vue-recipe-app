<template>
  <article class="flex-container column signup-main-article">
    <section class="signup-main-section">
      <h3>Sign Up</h3>
      <div v-if="errors.length">
        <ul>
          <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
      </div>
      <form
        @submit.prevent="onSubmit"
        class="flex-container column signup-form"
      >
        <input type="text" placeholder="First Name" v-model="firstName" />
        <input type="text" placeholder="Last Name" v-model="lastName" />
        <input
          type="text"
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
    </section>
  </article>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import bcrypt from 'bcryptjs';
import router from '../../router';

export default {
  name: 'SignUp',
  data() {
    return {
      errors: [],
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
    ...mapActions(['createUser', 'getUserByEmail']),
    async onSubmit() {
      this.errors = [];
      if (!this.firstName || !this.lastName) {
        this.errors.push('First & Last Name Required');
      }
      if (!this.password) {
        this.errors.push('Password Required');
      } else if (this.password !== this.confirmPassword) {
        this.errors.push('Password Does Not Match');
      }
      if (
        !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          this.email
        )
      ) {
        this.errors.push('Invalid Email');
      } else {
        await this.getUserByEmail(this.email).then(async res => {
          if (res.data.users.length > 0) {
            this.errors.push('User Already Exists');
          } else {
            if (this.errors.length < 1) {
              await this.bcryptPassword(this.password);
              let newUser = {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                password: this.password,
              };
              await this.createUser(newUser);
              router.push('/schedule');
              this.firstName = '';
              this.lastName = '';
              this.email = '';
              this.password = '';
              this.confirmPassword = '';
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
.signup-main-article {
  height: 100%;
  width: 100%;
  justify-content: center;
  background: #ffffff;
  position: relative;
}
.signup-main-article:after {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  display: block;
  content: '';
  background-color: #00000013;
}
.signup-main-section {
  z-index: 1;
  background: #ffffff;
  text-align: center;
  width: 30%;
  /* padding: 1vh; */
  align-self: center;
}
.signup-main-section > * {
  margin: 1vh;
}
.signup-form > * {
  height: 4vh;
  margin: 1vh 4vw;
  border-style: solid;
  border-width: 1px;
  border-color: #d9d9d9;
}
.signup-form button {
  margin: 1vh 10vw;
}
</style>
