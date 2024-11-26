import { createApp } from 'vue'
import "./assets/tailwind.css";
import "./style.css";
import App from './App.vue'
import { router } from './router'
import { MotionPlugin } from '@vueuse/motion'
import PrimeVue from 'primevue/config';
import { createPinia } from 'pinia';
const pinia = createPinia();
const app = createApp(App);

app.use(router); 
app.use(pinia); 
app.use(MotionPlugin);
app.use(PrimeVue, {
    theme: 'none'
});

app.mount('#app');
