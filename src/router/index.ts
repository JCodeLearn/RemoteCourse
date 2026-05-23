import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/features/home/index.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/features/user/components/AuthPage.vue'),
      meta: { layout: 'blank', guest: true },
    },
    {
      path: '/register',
      name: 'register',
      redirect: '/login',
    },
    {
      path: '/course/:id',
      name: 'courseDetail',
      component: () => import('@/features/course/index.vue'),
      props: true,
    },
    {
      path: '/course/:id/discussion',
      name: 'courseDiscussion',
      component: () => import('@/features/course/components/DiscussionPage.vue'),
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: '/management',
      name: 'management',
      component: () => import('@/features/management/index.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/classes',
      name: 'classes',
      component: () => import('@/features/classes/index.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('@/features/history/index.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/inbox',
      name: 'inbox',
      component: () => import('@/features/inbox/index.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/personal',
      name: 'personal',
      component: () => import('@/features/user/index.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/features/home/index.vue'),
    },
  ],
})

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else if (to.meta.guest && authStore.isLoggedIn) {
    next({ name: 'home' })
  } else {
    next()
  }
})

router.afterEach(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

export default router
