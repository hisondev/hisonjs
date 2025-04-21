import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createHison, Hison, MonthFormat } from 'hisonjs';

const app = createApp(App);

const hison: Hison = createHison();
console.log(hison);
console.log(hison.getMonthFormat());
hison.setMonthFormat(MonthFormat.MMMM);
console.log(hison.getMonthFormat());
app.config.globalProperties.$hison = hison;

app.use(router).mount('#app');
