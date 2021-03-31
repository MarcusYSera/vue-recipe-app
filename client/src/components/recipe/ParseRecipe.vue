<template>
  <div class="dropper">
    <input
      type="file"
      @change="readTextFromFile"
      accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.pdf"
    />
    <div class="flex-container column">
      <span>Click or Drag files here!</span>
      <!-- <span>Word Documents or PDFs only</span> -->
    </div>
  </div>
</template>

<script>
import {
  // convertToHtml,
  extractRawText,
} from 'mammoth';

export default {
  name: 'ParseRecipe',
  // data() {
  //   return {
  //     show: true,
  //   };
  // },
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
      reader.onloadend = async () => {
        let promiseArr = [];
        const arrayBuffer = new Uint8Array(reader.result);
        const pdfjs = await import('pdfjs-dist/webpack');
        const pdf = await pdfjs.getDocument(arrayBuffer);
        const doc = await pdf.promise;
        const pageNum = doc._pdfInfo.numPages;
        for (let i = 1; i <= pageNum; i++) {
          const currentPage = await doc.getPage(i);
          const txt = await currentPage.getTextContent();
          const allText = txt.items
            .map(s => {
              return s.str;
            })
            .join('');
          promiseArr.push(allText);
        }
        const answer = await Promise.all(promiseArr);
        this.$emit('load', answer.join(''));
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
