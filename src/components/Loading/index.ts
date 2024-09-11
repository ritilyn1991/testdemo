import file from './index.vue';
import { createApp } from 'vue';

let instance = null;
let node = null;

function Loading() {}

Loading.hide = () => {
  document.body.removeChild(node);
  node = null;
  instance = null;
};

Loading.show = options => {
  if (instance) {
    Loading.hide();
  }
  // 实例化组件
  instance = createApp(file, {
    ...options,
    close: () => {
      Loading.hide();
    }
  });
  node = document.createElement('div');
  document.body.appendChild(node); // 挂载组件dom节点
  instance.mount(node);
};
Loading.install = app => {
  app.config.globalProperties.$loading = Loading;
};

export default Loading;
