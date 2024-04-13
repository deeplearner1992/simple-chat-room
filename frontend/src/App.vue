<script setup lang="ts">
import { RouterView } from 'vue-router'
import { FwbHeading } from 'flowbite-vue'
import { useIsLoggedInStore } from './stores/isLoggedIn'
import ChatRoomView from './views/ChatRoomView.vue'
import LoginView from './views/LoginView.vue'

console.log('PROCESS: ', import.meta.env.VITE_API_SERVER)
const store = useIsLoggedInStore()
</script>

<template>
  <fwb-heading tag="h2" class="text-center mb-5" v-if="!store.isLoggedIn">&#128513; WELCOME TO CHAT CHAT &#128540;</fwb-heading>
  <header class="container justify-center center">
    <!-- <div>
      <h1 v-if="!store.isLoggedIn">WELCOME TO CHAT CHAT</h1>
    </div> -->
    <div>
      <LoginView v-if="!store.isLoggedIn"></LoginView>
      <ChatRoomView v-else></ChatRoomView>
    </div>
  </header>

  <!-- <RouterView /> -->
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}

.justify-center {
  justify-content: center;
  width: 500px;
}

.center {
  border: 5px solid;
  margin: auto;
  width: 50%;
  padding: 10px;
  border-radius: 25px;
}

/* header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.container {
  display: flex;
  flex-direction: column;
}


.justify-center {
  justify-content: center;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
  
}

@media (max-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
  
} */
</style>
