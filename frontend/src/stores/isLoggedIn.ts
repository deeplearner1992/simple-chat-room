// stores/isLoggedIn.ts
import { defineStore } from 'pinia'

export const useIsLoggedInStore = defineStore('isLoggedIn', {
  state: () => {
    return { 
      username: '',
      isLoggedIn: false 
    }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    switchState() {
      !this.isLoggedIn
    },
  },
})