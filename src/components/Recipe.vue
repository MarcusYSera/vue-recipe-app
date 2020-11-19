<template>
  <div>
    hello
    <iframe
      src="../assets/img/test.pdf"
      width="100%"
      loading="lazy"
      scrolling="no"
      allowtransparency="true"
      :height="iframeHeight"
      ref="chartiframe"
      id="datawrapper-chart-8dfPN"
    ></iframe>
    <!-- <pdf src="@/assets/img/test.pdf"></pdf> -->
  </div>
</template>

<script>
// import pdf from 'vue-pdf';
const DELTAS = {
  '100': 481,
  '200': 427,
  '300': 400,
  '400': 400,
  '500': 400,
  '700': 400,
  '800': 400,
  '900': 400,
  '1000': 400,
};
export default {
  name: 'Recipe',
  data() {
    return {
      iframeHeight: '0px',
    };
  },
  computed: {
    // Necessary for initial iframe height
    iframeOffsetWidth() {
      return this.$refs['chartiframe'].offsetWidth;
    },
  },
  mounted() {
    // set initial iframe height
    this.iframeHeight = `${
      DELTAS[
        Math.min(
          1e3,
          Math.max(100 * Math.floor(this.iframeOffsetWidth / 100), 100)
        )
      ]
    }px`;
    // setup event listener
    window.addEventListener('message', this.handleIframeResize);
  },
  beforeUnmount() {
    // destroy event listener
    window.removeEventListener('message', this.handleIframeResize);
  },
  methods: {
    handleIframeResize(e) {
      for (var b in e.data['datawrapper-height']) {
        if ('8dfPN' === b) {
          this.iframeHeight = `${e.data['datawrapper-height'][b]}px`;
        }
      }
    },
  },
  // components: { pdf },
};
</script>

<style scoped>
iframe {
  border: 0;
}
</style>
