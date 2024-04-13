<!-- eslint-disable vue/multi-word-component-names -->

<script lang="ts" setup>
import { useIsLoggedInStore } from '../stores/isLoggedIn'
import { ref } from 'vue'
import { FwbButton, FwbHeading, FwbInput } from 'flowbite-vue'
import Register from './Register.vue'

const username = ref('')
const password = ref('')

function register(e: any) {
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
  //   closeModal()
  // console.log(store.isLoggedIn)
  // console.log(result)
}
</script>

<template>
  <fwb-heading tag="h4" class="text-center">Login</fwb-heading>
  <fwb-input v-model="username" label="Username" placeholder="enter your username" size="lg" />
  <fwb-input v-model="password" label="Password" placeholder="enter your password" size="lg" />
  <div class="p-2 flex">
    <div class="flex justify-between w-full">
      <Register />
      <fwb-button @click="register" color="green"> Login </fwb-button>
    </div>
  </div>
</template>
