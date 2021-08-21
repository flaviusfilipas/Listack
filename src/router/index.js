import {createRouter, createWebHistory} from '@ionic/vue-router';
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import ListView from '../pages/ListView.vue'
import {Storage} from "@capacitor/storage";
import AddContributorPage from "@/pages/AddContributorPage";

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
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/list/:id',
    name: 'ListView',
    component: ListView
  },
  {
    path: '/add-contributor',
    name: 'AddContributorPage',
    component: AddContributorPage
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next) => {
   Storage.get({key:"loggedIn"})
       .then(response => {
         const loggedIn = response.value;
         if(loggedIn === "false" && (to.path !=='/login') && to.path !== '/register'){
           next("/login");
         }else{
           next();
         }
       })
})

export default router
