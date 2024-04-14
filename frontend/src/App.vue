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
  <fwb-heading tag="h2" class="text-center mb-5" v-if="!store.isLoggedIn">🗣️ WELCOME TO CHAT CHAT 💬</fwb-heading>
  <header class="container justify-center center">
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
</style>
