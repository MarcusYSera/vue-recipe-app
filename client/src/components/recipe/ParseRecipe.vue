<template>
  <div class="dropper">
    <input
      type="file"
      @change="readTextFromFile"
      accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf"
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
      if (file.type == 'application/pdf') {
        this.convertPdfToText(file);
      } else {
        this.convertDocToText(file);
      }
    },
    convertPdfToText(file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const arrayBuffer = new Uint8Array(reader.result);
        import('pdfjs-dist/webpack').then(pdfjs => {
          const pdf = pdfjs.getDocument(arrayBuffer);
          // console.log(pdf);
          pdf.promise.then(doc => {
            doc.getPage(1).then(page => {
              page.getTextContent().then(text => {
                const answer = text.items
                  .map(function(s) {
                    return s.str;
                  })
                  .join('');
                console.log(answer);
              });
            });
          });
        });
      };
      reader.readAsArrayBuffer(file);
    },
    convertDocToText(file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const arrayBuffer = reader.result;
        // convertToHtml({ arrayBuffer: arrayBuffer }).then(resultObj => {
        //   this.$emit('load', resultObj.value);
        //   console.log(resultObj.value);
        // });
        extractRawText({ arrayBuffer: arrayBuffer }).then(resultObj => {
          this.$emit('load', resultObj.value);
          // console.log(resultObj.value);
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
