import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/admin'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/admin',
    component: () => import('../layouts/AdminLayout.vue'),
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('../views/admin/Dashboard.vue')
      },
      {
        path: 'registration',
        name: 'registration',
        component: () => import('../views/admin/Registration.vue')
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('../views/admin/Settings.vue')
      }
    ]
  },

  // 404 catcher
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, _, next) => {
  const token = localStorage.getItem('token')
  const auth = useAuthStore()

  // Remember 404 no auth
  if (to.name === 'notFound') {
    return next()
  }

  if (!token) {
    if (to.name !== 'login') return next({ name: 'login' })
    return next()
  }

  if (!auth.checked) {
    const ok = await auth.fetchUser(token)
    if (!ok) return next({ name: 'login' })
  }

  if (to.name === 'login' && auth.user) {
    return next({ path: '/' })
  }

  return next()
})

export default router