import { io } from 'socket.io-client'
import axios from 'axios'
// import { defineConfig } from 'vite'

class SocketioService {
  socket: any
  constructor() {}

  setupSocketConnection() {
    this.socket = io(`${import.meta.env.VITE_SOCKET_SERVER}`)
    // console.log('Test')

    this.socket.emit('my message', 'Hello there from Vue.')

    this.socket.on('my broadcast', (data: any) => {
      console.log(data)
    })

    this.socket.on('connect' , () => {
      console.log(this.socket.id);
    });
  }

  async fetchMessage() {
    const messages = (await axios(`${import.meta.env.VITE_API_SERVER}/messages`)).data.users
    // console.log('Message: ', messages)
    return messages
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
    }
  }

  subscribeToMessages(cb: any) {
    if (!this.socket) return true
    this.socket.on('message', (msg: any) => {
      console.log('Room event received!')
      return cb(null, msg)
    })
  }

  async sendMessage({ message, roomName, name, userID }: { message: any; roomName: any; name: any; userID: any }, cb: any) {
    if (this.socket) {
      this.socket.emit('message', { message, roomName, name, userID }, cb)
      await axios.post(`${import.meta.env.VITE_API_SERVER}/messages`, {
          message: message,
          user_id: userID
        })
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}

export default new SocketioService()
