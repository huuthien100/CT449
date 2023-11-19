<template>
  <div class="ct-subheadline mb-8">
    <div class="ct-subheadline-deco-line"></div>
    <div class="ct-subheadline-deco-label uppercase">{{ title }}</div>
    <div class="ct-subheadline-deco-line"></div>
  </div>
</template>

<script>
export default {
  props: ["title"],
  setup({ title }, context) {
    return {
      title,
    };
  },
};
</script>

<style></style>
