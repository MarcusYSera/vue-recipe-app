<template>
  <article>
    <section>
      <h3>Login</h3>
      <input type="text" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </section>
    <section>
      <router-link to="/signup" tag="button">Create Account</router-link>
    </section>
    <nav>
      <p></p>
    </nav>
  </article>
</template>

<script>
export default {
  name: 'Login',
};
</script>

<style scoped></style>
