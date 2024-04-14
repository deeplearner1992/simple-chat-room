<!-- eslint-disable vue/multi-word-component-names -->

<script lang="ts" setup>
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

function register(e: any) {
  e.preventDefault()
  fetch(`${import.meta.env.VITE_API_SERVER}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username.value,
      password: password.value
    })
  }).then((res) => {
    console.log('response.status =', res.status)
    if (res.status == 401) {
      alert('Username has been taken!')
    } else if (res.status == 200) {
      alert('Register success!')
    }
    return res.json()
  })
  username.value = ''
  password.value = ''
  closeModal()
}
</script>

<template>
  <fwb-button @click="showModal" color="yellow"> Register here </fwb-button>

  <fwb-modal v-if="isShowModal" @close="closeModal">
    <template #header>
      <div class="flex items-center text-lg">Register</div>
    </template>
    <template #body>
      <fwb-input v-model="username" placeholder="enter your user name" label="Username" />
      <fwb-input v-model="password" placeholder="enter your password" label="Password" type="password" />
    </template>
    <template #footer>
      <div class="flex justify-between">
        <fwb-button @click="closeModal" color="alternative"> Cancel </fwb-button>
        <fwb-button @click="register" color="green"> Submit </fwb-button>
      </div>
    </template>
  </fwb-modal>
</template>
