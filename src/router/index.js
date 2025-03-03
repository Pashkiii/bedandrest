import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routers';

const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: 'active-menu',
    routes,
});

export { router };
