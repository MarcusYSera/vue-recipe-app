<template>
  <article class="flex-container column todo-article">
    <section>
      <h3>Example of a Tasks</h3>
      <!-- <time>1:00 A.M.</time> -->
      <time hidden>1:00 A.M.</time>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae,
        facilis ab. Vero dolorum nihil, laborum, recusandae doloremque hic
        corporis at harum reprehenderit facilis cupiditate dolores amet.
        Possimus, repudiandae recusandae. Incidunt?
      </p>
    </section>
    <section>
      <h3>Example of a Tasks</h3>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae,
        facilis ab. Vero dolorum nihil, laborum, recusandae doloremque hic
        corporis at harum reprehenderit facilis cupiditate dolores amet.
        Possimus, repudiandae recusandae. Incidunt?
      </p>
    </section>
  </article>
</template>

<script>
export default {
  name: 'ToDo',
};
</script>

<style scoped>
.todo-article {
  grid-area: todo;
}
</style>
