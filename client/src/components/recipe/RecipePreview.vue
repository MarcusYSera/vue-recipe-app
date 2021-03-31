<template>
  <article>
    {{ text }}
  </article>
</template>

<script>
export default {
  name: 'RecipePreview',
  props: ['text'],
  data() {
    return {
      rawRecipe: this.$props.text,
      recipeName: '',
      recipeCuisine: '',
      recipeCourse: '',
      recipeDuration: '',
      recipeDescription: '',
      recipeSteps: '',
    };
  },
  methods: {},
  mounted() {
    console.log(this.rawRecipe);
  },
};
</script>

<style scoped></style>
