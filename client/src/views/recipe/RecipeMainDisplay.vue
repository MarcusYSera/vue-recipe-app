<template>
  <article>
    Recipe Main Page
    <RecipeForm v-if="showhere"></RecipeForm>
    <ParseRecipe @load="text = $event" v-if="show"></ParseRecipe>
    {{ text }}
  </article>
</template>

<script>
import ParseRecipe from '@/components/recipe/ParseRecipe.vue';
import RecipeForm from '@/components/recipe/RecipeForm.vue';

export default {
  name: 'RecipeMainDisplay',
  data() {
    return {
      text: '',
      show: true,
      showhere: false,
    };
  },
  components: { ParseRecipe, RecipeForm },
  methods: {},
};
</script>

<style scoped></style>
