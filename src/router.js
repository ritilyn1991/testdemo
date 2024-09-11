import { defineAsyncComponent } from 'vue';
import {
  createRouter,
  createWebHistory
} from 'vue-router';
import LoadingComponent from './components/Loading/index.vue'
let routes = [
  {
    name: 'test1',
    path: '/test1',
    component: defineAsyncComponent({
      // 加载函数
      loader: () => import('./views/Test1.vue'),
      // 加载异步组件时使用的组件
      loadingComponent: LoadingComponent,
      // 展示加载组件前的延迟时间，默认为 200ms
      delay: 0,
    })
  },
  {
    name: 'test2',
    path: '/test2',
    component: defineAsyncComponent({
      // 加载函数
      loader: () => import('./views/Test2.vue'),
      // 加载异步组件时使用的组件
      loadingComponent: LoadingComponent,
      // 展示加载组件前的延迟时间，默认为 200ms
      delay: 0,
    })
  }
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;
