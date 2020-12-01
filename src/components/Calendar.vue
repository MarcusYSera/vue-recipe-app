<template>
  <article class="calendar-article">
    <section>calendar</section>
  </article>
</template>

<script>
export default {
  name: 'Calendar',
};
</script>

<style scoped>
.calendar-article {
  flex: initial;
}
.calendar {
  grid-area: calendarview;
}
</style>
