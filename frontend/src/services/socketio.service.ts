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

  sendMessage({ message, roomName }: { message: any; roomName: any }, cb: any) {
    if (this.socket) this.socket.emit('message', { message, roomName }, cb)
  }
}

export default new SocketioService()
