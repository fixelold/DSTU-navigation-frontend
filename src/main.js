import { createApp } from 'vue'
import App from './App'

import router from './router'
import VueCookies from 'vue-cookies';
createApp(App).use(VueCookies).use(router).use(router).mount('#app')
