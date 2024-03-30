<!-- eslint-disable vue/multi-word-component-names -->

<script lang="ts">
import { useIsLoggedInStore } from '../stores/isLoggedIn'
// import { defineConfig } from 'vite'

export default {
  data: () => {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login(e: any) {
      e.preventDefault()
      const store = useIsLoggedInStore()
      fetch(`${import.meta.env.VITE_API_SERVER}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password
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
      this.username = '';
      this.password = '';
      // console.log(store.isLoggedIn)
      // console.log(result)
    }
  }
}
</script>

<template>
  <div>
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
  </div>
</template>
