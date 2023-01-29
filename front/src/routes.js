import { createWebHistory, createRouter } from 'vue-router'
import store from './store.js'

import Home from './layout/Home.vue'
import Login from './layout/Login.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login, meta: {noAuth: true} },
]

const router = createRouter({
  history: createWebHistory(),
  routes, 
})

router.beforeEach((to, from, next) => {
  if (!store.getters.isConnected && !to.matched.some(record => record.meta.noAuth)) {
    next({ name: 'Login' });
  } else {
    next(); // go to wherever I'm going
  }
})

export default router;