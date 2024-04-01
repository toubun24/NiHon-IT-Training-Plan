//该文件专门用于创建整个应用的路由器
// import VueRouter from "vue-router"; // vue 2
import { createRouter, createWebHistory } from 'vue-router'; // vue 3
import RouterAbout from "@/components/RouterAbout";
import RouterHome from '@/components/RouterHome';

//创建并默认暴露一个路由器
// vue 2
// export default new VueRouter({
//    routes:[
//        {
//            path:'/about',
//            component: RouterAbout
//        },
//        {
//            path:'/home',
//            component: RouterHome
//        }
//    ]
// });
// vue 3
const router = createRouter({
    history: createWebHistory(), // 使用 HTML5 history 模式
    routes: [ // 注意这里使用 routes 而不是 route
        {
            path: '/about',
            component: RouterAbout
        },
        {
            path: '/home',
            component: RouterHome
        }
    ]
});

export default router;