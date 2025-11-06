import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createHison, Hison } from 'hisonjs';

const app = createApp(App);

const hison: Hison = createHison();
console.log(hison.getIsPossibleOpenDevTool());
hison.setDoDetectDevTool(() => {
    debugger;
});
console.log(hison.getIsPossibleOpenDevTool());
hison.shield.execute(hison);
app.config.globalProperties.$hison = hison;

app.use(router).mount('#app');
