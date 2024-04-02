import { createRouter, createWebHistory } from 'vue-router';
import RouterNestedAbout from "@/pages/RouterNestedAbout";
import RouterNestedHome from '@/pages/RouterNestedHome';
import RouterNestedNews from "@/pages/RouterNestedNews";
import RouterParamsDetail from "@/pages/RouterParamsDetail";
import RouterParamsMessage from '@/pages/RouterParamsMessage';

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
                    component: RouterParamsMessage,
                    children: [
                        {
                            name: 'particulars',
                            // path: 'detail',
                            path: 'detail/:id/:title',
                            component: RouterParamsDetail
                        }
                    ],
                }
            ]
        }
    ]
});

export default router;