import { io } from 'socket.io-client'
import axios from 'axios'

class SocketioService {
  socket: any
  constructor() {}

  setupSocketConnection() {
    this.socket = io('http://localhost:8080')
    console.log('Test')

    this.socket.emit('my message', 'Hello there from Vue.')

    this.socket.on('my broadcast', (data: any) => {
      console.log(data)
    })

    this.socket.on('connect' , () => {
      console.log(this.socket.id);
    });
  }

  async fetchMessage() {
    const messages = (await axios(`http://localhost:8080/messages`)).data.users
    console.log('Message: ', messages)
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

  async sendMessage({ message, roomName, name }: { message: any; roomName: any; name: any }, cb: any) {
    if (this.socket) {
      this.socket.emit('message', { message, roomName, name }, cb)
      await axios.post(`http://localhost:8080/messages`, {
          message: message,
          user_id: 1
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
