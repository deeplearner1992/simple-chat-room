import { io } from 'socket.io-client'

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
  }
}

export default new SocketioService()
