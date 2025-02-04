<template>
  <label for="inputfield" class="textInput">
    {{ inputLabel }}
    <input
      :type="inputType"
      name="inputfield"
      id="inputfield"
      :placeholder="placeholder"
      v-model="inputValue"
    />
    <FieldSubscript v-if="errorMsg ? true : false" :is-error="true">
      <template #text>
        {{ errorMsg }}
      </template>
    </FieldSubscript>
  </label>
</template>

<script setup>
import FieldSubscript from './FieldSubscript.vue';

defineProps({
  inputType: {
    type: String,
    required: false,
    default: 'text',
  },
  inputLabel: {
    type: String,
    required: true,
    default: 'input label',
  },
  placeholder: {
    type: String,
    required: false,
  },
  errorMsg: {
    type: [String, null],
    required: false,
  },
});

const inputValue = defineModel();
</script>

<style lang="scss" scoped>
.textInput {
  display: flex;
  flex-flow: column nowrap;
  font-size: large;
  color: var(--neutral);
  text-transform: capitalize;

  input {
    background-color: var(--neutral-25);
    border: 1px solid var(--neutral-30);
    border-radius: 8px;
    margin-bottom: 0.2rem;
    padding: 0.5rem 1rem;
    color: var(--neutral);
    transition-duration: 0.2s;

    &::placeholder {
      color: var(--neutral-300);
    }

    &.error {
      border: 1px solid var(--orange-700);
    }

    &:hover,
    &:focus {
      background-color: var(--neutral-30);
    }
  }

  .fieldSubscript {
    color: var(--neutral-300);
    margin-bottom: 0.2rem;
  }
}
</style>
