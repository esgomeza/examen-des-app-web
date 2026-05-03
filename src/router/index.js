import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import ProductView from '../views/ProductView.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginView },

  {
    path: '/dashboard',
    component: DashboardView,
    meta: { requiresAuth: true },
    children: [
      { path: 'productos', component: ProductView }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 🔐 PROTEGER RUTAS
router.beforeEach((to, from, next) => {
  const autenticado = localStorage.getItem('auth')

  if (to.meta.requiresAuth && !autenticado) {
    next('/login')
  } else {
    next()
  }
})

export default router