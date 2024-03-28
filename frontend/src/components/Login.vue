<!-- eslint-disable vue/multi-word-component-names -->
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
<script lang="ts">
import { useIsLoggedInStore } from '../stores/isLoggedIn'

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
      const store = useIsLoggedInStore();
      fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password
        })
      }).then(res => res.json())
      .then((res) => {
        if (res.isLoggedIn) {
          store.isLoggedIn = true;
          store.username = this.username;
        } else {
          store.isLoggedIn = false;
          store.username = '';
        }
        console.log(res)
      })

      // console.log(store.isLoggedIn)
      // console.log(result)
    }
    
  }
}
</script>
