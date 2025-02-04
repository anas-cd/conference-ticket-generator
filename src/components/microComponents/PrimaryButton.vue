<template>
  <button
    type="button"
    @click="$emit('clicked')"
    @keydown.enter.prevent="$emit('clicked')"
    class="primaryButton"
  >
    <slot>button</slot>
  </button>
</template>

<script setup>
defineEmits(['clicked']);
</script>

<style lang="scss" scoped>
.primaryButton {
  padding: 0.8rem;
  background-color: var(--orange-500);
  border: none;
  border-radius: 10px;
  font-weight: 700;
  text-transform: capitalize;
  transition-duration: 0.1s;
  border-bottom: 5px solid transparent;

  &:hover {
    cursor: pointer;
    background-color: var(--orange-700);
    border-bottom: 5px solid var(--orange-500);
  }
  &:active {
    transform: translateY(2px);
  }
}
</style>
