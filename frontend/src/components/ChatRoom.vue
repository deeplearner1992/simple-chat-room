<script lang="ts">
// import { RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import SocketioService from '../services/socketio.service.js'
import { useIsLoggedInStore } from '../stores/isLoggedIn'

const SENDER = {
  // id: '123',
  name: 'You'
}

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
    submitMessage() {
      const store = useIsLoggedInStore()
      const CHAT_ROOM = 'myRandomChatRoomId'
      const message = this.inputMessageText
      SocketioService.sendMessage(
        { message, roomName: CHAT_ROOM, name: store.username, userID: store.userID },
        (cb: any) => {
          console.log(cb)
          this.messages.push({
            message,
            ...SENDER
          })
          // clear the input after the message is sent
          this.inputMessageText = ''
          var objDiv = document.getElementById('dialog-box')
          objDiv!.scrollTop = objDiv!.scrollHeight
        }
      )
      console.log(`Messages: ${this.messages}`)
    },

    logout() {
      const store = useIsLoggedInStore()
      store.isLoggedIn = false
      store.username = ''
      SocketioService.disconnect()
    },

    beforeUnmount() {
      SocketioService.disconnect()
    }
  },
  async beforeMount() {
    console.log('Testing testing')
    const store = useIsLoggedInStore()
    SocketioService.setupSocketConnection()
    SocketioService.subscribeToMessages((err: any, data: any) => {
      console.log(data)
      this.messages.push(data)
    })
    const fetchedMessages = await SocketioService.fetchMessage()
    this.messages = fetchedMessages
    // console.log("Before: ", this.messages[0].name)
    this.messages.map((obj: any) => {
      if (obj.name == store.username) {
        // console.log(obj)
        obj.name = 'You'
        return obj
      }
      return obj
    })
    this.userName = store.username
    // console.log("After: ", this.messages)
  }
}
</script>

<template>
  <header>
    <div class="container">
      <h1 class="justify-center">Hello! {{ userName }}</h1>
      <div class="justify-center">
        <button @click="logout">Logout</button>
      </div>
      <div class="box chat-container" id="dialog-box">
        <div class="messages message-container">
          <div class="message" v-for="user in messages" :key="user.id">
            {{ user.name }}: {{ user.message }}
          </div>
        </div>
        <!-- <div class="messages"></div> -->
      </div>
      <div class="input-container justify-center">
        <form class="input-div" @submit.prevent="submitMessage">
          <input
            class="width-80"
            type="text"
            placeholder="Type in text"
            v-model="inputMessageText"
          />
          <button class="width-20" type="submit">Submit</button>
        </form>
      </div>
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

.chatbox {
  overflow: auto;
}

.message-container {
  display: flex;
  flex-direction: column;
}

.container {
  flex-direction: column;
}
.chat-container {
  /* max-width: 600px; */
  width: 500px;
  margin: 50px auto;
  background-color: #fff;
  border-radius: 8px;
  overflow-y: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
  flex-direction: column-reverse;
}

.input-container {
  /* max-width: 600px; */
  width: 500px;
  margin: 50px auto;
  background-color: #fff;
  /* border-radius: 8px; */
  overflow-y: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
  flex-direction: column-reverse;
}


.message {
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  max-width: 90%;
  word-wrap: break-word;
  overflow-wrap: break-word;
  /* display: flex; */
  align-items: center;
  width: 780px;
}

.width-80 {
  width: 80%;
  height: 50px;
}

.width-20 {
  width: 20%;
}

.justify-center {
  justify-content: center;
  text-align: center;
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

  .justify-center {
    justify-content: center;
    text-align: center;
  }
}
</style>
