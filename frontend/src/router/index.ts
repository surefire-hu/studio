import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// Importa le pagine
import Home from '../views/HomeView.vue'
import Blog from '../views/News.vue'
import BlogDetail from '../views/BlogDetail.vue'
import AssicurazioneDetail from '../views/AssicurazioneDetail.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/news',
    name: 'Blog',
    component: Blog
  },
  { 
    path: '/blog/:id', 
    name: 'BlogDetail', 
    component: BlogDetail 
  },
  {
    path: '/assicurazione/:slug',
    name: 'AssicurazioneDetail',
    component: AssicurazioneDetail
  },
  // fallback per URL non trovati
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
