import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Authentication from '@/views/Authentication'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: Authentication,
    props: { isLogin: true },
    meta: { requiresAuth: false },
  },
  {
    path: '/create-account',
    name: 'CreateAccount',
    component: Authentication,
    props: { isLogin: false },
    meta: { requiresAuth: false },
  },
  {
    path: '/categories',
    name: 'Categories',
    component: () => import('@/views/Categories'),
    meta: { requiresAuth: true },
  },
  {
    path: '/clients',
    name: 'Clients',
    component: () => import('@/views/Clients'),
    meta: { requiresAuth: true },
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('@/views/Products'),
    meta: { requiresAuth: true },
  },
  {
    path: '/providers',
    name: 'Providers',
    component: () => import('@/views/Providers'),
    meta: { requiresAuth: true },
  },
  {
    path: '/sales',
    name: 'Sales',
    component: () => import('@/views/Sales'),
    meta: { requiresAuth: true },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

const setToken = () => {
  const token = localStorage.getItem('token')
  if (token) {
    store.dispatch('auth/setToken', token)
  }
}

const refreshUser = async () => {
  const { data: user } = await store.dispatch('auth/getUser')
  store.dispatch('auth/setUser', user)
}

router.beforeEach(async (to, from, next) => {
  const shouldRefreshUser = !from.name && to.meta.requiresAuth

  if (shouldRefreshUser) setToken()

  const isAuthenticated = store.getters['auth/isAuthenticated']

  if (!isAuthenticated && to.meta.requiresAuth) {
    next('/login')
  } else {
    if (shouldRefreshUser) await refreshUser()
    next()
  }
})

export default router
