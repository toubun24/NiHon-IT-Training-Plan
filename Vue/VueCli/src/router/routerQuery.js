import { createRouter, createWebHistory } from 'vue-router';
import RouterNestedAbout from "@/pages/RouterNestedAbout";
import RouterNestedHome from '@/pages/RouterNestedHome';
import RouterNestedNews from "@/pages/RouterNestedNews";
// import RouterNestedMessage from '@/pages/RouterNestedMessage';
// new
// import * as path from "path";
import RouterQueryDetail from "@/pages/RouterQueryDetail";
import RouterQueryMessage from '@/pages/RouterQueryMessage';

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
            children: [
                {
                    path: 'news',
                    component: RouterNestedNews
                },
                {
                    path: 'message',
                    component: RouterQueryMessage,
                    children:[
                        {
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