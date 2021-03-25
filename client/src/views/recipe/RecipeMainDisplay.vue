<template>
  <article>
    Recipe Main Page
    <ParseRecipe @load="text = $event"></ParseRecipe>
    {{ text }}
  </article>
</template>

<script>
import ParseRecipe from '@/components/recipe/ParseRecipe.vue';
export default {
  name: 'RecipeMainDisplay',
  data() {
    return {
      text: '',
    };
  },
  components: { ParseRecipe },
  methods: {},
};
</script>

<style scoped></style>
