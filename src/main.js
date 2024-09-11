import router from './router';
import { createApp, h } from 'vue';
import App from "./views/App.vue";
const app = createApp({
  render() {
    return h(App);
  }
});
app.use(router);

app.mount('#root');