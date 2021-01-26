<template>
  <article>
    <h3>Sign Up</h3>
    <form>
      <input type="text" placeholder="First Name" />
      <input type="text" placeholder="Last Name" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <input type="password" placeholder="Confirm Password" />
      <button type="submit">Sign Up</button>
    </form>
    <nav>
      <p>
        Already have an account?
        <router-link to="/login">Login</router-link>
      </p>
    </nav>
  </article>
</template>

<script>
export default {
  name: 'SignUp',
};
</script>

<style scoped></style>
