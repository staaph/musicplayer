import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import UploadManager from '../views/UploadManager.vue';
import SignIn from '../views/SignIn.vue';

import { auth } from '../firebase/config.js';

// auth guard
// if admin is not found > redirect to /login, else proceed to /upload
const requireAuth = (to, from, next) => {
  let user = auth.currentUser;
  if (!user) {
    next({ name: 'login' });
  } else {
    next();
  }
};

//if credentials in localstorage, no signup needed > redirect to to /uploads, else display page
const requireNoAuth = (to, from, next) => {
  let user = auth.currentUser;
  if (user) {
    next({ name: 'upload' });
  } else {
    next();
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/upload',
      name: 'upload',
      component: UploadManager,
      beforeEnter: requireAuth,
    },
    {
      path: '/login',
      name: 'login',
      component: SignIn,
      beforeEnter: requireNoAuth,
    },
    { path: '/:catchAll(.*)*', redirect: { name: 'home' } },
  ],
});

export default router;
