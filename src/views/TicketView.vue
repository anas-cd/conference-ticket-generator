<template>
  <main class="mainClass ticketView">
    <header class="wl">
      <RouterLink to="/">
        <img src="@/assets/branding/logo-full.svg" alt="welcome to Coding Conf" />
      </RouterLink>
    </header>

    <section class="wl hero">
      <h1>
        Congrats, <span class="gradient"> {{ stor.name }}</span
        >! <br />
        Your ticket is ready.
      </h1>
      <p>
        We've emailed your ticket to <span class="email">{{ stor.email }}</span> and will send
        updates in the run up to the event.
      </p>
    </section>

    <!--   Coding Conf Jan 31, 2025 / Austin, TX -->
    <section class="wl ticket">
      <div class="ticketInfo">
        <div class="confInfo">
          <img src="@/assets/branding/logo-full.svg" alt="Coding Conf Logo" />
          <p><time datetime="jan 31, 2025">jan 31, 2025</time> / Austin, TX</p>
        </div>
        <div class="person">
          <img :src="imageSrc" alt="avatar" />
          <div class="personalInfo">
            <p class="name">{{ stor.name }}</p>
            <div class="github">
              <img src="@/assets/images/icon-github.svg" alt="github" />
              <p>@{{ stor.githubUsername }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="ticketNumber">
        <p>{{ $route.params.tid }}</p>
      </div>
    </section>
  </main>
</template>

<script setup>
import { useTicketInfoStore } from '@/stores/ticketInfo';
import { ref } from 'vue';

const stor = useTicketInfoStore();

const imageSrc = ref(null);
imageSrc.value = URL.createObjectURL(stor.imageFile);
</script>

<style lang="scss">
.ticketView {
  align-items: center;

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

      .gradient {
        background: var(--gradient);
        background-clip: text;
        color: transparent;
        font-size: inherit;
        font-weight: inherit;
        text-transform: capitalize;
      }
      @media #{$mq-480-down} {
        font-size: xx-large;
      }
    }
    p {
      text-align: center;
      font-size: larger;
      font-weight: 500;
      max-width: 28rem;
      width: 100%;

      .email {
        color: var(--orange-500);
      }
      @media #{$mq-480-down} {
        font-size: large;
      }
    }
  }

  section.ticket {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    background: url('@/assets/images/pattern-ticket.svg');
    background-repeat: no-repeat;
    background-size: contain;
    max-width: 38rem;
    width: 100%;
    margin: 2rem;
    padding: 2rem;
    padding-right: 1rem;
    padding-bottom: 2.5rem;
    aspect-ratio: 2 / 1;

    @media #{$mq-480-down} {
      padding: 1rem;
      padding-right: 0;
    }

    .ticketInfo {
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-between;

      .confInfo {
        img {
          max-width: 20rem;
          width: 100%;
        }

        p {
          margin-inline-start: 4.5rem;
          margin-top: 0.4rem;

          @media #{$mq-480-down} {
            margin: 0;
            margin-inline-start: 3rem;
            font-size: x-small;
          }
        }
      }

      .person {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;

        @media #{$mq-480-down} {
          margin: 0;
        }
        img {
          width: 4rem;
          border-radius: 12px;

          @media #{$mq-480-down} {
            width: 2.5rem;
            border-radius: 7px;
          }
        }
        .personalInfo {
          display: flex;
          flex-flow: column;
          margin-inline-start: 1rem;

          .name {
            margin: 0;
            text-transform: capitalize;
            font-size: xx-large;
            font-weight: 500;
            color: var(--neutral);

            @media #{$mq-768-down} {
              font-size: x-large;
            }
            @media #{$mq-480-down} {
              font-size: medium;
            }
          }

          .github {
            display: flex;
            flex-flow: row nowrap;
            align-items: center;

            img {
              width: 1.5rem;
              margin-inline-end: 0.5rem;
            }

            p {
              margin: 0;
            }
          }
        }
      }
    }

    .ticketNumber {
      display: flex;
      flex-direction: row;
      align-items: center;

      p {
        transform: rotate(90deg);
        font-size: xx-large;
        margin: 0;
      }
    }
  }
}
</style>
