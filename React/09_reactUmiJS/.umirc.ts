import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // routes: [{ path: '/', component: '@/pages/index' },],
  fastRefresh: {},
  /* added */
  proxy: {
    '/api': {
      target: 'https://i.maoyan.com/',
      changeOrigin: true,
    },
  },
  antd: {
    mobile: false, // 关闭umi自带mobile
  },
  dva: {
    // Immer是mobx的作者写的一个immutable库，核心实现是利用ES6的proxy
    // 几乎以最小的成本实现了js的不可变数据结构，简单易用、体量小巧、设计巧妙，满足了我们对JS不可变数据结构的需求
    immer: true, // dva-immer，启动！
    hmr: false, // 模块热替换
  },
});
