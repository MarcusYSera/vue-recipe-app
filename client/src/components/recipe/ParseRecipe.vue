<template>
  <div class="dropper">
    <input
      type="file"
      @change="readTextFromFile"
      accept=".csv,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf"
    />
    <span>Drag files here!</span>
  </div>
</template>

<script>
import {
  // convertToHtml,
  extractRawText,
} from 'mammoth';

export default {
  name: 'ParseRecipe',
  methods: {
    readTextFromFile(inputFiles) {
      const files = inputFiles.target.files || [];
      if (!files.length) return;
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const arrayBuffer = reader.result;
        // convertToHtml({ arrayBuffer: arrayBuffer }).then(resultObj => {
        //   this.$emit('load', resultObj.value);
        //   console.log(resultObj.value);
        // });
        extractRawText({ arrayBuffer: arrayBuffer }).then(resultObj => {
          this.$emit('load', resultObj.value);
          console.log(resultObj.value);
        });
      };
      reader.readAsArrayBuffer(file);
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
