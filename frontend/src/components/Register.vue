<!-- eslint-disable vue/multi-word-component-names -->

<script lang="ts">

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
      fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password
        })
      }).then((res) => 
      {
        console.log("response.status =", res.status);
        if (res.status == 401) {
          alert("Username has been taken!")
        } else if (res.status == 200) {
          alert("Register success!")
        }
        return res.json()
    })
    }
    
  }
}
</script>

<template>
  <div>
    <h1>REGISTER</h1>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="username" />
      <br />
      <br />
      <input v-model="password" placeholder="password" type="password" />
      <br />
      <br />
      <button type="submit">Register</button>
    </form>
  </div>
</template>
