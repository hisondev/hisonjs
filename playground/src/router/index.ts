import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Test from '../pages/Test.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/test', name: 'Test', component: Test },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
