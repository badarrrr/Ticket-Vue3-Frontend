
import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import TicketsList from '../views/TicketsList.vue'
import TicketCreate from '../views/TicketCreate.vue'
import TicketDetail from '../views/TicketDetail.vue'
import AIInsights from '../views/AIInsights.vue'
import { useAuthStore } from '../store'
import Profile from '../views/Profile.vue' // 导入组件

const routes = [
  { path: '/', name: 'Home', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/login', name: 'Login', component: Login },
  { path: '/tickets', name: 'Tickets', component: TicketsList, meta: { requiresAuth: true } },
  { path: '/tickets/create', name: 'TicketCreate', component: TicketCreate, meta: { requiresAuth: true } },
  { path: '/tickets/:id', name: 'TicketDetail', component: TicketDetail, meta: { requiresAuth: true }, props: true },
  { path: '/ai-insights', name: 'AIInsights', component: AIInsights, meta: { requiresAuth: true } },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: { requiresAuth: true } // 如果需要登录才能访问
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
