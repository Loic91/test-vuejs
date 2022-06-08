// import { createRouter, createWebHistory } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router' // changements vers "createWebHashHistory" obligatoire pour la mise en production
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/profil',
    name: 'profil',
    component: () => import(/* webpackChunkName: "about" */ '../views/ProfilView.vue')
  },
  {
    path: '/profil2',
    name: 'profil2',
    component: () => import(/* webpackChunkName: "about" */ '../views/ProfilView2.vue')
  },
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(process.env.BASE_URL),  // changements vers "createWebHashHistory" obligatoire pour la mise en production 
  routes
})

export default router
