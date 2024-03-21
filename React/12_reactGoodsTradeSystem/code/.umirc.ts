// npm install less less-loader --save-dev
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
  /*
  chainWebpack(config, { webpack }) {
    config.module
      .rule('less')
      .oneOf('normal')
      .use('less-loader')
      .loader('less-loader')
      .options({
        lessOptions: {
          modifyVars: {
            'primary-color': '#FFFF00', // 设置你的主题色为黄色  
            'link-color': '#FFFF00', // 链接颜色也设置为黄色  
            // ... 其他变量 ...  
          },
          javascriptEnabled: true,
        },
      });
  },
  */
  // theme: { '@primary-color': '#FFFF00' },
  // "theme": {
  //   "primary-color": "#FFFF00",
  // },
});
