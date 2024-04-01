import { createRouter, createWebHistory } from 'vue-router';
import RouterNestedAbout from "@/pages/RouterNestedAbout";
import RouterCachedHome from '@/pages/RouterCachedHome';
import RouterHooksNews from "@/pages/RouterHooksNews";
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
            component: RouterCachedHome,
            children: [
                {
                    path: 'news',
                    component: RouterHooksNews
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