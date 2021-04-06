import './styles/index.css';
import { createApp } from 'vue';
import app from './app.vue';
import store from './store';

const appInstance = createApp(app);
appInstance.use(store);
appInstance.mount('#app');
