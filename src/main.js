import { createApp } from 'vue'
import App from './App.vue'
import VueBasicAlert from 'vue-basic-alert'

const app = createApp(App);
app.use(VueBasicAlert)
app.mount('#app');

//createApp(App).mount('#app')
