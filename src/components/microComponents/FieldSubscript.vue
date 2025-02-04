<template>
  <small :class="[isError ? 'filter-red' : '', 'fieldSubscript']">
    <img src="@/assets/images/icon-info.svg" alt="info" />
    <slot name="text"></slot>
  </small>
</template>

<script setup>
defineProps({
  isError: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<style lang="scss">
small.fieldSubscript {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin: 0.3rem 0;
  font-size: small;
  transition-duration: 0.2s;

  &.filter-red {
    filter: invert(16%) sepia(90%) saturate(7500%) hue-rotate(358deg) brightness(104%)
      contrast(101%);
  }

  img {
    margin-inline-end: 1rem;
  }
}
</style>
