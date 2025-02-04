import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useTicketInfoStore = defineStore('ticketInfo', () => {
  const name = ref('');
  const email = ref('');
  const imageFile = ref(null);
  const githubUsername = ref('');

  // Bulk Setters
  function setTicketData(selectedFile, fullName, emailAddress, formGithubUsername) {
    imageFile.value = selectedFile;
    name.value = fullName;
    email.value = emailAddress;
    githubUsername.value = formGithubUsername;
  }

  return { imageFile, name, email, githubUsername, setTicketData };
});
