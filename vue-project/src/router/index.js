
///Define routes and paths

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/Register.vue'
import PostView from '../views/Posts.vue'
import CreatepostView from '../views/Create-Post.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },

    {
      path: "/register",
      name: 'register',
      component: RegisterView
    },
    {
      path: "/posts",
      name: 'posts',
      component: PostView
    },
    {
      path: "/createpost",
      name: 'create-post',
      component: CreatepostView
    }
  ]
})

export default router
