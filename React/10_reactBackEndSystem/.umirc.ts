// npm install --save-dev @babel/plugin-transform-optional-chaining
// npm install --save-dev @babel/plugin-transform-nullish-coalescing-operator
// npm i @umijs/babel-preset-umi

import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: { // https://v3.umijs.org/config#nodemodulestransform
    type: 'all',
    exclude: [],
  },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
  fastRefresh: {},
  // https://umijs.org/docs/api/config#extrababelincludes
  // extraBabelIncludes: ['/@tsparticles'], // 配置额外需要做 Babel 编译的 NPM 包或目录
  // extraBabelPresets: ['@umijs/babel-preset-umi'], // @babel/preset-env // 配置额外的 babel 插件。可传入插件地址或插件函数
  /*
  extraBabelPlugins: [ // 配置额外的 babel 插件。可传入插件地址或插件函数
    "@babel/plugin-transform-optional-chaining",
    "@babel/plugin-transform-nullish-coalescing-operator",
    /*
    [
      "import",
      {
        libraryName: "@tsparticles",
        // libraryDirectory: "/@tsparticles",
      }
    ]
  ],
  */
});
