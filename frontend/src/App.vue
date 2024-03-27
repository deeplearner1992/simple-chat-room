<script lang="ts">
// import { RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import SocketioService from './services/socketio.service.js'

const SENDER = {
  id: '123',
  name: 'John Doe'
}

// const messages: any[] = []

// SocketioService.setupSocketConnection()
// SocketioService.subscribeToMessages()
// SocketioService.subscribeToMessages((err: any, data: any) => {
//   console.log(data)
//   this.messages.push(data)
// })

export default {
  name: 'App',
  components: {},
  data() {
    return {
      // token: '',
      inputMessageText: '',
      messages: [] as any[],
      userName: ''
    }
  },
  methods: {
    //   submitToken() {
    //     // console.log(this.token)
    //     SocketioService.setupSocketConnection()
    //   }
    // },

    submitMessage() {
      const CHAT_ROOM = 'myRandomChatRoomId'
      const message = this.inputMessageText
      SocketioService.sendMessage({ message, roomName: CHAT_ROOM }, (cb: any) => {
        console.log(cb)
        this.messages.push({
          message,
          ...SENDER
        })
        // clear the input after the message is sent
        this.inputMessageText = ''
      })
      console.log(`Messages: ${this.messages}`)
    },

    beforeUnmount() {
      SocketioService.disconnect()
    }
  },
  async beforeMount() {
    console.log('Testing testing')
    SocketioService.setupSocketConnection()
    SocketioService.subscribeToMessages((err: any, data: any) => {
      console.log(data)
      this.messages.push(data)
    })
    const fetchedMessages = await SocketioService.fetchMessage()
    this.messages = fetchedMessages
  }
}
</script>

<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div> -->
    <!-- <form @submit.prevent="submitToken">
      <input type="text" placeholder="Enter token" />
      <button type="submit">Submit</button>
    </form> -->
    <!-- <form @submit.prevent="start">
      <input type="text" placeholder="Enter token" />
      <button type="submit">Submit</button>
    </form> -->
    <!-- <div class="box">
      <div class="messages"></div>
      <form class="input-div" @submit.prevent="submitMessage">
        <input type="text" placeholder="Type in text" v-model="inputMessageText" />
        <button type="submit">Submit</button>
      </form>
    </div> -->

    <div class="box">
      <div class="messages">
        <div v-for="user in messages" :key="user.id">{{ user.name }}: {{ user.message }}</div>
      </div>
      <div class="messages"></div>
      <form class="input-div" @submit.prevent="submitMessage">
        <input type="text" placeholder="Type in text" v-model="inputMessageText" />
        <button type="submit">Submit</button>
      </form>
    </div>
  </header>

  <!-- <RouterView /> -->
</template>

<style scoped>
header {
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
</style>
