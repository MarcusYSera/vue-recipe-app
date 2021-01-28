<template>
  <article>
    <section>
      <h3>Login</h3>
      <form>
        <input type="email" placeholder="Email" autocomplete="username" />
        <input
          type="password"
          placeholder="Password"
          autocomplete="current-password"
        />
        <input type="checkbox" value="keepSignedIn" />
        <button type="submit">Login</button>
      </form>
    </section>
    <section>
      <p>Need an Account?</p>
      <router-link :to="{ name: 'signup' }" tag="button">
        Create Account
      </router-link>
    </section>
    <nav>
      <p>
        Forgot your
        <!-- <router-link to="/passwordrecovery">password</router-link>? -->
      </p>
    </nav>
  </article>
</template>

<script>
export default {
  name: 'Login',
};
</script>

<style scoped></style>
