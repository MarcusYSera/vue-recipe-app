<template>
  <form @submit.prevent="onSubmit">
    <input
      type="text"
      placeholder="Recipe Title"
      v-model="recipe.recipeTitle"
    />
    <input
      type="text"
      placeholder="Recipe Description"
      v-model="recipe.recipeDescription"
    />
    <input type="text" placeholder="Recipe Duration" />
    <input type="text" placeholder="Number of Steps" />
    <label>
      Private
      <input type="checkbox" v-model="recipe.share" />
    </label>
    <button @click="recipeStep('add')">+</button>
    <button @click="recipeStep('remove')">-</button>
    <input
      type="text"
      :placeholder="'Recipe Step ' + number"
      v-for="number in numberOfSteps"
      :key="'recipestep' + number"
    />
  </form>
  {{ recipe.recipeTitle }}
  {{ recipe.recipeDescription }}
</template>

<script>
export default {
  name: 'RecipeForm',
  data() {
    return {
      numberOfSteps: 0,
      recipe: {
        recipeTitle: '',
        recipeDescription: '',
        recipeSteps: [],
        share: false,
      },
    };
  },
  methods: {
    async onSubmit() {
      console.log();
    },
    recipeStep(sign) {
      sign == 'add'
        ? (this.numberOfSteps = 1 + this.numberOfSteps)
        : (this.numberOfSteps = 1 - this.numberOfSteps);
    },
  },
};
</script>

<style scoped></style>
