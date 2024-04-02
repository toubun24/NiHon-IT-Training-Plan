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
            meta: { // meta
                title: '关于'
            }
        },
        {
            path: '/home',
            component: RouterCachedHome,
            meta: { // meta
                title: '主页'
            },
            children: [
                {
                    path: 'news',
                    component: RouterHooksNews,
                    // meta:路由元信息，可以配置是否需要校验的信息
                    meta: {
                        isAuth: true,
                        title: '新闻'
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
                    // meta:路由元信息，可以配置是否需要校验的信息
                    meta: {
                        isAuth: true,
                        title: '消息'
                    }
                }
            ]
        }
    ]
});
//全局前置路由守卫
//初始化和在每一次路由切换之前被调用
router.beforeEach((to, from, next) => {
    // console.log(to, from);
    console.log('前置路由守卫');
    const { isAuth } = to.meta;
    if (isAuth) {
        //代表需要鉴权
        if (localStorage.getItem('school') === 'Osaka1') next();//类似于nodejs中间件
        else alert('无权限');
    } else {
        next();
    }
});
//全局后置路由守卫
//初始化和在每一次路由切换之后被调用
router.afterEach((to, from) => {
    console.log('后置路由守卫', to, from);
    //点击每一个路由都切换西夏document.title
    const { title } = to.meta;
    document.title = title || 'vue-advance';
})
export default router;