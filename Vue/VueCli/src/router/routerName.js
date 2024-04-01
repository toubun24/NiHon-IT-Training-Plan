import { createRouter, createWebHistory } from 'vue-router';
import RouterNestedAbout from "@/pages/RouterNestedAbout";
import RouterNestedHome from '@/pages/RouterNestedHome';
import RouterNestedNews from "@/pages/RouterNestedNews";
import RouterQueryDetail from "@/pages/RouterQueryDetail";
import RouterNameMessage from '@/pages/RouterNameMessage';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: 'regard', // name
            path: '/about',
            component: RouterNestedAbout
        },
        {
            path: '/home',
            component: RouterNestedHome,
            children: [
                {
                    path: 'news',
                    component: RouterNestedNews
                },
                {
                    path: 'message',
                    // component: RouterQueryMessage,
                    component: RouterNameMessage,
                    children: [
                        {
                            name: 'particulars', // name
                            path: 'detail',
                            component: RouterQueryDetail
                        }
                    ],
                }
            ]
        }
    ]
});

export default router;