import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '/src/components/Home.vue'
import HelloWorld from '/src/components/HelloWorld.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/hw',
        name: 'hw',
        component: HelloWorld,
    },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router
