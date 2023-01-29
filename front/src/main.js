import "./scss/styles.scss"

import { createApp } from 'vue'

import router from './routes.js'
import store from './store.js'
import App from './App.vue'

const app = createApp(App);

app.use(store);
app.use(router);

app.mount('#app');