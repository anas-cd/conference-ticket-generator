<template>
  <main>
    <header class="wl">
      <RouterLink to="/">
        <img src="@/assets/branding/logo-full.svg" alt="welcome to Coding Conf" />
      </RouterLink>
    </header>

    <section class="wl hero">
      <h1>Your Journey to Coding Conf 2025 Starts Here!</h1>
      <p>Secure your spot at next year's biggest coding conference.</p>
    </section>

    <section class="wl form">
      <form class="ticketInfo" @submit.prevent="">
        <!-- Avatar -->
        <FileUploadInput
          subscript="Upload your photo (JPG or PNG max size: 500KB)."
          v-model:fileSelected="avatar"
          :is-error="errors.avatar"
        ></FileUploadInput>

        <!-- Full Name  -->
        <TextInput
          :input-label="'full name'"
          :input-type="'text'"
          :error-msg="errors.fullname"
          v-model="fullName"
        ></TextInput>

        <!-- Email Address example@email.com  -->
        <TextInput
          :input-label="'email'"
          :input-type="'email'"
          :error-msg="errors.email"
          :placeholder="'example@email.com'"
          v-model="emailAddress"
        ></TextInput>

        <!-- GitHub Username @yourusername  -->
        <TextInput
          :input-label="'GitHub username'"
          :input-type="'text'"
          :error-msg="errors.githubUsername"
          :placeholder="'@yourusername'"
          v-model="githubUsername"
        ></TextInput>

        <!-- Generate My Ticket  -->
        <PrimaryButton @clicked="generateTicket"> generate my ticket </PrimaryButton>
      </form>
    </section>
    <FooterSection></FooterSection>
  </main>
</template>

<script setup>
import FooterSection from '@/components/FooterSection.vue';
import FileUploadInput from '@/components/microComponents/FileUploadInput.vue';
import PrimaryButton from '@/components/microComponents/PrimaryButton.vue';
import TextInput from '@/components/microComponents/TextInput.vue';
import { reactive, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useTicketInfoStore } from '@/stores/ticketInfo';

// store
const store = useTicketInfoStore();
// router
const router = useRouter();

const avatar = ref(null);
const fullName = ref(null);
const emailAddress = ref(null);
const githubUsername = ref(null);

const errors = reactive({
  avatar: false,
  fullname: '',
  email: '',
  githubUsername: '',
});

// Validation functions
function validateAvatar(file) {
  return file ? true : false;
}

function validateFullName(name) {
  return name && name.trim().length > 0;
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validateGithubUsername(username) {
  return username && username.trim().length > 0;
}

// Main function to generate ticket
async function generateTicket() {
  // Clear previous errors
  errors.avatar = false;
  errors.fullname = '';
  errors.email = '';
  errors.githubUsername = '';

  let valid = true;

  // Validate Avatar
  if (!validateAvatar(avatar.value)) {
    errors.avatar = true;
    valid = false;
  }

  // Validate Full Name
  if (!validateFullName(fullName.value)) {
    errors.fullname = 'Full name is required.';
    valid = false;
  }

  // Validate Email Address
  if (!validateEmail(emailAddress.value)) {
    errors.email = 'Please enter a valid email address.';
    valid = false;
  }

  // Validate GitHub Username
  if (!validateGithubUsername(githubUsername.value)) {
    errors.githubUsername = 'GitHub username is required.';
    valid = false;
  }

  // If any field is invalid, stop the process.
  if (!valid) {
    setTimeout(() => {
      // clear errors
      errors.avatar = false;
      errors.fullname = '';
      errors.email = '';
      errors.githubUsername = '';
    }, 5000);
    return;
  }

  // save data to Pinia store
  store.setTicketData(avatar.value, fullName.value, emailAddress.value, githubUsername.value);

  // rout to TicketView
  router.push({
    name: 'ticket',
    params: { tid: '#01609' },
  });
}
</script>

<style lang="scss">
main {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 2rem;
  padding-top: 3rem;

  header {
    display: flex;
    flex-flow: row;
    justify-content: center;
  }

  section.hero {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;

    h1 {
      margin-bottom: 0;
      text-align: center;
      font-size: 3rem;
      font-weight: 900;
      color: var(--neutral);

      @media #{$mq-480-down} {
        font-size: xx-large;
      }
    }
    p {
      text-align: center;
      font-size: larger;
      font-weight: 500;

      @media #{$mq-480-down} {
        font-size: large;
      }
    }
  }

  section.form {
    display: flex;
    flex-direction: row;
    justify-content: center;

    form.ticketInfo {
      display: flex;
      flex-flow: column nowrap;
      max-width: 27rem;
      width: 100%;

      .textInput {
        margin: 0.5rem 0;
      }

      .primaryButton {
        margin: 0.5rem 0;
        font-size: large;
      }
    }
  }
}
</style>
