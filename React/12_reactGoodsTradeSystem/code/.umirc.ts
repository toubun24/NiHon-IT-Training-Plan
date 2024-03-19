import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
  fastRefresh: {},
  // "theme": {
  //   "primary-color": "#fadb14",
  // },
  // theme: {
  //   '@primary-color': "#fadb14",
  // },
  // models: {
  // dva 会自动加载 src/models/*.js  
  // './models/counter': { namespace: 'counter' },
  // },
  // dva: { immer: true, hmr: false, }
  // dva: {  
  //   immer: true, // 启用 immer 以简化 reducer 中的状态更新  
  //   hmr: true, // 启用热更新  
  // },
});
