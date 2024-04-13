<!-- eslint-disable vue/multi-word-component-names -->

<script lang="ts" setup>
import { useIsLoggedInStore } from '../stores/isLoggedIn'
import { ref } from 'vue'
import { FwbButton, FwbModal, FwbInput } from 'flowbite-vue'

const isShowModal = ref(false)
const username = ref('')
const password = ref('')

function closeModal() {
  isShowModal.value = false
}
function showModal() {
  isShowModal.value = true
}

function login(e: any) {
  console.log(username.value)
  console.log(password.value)
  e.preventDefault()
  const store = useIsLoggedInStore()
  fetch(`${import.meta.env.VITE_API_SERVER}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username.value,
      password: password.value
    })
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.isLoggedIn) {
        store.isLoggedIn = true
        store.username = res.username
        store.userID = res.userID
      } else {
        alert('Wrong credentials!')
        store.isLoggedIn = false
        store.username = ''
      }
    })
  username.value = ''
  password.value = ''
  closeModal()
  // console.log(store.isLoggedIn)
  // console.log(result)
}
</script>

<template>
  <!-- <div>
    <h1>LOGIN</h1>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="username" />
      <br />
      <br />
      <input v-model="password" placeholder="password" type="password" />
      <br />
      <br />
      <button type="submit">Login</button>
    </form>
  </div> -->
  <fwb-button @click="showModal"> Open modal </fwb-button>

  <fwb-modal v-if="isShowModal" @close="closeModal">
    <template #header>
      <div class="flex items-center text-lg">Login</div>
    </template>
    <template #body>
      <!-- <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        With less than a month to go before the European Union enacts new consumer privacy laws for
        its citizens, companies around the world are updating their terms of service agreements to
        comply.
      </p>
      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May
        25 and is meant to ensure a common set of data rights in the European Union. It requires
        organizations to notify users as soon as possible of high-risk data breaches that could
        personally affect them.
      </p> -->
      <fwb-input v-model="username" placeholder="enter your user name" label="User name" />
      <fwb-input v-model="password" placeholder="enter your password" label="Password" />
    </template>
    <template #footer>
      <div class="flex justify-between">
        <fwb-button @click="closeModal" color="alternative"> Cancel </fwb-button>
        <fwb-button @click="login" color="green"> Submit </fwb-button>
      </div>
    </template>
  </fwb-modal>
</template>
