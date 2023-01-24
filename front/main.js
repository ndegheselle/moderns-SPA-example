import "./scss/styles.scss"

import { createApp } from 'vue'

import store from './store.js'
import App from './App.vue'

const app = createApp(App);
app.mount('#app');
app.use(store);
app.config.globalProperties.$store = store;