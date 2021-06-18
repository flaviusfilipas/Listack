import { createRouter, createWebHistory } from '@ionic/vue-router';
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import ListView from '../pages/ListView.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path:'/login',
    name: 'Login',
    component: Login
  },
  {
    path:'/shopping-list',
    name: 'ListView',
    component: ListView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
