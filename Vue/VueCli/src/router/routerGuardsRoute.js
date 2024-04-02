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
            component: RouterNestedAbout,
            meta: {
                title: '关于'
            }
        },
        {
            path: '/home',
            component: RouterCachedHome,
            meta: {
                title: '主页'
            },
            children: [
                {
                    path: 'news',
                    component: RouterHooksNews,
                    meta: {
                        isAuth: true,
                        title: '新闻'
                    },
                    //独享路由守卫
                    beforeEnter(to, from, next) {
                        const { isAuth } = to.meta;
                        if (isAuth) {
                            //代表需要鉴权
                            if (localStorage.getItem('school') === 'Osaka1') next();//类似于nodejs中间件
                            else alert('无权限');
                        } else {
                            next();
                        }
                    }
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
                    meta: {
                        isAuth: true,
                        title: '消息'
                    }
                }
            ]
        }
    ]
});
// router.beforeEach((to, from, next) => {
//     console.log('前置路由守卫');
//     const { isAuth } = to.meta;
//     if (isAuth) {
//         if (localStorage.getItem('school') === 'Osaka1') next();
//         else alert('无权限');
//     } else {
//         next();
//     }
// });
router.afterEach((to, from) => {
    console.log('后置路由守卫', to, from);
    const { title } = to.meta;
    document.title = title || 'vue-advance';
})
export default router;