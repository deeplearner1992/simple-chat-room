import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
// import ChatRoomView from '../views/ChatRoomView.vue'
// import RegisterView from '../views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginView
    }
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: LoginView
    // },
    // {
    //   path: '/register',
    //   name: 'register',
    //   component: RegisterView
    // },
    // {
    //   path: '/chatroom',
    //   name: 'chatroom',
    //   // // route level code-splitting
    //   // // this generates a separate chunk (About.[hash].js) for this route
    //   // // which is lazy-loaded when the route is visited.
    //   // component: () => import('../views/AboutView.vue')
    //   component: ChatRoomView
    // }
  ]
})

export default router
