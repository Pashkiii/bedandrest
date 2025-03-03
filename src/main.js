import { createApp } from 'vue';
import { router } from './router/index';
import Tooltip from 'primevue/tooltip';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import App from './App.vue';

import 'primeicons/primeicons.css'

const app = createApp(App)

app.directive('tooltip', Tooltip);

app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

app.mount('#app');
