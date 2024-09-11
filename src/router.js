import { defineAsyncComponent } from 'vue';
import {
  createRouter,
  createWebHistory
} from 'vue-router';
let routes = [
  {
    name: 'test1',
    path: '/test1',
    component: defineAsyncComponent({
      // 加载函数
      loader: () => import('./views/Test1.vue')
    })
  },
  {
    name: 'test2',
    path: '/test2',
    component: defineAsyncComponent({
      // 加载函数
      loader: () => import('./views/Test2.vue')
    })
  }
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;
