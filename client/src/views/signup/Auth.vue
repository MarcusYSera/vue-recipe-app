<template>
  <div>Please wait....</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Auth',
  methods: mapActions(['refreshToken']),
  created() {
    console.log('created');
    this.refreshToken();
  },
};
</script>

<style scoped></style>
