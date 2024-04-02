import { createRouter, createWebHistory } from 'vue-router';
import RouterNestedAbout from "@/pages/RouterNestedAbout";
import RouterNestedHome from '@/pages/RouterNestedHome';
import RouterNestedNews from "@/pages/RouterNestedNews";
import RouterPropsDetail from "@/pages/RouterPropsDetail";
import RouterProgrammaticMessage from '@/pages/RouterProgrammaticMessage';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: 'regard',
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
                    component: RouterProgrammaticMessage,
                    children: [
                        {
                            name: 'particulars',
                            path: 'detail',
                            component: RouterPropsDetail,
                            props({ query: { id, title } }) {
                                return {
                                    id,
                                    title
                                }
                            }
                        }
                    ],
                }
            ]
        }
    ]
});

export default router;