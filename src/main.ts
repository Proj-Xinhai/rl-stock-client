import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// force http
if (location.protocol !== 'http:') location.replace(`http:${location.href.substring(location.protocol.length)}`)

const app = createApp(App)

app.use(router)

app.mount('#app')
