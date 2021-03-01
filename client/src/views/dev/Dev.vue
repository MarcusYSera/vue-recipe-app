<template>
  <article class="dev-area">
    Development Page
    <ButtonDurationTimer></ButtonDurationTimer>
    <SelectDurationTimer></SelectDurationTimer>
  </article>
</template>

<script>
import ButtonDurationTimer from '@/components/dev/ButtonDurationTimer';
import SelectDurationTimer from '@/components/dev/SelectDurationTimer';

export default {
  name: 'Dev',
  components: { ButtonDurationTimer, SelectDurationTimer },
};
</script>

<style scoped>
.dev-area {
  grid-area: mainContent;
}
</style>
