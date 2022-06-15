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
  {
    path: '/profil3',
    name: 'profil3',
    component: () => import(/* webpackChunkName: "about" */ '../views/ProfilView3.vue')
  },
  {
    path: '/profil4',
    name: 'profil4',
    component: () => import(/* webpackChunkName: "about" */ '../views/ProfilView4.vue')
  },
  {
    path: '/profil5',
    name: 'profil5',
    component: () => import(/* webpackChunkName: "about" */ '../views/ProfilView5.vue')
  },
  {
    path: '/profil6',
    name: 'profil6',
    component: () => import(/* webpackChunkName: "about" */ '../views/ProfilView6.vue')
  },
  {
    path: '/profil7',
    name: 'profil7',
    component: () => import(/* webpackChunkName: "about" */ '../views/ProfilView7.vue')
  },
  {
    path: '/profil8',
    name: 'profil8',
    component: () => import(/* webpackChunkName: "about" */ '../views/ProfilView8.vue')
  },
  {
    path: '/profil9',
    name: 'profil9',
    component: () => import(/* webpackChunkName: "about" */ '../views/ProfilView9.vue')
  },
  {
    path: '/profil10',
    name: 'profil10',
    component: () => import(/* webpackChunkName: "about" */ '../views/ProfilView10.vue')
  },
]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(process.env.BASE_URL),  // changements vers "createWebHashHistory" obligatoire pour la mise en production 
  routes
})

export default router
