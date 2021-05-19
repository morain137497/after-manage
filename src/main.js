import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'element-plus/packages/theme-chalk/src/base.scss'
import { components } from './element-plus'

const app = createApp(App)

components.forEach(item => {
    app.use(item)
})

app.config.globalProperties.$ELEMENT = {size: 'small'}


app.use(router).mount('#app')
