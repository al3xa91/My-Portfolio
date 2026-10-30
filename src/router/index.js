import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Alexa Cattaneo Piazza' },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: { title: 'About me · Alexa Cattaneo Piazza' },
    },
  ],
  // Start each new page at the top, restore position with the back button,
  // and stay in place when only a project opens or closes on the same page.
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.path === from.path) return false
    return { top: 0 }
  },
})

// Browser tab title for each page
router.afterEach(to => {
  document.title = to.meta.title || 'Alexa Cattaneo Piazza'
})

export default router
