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
      recipeYield: '',
      recipeDuration: '',
      recipeDescription: '',
      recipeMisEnPlace: '',
      recipeSteps: '',
    };
  },
  methods: {},
  mounted() {
    console.log(this.rawRecipe);
    console.log(typeof this.rawRecipe);
    const indexOfFirst = this.rawRecipe.indexOf('Yield');
    console.log(indexOfFirst);
  },
};
</script>

<style scoped></style>
