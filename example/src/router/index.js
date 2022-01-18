import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        meta: { title: 'home' },
        component: () => import('@/views/Home.vue')
    },
    {
        path: '/tabs',
        name: 'Tabs',
        meta: { title: 'tabs' },
        component: () => import('@/views/Tabs.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router