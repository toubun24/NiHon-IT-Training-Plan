import { createRouter, createWebHistory } from 'vue-router';
import RouterNestedAbout from "@/pages/RouterNestedAbout";
import RouterNestedHome from '@/pages/RouterNestedHome';
import RouterNestedNews from "@/pages/RouterNestedNews";
import RouterNestedMessage from '@/pages/RouterNestedMessage';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/about',
            component: RouterNestedAbout
        },
        {
            path: '/home',
            component: RouterNestedHome,
            children: [ // children
                {
                    path: 'news', // 不用'/'
                    component: RouterNestedNews
                },
                {
                    path: 'message',
                    component: RouterNestedMessage
                }
            ]
        }
    ]
});

export default router;