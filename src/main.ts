import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { store, key } from './store'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

const app = createApp(App);

app.use(store, key);
app.use(Antd);

app.mount('#app')
