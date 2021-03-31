<template>
  <article>
    Recipe Main Page
    <RecipeForm v-if="showhere"></RecipeForm>
    <ParseRecipe @load="recipeUpload" v-if="show"></ParseRecipe>
    <!-- <ParseRecipe @load="text = $event" v-if="show"></ParseRecipe> -->
    <RecipePreview :text="text" v-if="!show"></RecipePreview>
    <!-- {{ text }} -->
  </article>
</template>

<script>
import ParseRecipe from '@/components/recipe/ParseRecipe.vue';
import RecipeForm from '@/components/recipe/RecipeForm.vue';
import RecipePreview from '@/components/recipe/RecipePreview.vue';

export default {
  name: 'RecipeMainDisplay',
  data() {
    return {
      text: '',
      show: true,
      showhere: false,
    };
  },
  components: { ParseRecipe, RecipeForm, RecipePreview },
  computed: {},
  methods: {
    recipeUpload(fileText) {
      this.text = fileText;
      this.show = false;
    },
  },
  mounted() {
    this.text !== '' ? (this.show = false) : (this.show = true);
  },
};
</script>

<style scoped></style>
