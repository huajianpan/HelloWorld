import { createRouter, createWebHashHistory } from 'vue-router';
// 1 创建路由规则
const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login/index.vue')
    },
    {
        path: '/',
        name: 'layout',
        component: () => import('../views/layout/index.vue'),
        children: [
            {
                path: '',
                name: 'home',
                component: () => import('../views/home/index.vue')
            },
            {
                path: '/qa',
                name: 'qa',
                component: () => import('../views/qa/index.vue')
            },
            {
                path: '/video',
                name: 'video',
                component: () => import('../views/video/index.vue')
            },
            {
                path: '/my',
                name: 'my',
                component: () => import('../views/my/index.vue')
            }
        ]
    }
]
// 2 创建路由实例
const router = createRouter({
    // 使用history模式 createWebHistory()
    // 使用hash模式 createWebHashHistory()
    history: createWebHashHistory(),
    routes
})
export default router;

// 3 创建登录组件 ps: ../views/login/index.vue
// 4 指定出口 <router-view>