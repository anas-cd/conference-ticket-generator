<template>
  <fieldset
    class="fileUploadInput"
    @click="browseFile"
    @keydown.enter.prevent="browseFile"
    @keydown.space.prevent="browseFile"
    @dragover.prevent
    @drop.prevent="handleFileDrop"
    tabindex="0"
  >
    <!-- Show default icon if no file is selected, otherwise show preview -->
    <img v-if="!fileSelected" src="@/assets/images/icon-upload.svg" alt="Upload file icon" />
    <img v-else :src="imageSrc" alt="Avatar preview" class="selected" />
    <legend>Upload Avatar</legend>
    <!-- Hidden label for accessibility -->
    <label for="fileUpload" class="hidden">Drag and drop or click to upload</label>
    <p class="label">Drag and drop or click to upload</p>
    <input
      ref="inputField"
      type="file"
      name="fileUpload"
      id="fileUpload"
      accept="image/jpeg, image/png"
      @change="handleFileChange"
      class="hidden"
    />
    <div class="editButtons" v-if="fileSelected">
      <button type="button" @click.stop.prevent="remove">Remove Image</button>
      <button type="button" @click.stop.prevent="browseFile">Change Image</button>
    </div>
    <FieldSubscript v-if="subscript" :is-error="subscriptError || isError">
      <template #text>
        {{ subscript }}
      </template>
    </FieldSubscript>
  </fieldset>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue';
import FieldSubscript from './FieldSubscript.vue';

// Define props and emit events with the v-model syntax
const props = defineProps({
  subscript: {
    type: String,
    required: false,
  },
  // Using v-model, the parent passes the file as an object.
  fileSelected: {
    type: Object,
    required: false,
  },
  isError: {
    type: Boolean,
    required: false,
    default: false,
  },
});
const emit = defineEmits(['update:fileSelected']);

// Refs for internal state
const inputField = ref(null);
const subscriptError = ref(false);
const imageSrc = ref(null);

// Watch the fileSelected prop for parent updates.
watch(
  () => props.fileSelected,
  (newFile) => {
    if (newFile) {
      // Clean up previous object URL
      if (imageSrc.value) {
        URL.revokeObjectURL(imageSrc.value);
      }
      imageSrc.value = URL.createObjectURL(newFile);
    } else {
      imageSrc.value = null;
    }
  },
);

// Emits new file and creates an object URL for preview
function updateFileSelected(file) {
  // Update v-model
  emit('update:fileSelected', file);
  // Clean up previous URL
  if (imageSrc.value) {
    URL.revokeObjectURL(imageSrc.value);
  }
  imageSrc.value = URL.createObjectURL(file);
}

// Programmatically open file input
function browseFile() {
  inputField.value && inputField.value.click();
}

// Handle file input change
function handleFileChange(event) {
  const file = event.target.files && event.target.files[0];
  if (file) {
    // Validate the file before updating
    if (validate(file)) {
      updateFileSelected(file);
    } else {
      notifyError();
    }
  }
}

// Handle file drop events
function handleFileDrop(event) {
  const file = event.dataTransfer.files && event.dataTransfer.files[0];
  if (file) {
    if (validate(file)) {
      updateFileSelected(file);
    } else {
      notifyError();
    }
  }
}

// Validate file size and type (JPG or PNG, max size: 500KB)
function validate(file) {
  if (file && file.size < 500000 && (file.type === 'image/jpeg' || file.type === 'image/png')) {
    return true;
  }
  return false;
}

// Highlight requirements for 5 seconds
function notifyError() {
  subscriptError.value = true;
  setTimeout(() => {
    subscriptError.value = false;
  }, 5000);
}

// Remove the selected file and clean up the preview
function remove() {
  // Emit null to clear the parent's fileSelected value
  emit('update:fileSelected', null);
  if (imageSrc.value) {
    URL.revokeObjectURL(imageSrc.value);
  }
  imageSrc.value = null;
}

// Cleanup when the component is unmounted
onUnmounted(() => {
  if (imageSrc.value) {
    URL.revokeObjectURL(imageSrc.value);
  }
});
</script>

<style lang="scss">
.fileUploadInput {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;
  padding: 1rem 0;
  background-color: var(--neutral-25);
  border: 2px dashed var(--neutral-40);
  border-radius: 10px;
  transition: background-color 0.2s;

  &:hover,
  &:focus {
    cursor: pointer;
    background-color: var(--neutral-30);
  }

  &:active {
    background-color: var(--neutral-10);
  }

  & > * {
    margin: 0.5rem 0;
  }

  & > img {
    background-color: var(--neutral-10);
    padding: 0.5rem;
    border-radius: 12px;
    border: 1px solid var(--neutral-25);
    width: 4rem;

    &.selected {
      padding: 0;
    }
  }

  legend {
    position: absolute;
    left: 0;
    top: -2.2rem;
    color: var(--neutral);
    font-size: large;
  }

  .label {
    font-weight: 500;
    font-size: large;
  }

  .editButtons {
    display: flex;
    justify-content: space-around;
    width: 60%;

    & > button {
      border: 1px solid var(--neutral-40);
      background-color: var(--neutral-25);
      color: var(--neutral);
      padding: 0.3rem 1rem;
      border-radius: 4px;
      font-size: small;

      &:hover,
      &:focus {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }

  .fieldSubscript {
    position: absolute;
    bottom: -2rem;
    left: 0;

    @media #{$mq-480-down} {
      bottom: -2.6rem;
    }
  }

  .hidden {
    /* A visually hidden technique that maintains accessibility */
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    border: 0;
    padding: 0;
    clip: rect(0, 0, 0, 0);
    overflow: hidden;
    white-space: nowrap;
    // -- accessibility not maintained with the next property --
    visibility: hidden;
  }
}
</style>
