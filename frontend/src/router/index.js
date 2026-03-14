
 

import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import ChatView from '../views/ChatView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProfileView from '../views/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: "/login",
      name: "login",
      component: LoginView
    },
    {
      path: '/chat',
      name: 'chat',
      component: ChatView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    }
  ],
})

export default router
