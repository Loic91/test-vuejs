import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// createApp(App).use(router).use(Vue3Mq).mount('#app')

const app = createApp(App)
app.use(router)

// app.use(VueScreen, {
//     breakpoints: { 
//         phone: 768,
//         tablet: 1024,
//         desktop: 2440,
//         touch: true
//     }
// })

app.mount("#app")
