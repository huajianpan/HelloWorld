import { createApp } from 'vue'
import App from './App.vue'
import Vant from 'vant';
import 'vant/lib/index.css';
import 'amfe-flexible'
import router from './router'
import './style/index.css';
import store from './store'

createApp(App).use(Vant).use(router).use(store).mount('#app')
