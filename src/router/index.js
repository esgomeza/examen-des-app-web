import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import ProductView from '../views/ProductView.vue'
import UsuariosView from '../views/UsuariosView.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginView },
  {
    path: '/dashboard',
    component: DashboardView,
    meta: { requiresAuth: true },
    children: [
      { path: 'productos', component: ProductView },
      { path: 'usuarios', component: UsuariosView }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Protección de rutas moderna
router.beforeEach((to) => {
  const autenticado = localStorage.getItem('auth')
  if (to.meta.requiresAuth && !autenticado) {
    return '/login'
  }
})

export default router