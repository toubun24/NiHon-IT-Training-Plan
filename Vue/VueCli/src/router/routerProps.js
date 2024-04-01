import { createRouter, createWebHistory } from 'vue-router';
import RouterNestedAbout from "@/pages/RouterNestedAbout";
import RouterNestedHome from '@/pages/RouterNestedHome';
import RouterNestedNews from "@/pages/RouterNestedNews";
import RouterPropsDetail from "@/pages/RouterPropsDetail";
import RouterNameMessage from '@/pages/RouterNameMessage'; // RouterNameMessage

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
                    component: RouterNameMessage,
                    children: [
                        {
                            name: 'particulars',
                            path: 'detail/:id/:title',
                            component: RouterPropsDetail,
                            // props的第一种写法值为对象，该对象的所有key-value都会以props的形式传给detail组件(死数据)
                            // props:{
                            //     a:1,
                            //     b:'hello'
                            // }
                            // props的第二种写法，值为布尔值，布尔值为真，就会把该路由组件收到的所有params(注意如果是query参数不会奏效的)参数以props的形式传递给detail组件
                            // props: true
                            // props的第三种写法，值为函数，$route.query.id
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