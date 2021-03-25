<template>
  <div class="dropper">
    <input
      type="file"
      multiple
      @change="readTextFromFile"
      accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf"
    />
    <span>Drag files here!</span>
  </div>
</template>

<script>
export default {
  name: 'ParseRecipe',
  methods: {
    readTextFromFile(ev) {
      const file = ev.target.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        this.$emit('load', e.target.result);
        console.log(e.target);
      };
      reader.readAsText(file, 'UTF-8');
    },
  },
};
</script>

<style scoped>
.dropper {
  height: 30vh;
  border: 2px dashed black;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.dropper:hover {
  background-color: #eee;
}
input {
  width: 100%;
  height: 30vh;
  position: absolute;
  opacity: 0;
}
</style>
