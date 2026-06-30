import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ChartView from '@/views/ChartView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: 
  [
    {path: '/', component: HomeView}, 
    {path: '/Chart', component: ChartView}
  ]

  
})

export default router
  