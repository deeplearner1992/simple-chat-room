<script lang="ts" setup>
// import { RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import SocketioService from '../services/socketio.service.js'
import { useIsLoggedInStore } from '../stores/isLoggedIn'
import { ref } from 'vue'
import { onBeforeUnmount, onBeforeMount } from 'vue'
import { FwbHeading, FwbButton, FwbDropdown } from 'flowbite-vue'

const SENDER = {
  // id: '123',
  name: 'You',
  isYourMessage: true
}

const inputMessageText = ref('')
const messages = ref([] as any)
const userName = ref('')

function submitMessage() {
  const store = useIsLoggedInStore()
  const CHAT_ROOM = 'myRandomChatRoomId'
  const message = inputMessageText.value
  SocketioService.sendMessage(
    { message, roomName: CHAT_ROOM, name: store.username, userID: store.userID },
    (cb: any) => {
      console.log(cb)
      messages.value.push({
        message,
        ...SENDER
      })
      // clear the input after the message is sent
      inputMessageText.value = ''
      var objDiv = document.getElementById('dialog-box')
      objDiv!.scrollTop = objDiv!.scrollHeight
    }
  )
  // console.log(`Messages: ${this.messages}`)
}

function logout() {
  const store = useIsLoggedInStore()
  store.isLoggedIn = false
  store.username = ''
  SocketioService.disconnect()
}

onBeforeUnmount(() => {
  SocketioService.disconnect()
})

onBeforeMount(async () => {
  console.log('Testing testing')
  const store = useIsLoggedInStore()
  SocketioService.setupSocketConnection()
  SocketioService.subscribeToMessages((err: any, data: any) => {
    // console.log(data)
    messages.value.push(data)
  })
  const fetchedMessages = await SocketioService.fetchMessage()
  messages.value = fetchedMessages
  // console.log("Before: ", this.messages[0].name)
  messages.value.map((obj: any) => {
    if (obj.name == store.username) {
      // console.log(obj)
      obj.name = 'You'
      obj['isYourMessage'] = true
      return obj
    } else {
      obj['isYourMessage'] = false
    }
    return obj
  })
  userName.value = store.username
  console.log('After: ', messages.value)
})

function addSmile() {
  inputMessageText.value += '😀'
}

function addStone() {
  inputMessageText.value += '🗿'
}

function addCry() {
  inputMessageText.value += '😂'
}

function addMountain() {
  inputMessageText.value += '🗻'
}
</script>

<template>
  <header>
    <div class="container">
      <fwb-heading tag="h3" class="text-center mb-2">Hello! {{ userName }}</fwb-heading>
      <div class="justify-center">
        <fwb-button color="green" @click="logout">Logout</fwb-button>
      </div>
      <div class="box chat-container" id="dialog-box">
        <div class="messages message-container">
          <div v-for="message in messages" :key="message.id">
            <div class="message receiver-message" v-if="message.isYourMessage">
              {{ message.name }}: {{ message.message }}
            </div>
            <div class="message sender-message" v-else>
              {{ message.name }}: {{ message.message }}
            </div>
          </div>
        </div>
        <!-- <div class="messages"></div> -->
      </div>

      <div class="input-container">
        <div class="flex flex-row w-full">
          <form @submit.prevent="submitMessage" class="width-100">
            <input
              type="text"
              placeholder="Type in text"
              v-model="inputMessageText"
              class="width-80"
            />
            <fwb-button color="green" class="width-20">Send</fwb-button>
            <!-- <button type="submit" class="width-20">Submit</button> -->
          </form>
          <fwb-dropdown placement="top" text="Emojis" type="button" class="width-20">
            <p class="p-2">
              <fwb-button color="alternative" class="border-none" @click="addSmile" type="button"
                >😀</fwb-button
              >
              <fwb-button color="alternative" class="border-none" @click="addStone" type="button"
                >🗿</fwb-button
              >
              <fwb-button color="alternative" class="border-none" @click="addCry" type="button"
                >😂</fwb-button
              >
              <fwb-button color="alternative" class="border-none" @click="addMountain" type="button"
                >🗻</fwb-button
              >
            </p>
          </fwb-dropdown>
          <div></div>
        </div>
      </div>
    </div>
  </header>

  <!-- <RouterView /> -->
</template>

<style scoped>
/* header {
  line-height: 1.5;
  max-height: 100vh;
} */

/* .logo {
  display: block;
  margin: 0 auto 2rem;
} */

/* nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
} */

/* nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
} */

/* nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
} */

/* nav a:first-of-type {
  border: 0;
} */

/* .chatbox {
  overflow: auto;
}

.message-container {
  display: flex;
  flex-direction: column;
} */

/* .container {
  flex-direction: column;
} */
.chat-container {
  /* max-width: 600px; */
  width: 80%;
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
  width: 80%;
  margin: 50px auto;
  background-color: #fff;
  /* border-radius: 8px; */
  /* overflow-y: auto; */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
  flex-direction: column-reverse;
  display: flex;
  flex-grow: 1;
}

.message {
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  max-width: 40%;
  word-wrap: break-word;
  overflow-wrap: break-word;
  /* display: flex; */
  align-items: center;
  width: 780px;
}

.sender-message {
  background-color: #e0e0e0;
  color: #000;
  align-self: flex-start;
}

.receiver-message {
  background-color: #4caf50;
  color: #fff;
  align-self: flex-end;
  /* float: right; */
  margin-left: auto;
  margin-right: 0;
}

.width-80 {
  width: 79%;
  margin-right: 2px;
  border-radius: 15px;
  /* height: 50px; */
}

.width-100 {
  width: 100%;
  /* height: 50px; */
}

.width-20 {
  width: 20%;
}

.width-15 {
  width: 15%;
}

.justify-center {
  justify-content: center;
  text-align: center;
}

/* @media (min-width: 1024px) {
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
} */
</style>
