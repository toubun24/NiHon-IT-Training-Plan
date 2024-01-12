# Week 5 Report

## 学习内容及时长

* **2024.01.08 月曜日:** 5h35min
  * GraphQL 12:00-13:50 15:15-19:00

* **2023.01.09 火曜日:** 5h50min
  * GraphQL 12:35-14:00
  * DvaJS 14:20-14:50 16:45-18:05
  * UmiJS 18:05-18:30 20:40-22:50

* **2023.01.10 水曜日:** 1h50min
  * 软件工程师常用日本语中级上 (P91-P95) 17:35-17:50
  * 日语影子跟读初中级Unit4 17:50-18:00
  * 项目和路由搭建 18:00-18:15 18:25-18:30 18:35-18:45
  * 基本路由完善 18:45-19:05 02:40-03:15

* **2023.01.11 木曜日:** 5h35min
  * Layout布局 15:40-17:35
  * Header布局 18:05-18:45
  * 侧边栏布局 18:45-19:25 20:10-20:30 23:30-24:00
  * 侧边栏取数据 00:00-01:30


* **2023.01.12 金曜日:** 
  * 侧边栏取数据 16:50-17:50
  * 侧边栏渲染 17:50-18:10
  * 侧边栏样式优化 18:10-18:55
  * 权限列表布局 21:35-21:50
  * 权限列表样式优化 21:50-22:10
  * 权限列表一级删除 22:10-22:25 22:30-22:55
  * 权限列表二级删除 22:55
  * 权限列表编辑按钮 
  * 角色列表 
  * 角色列表布局 
  * 用户列表删除开关功能 
  * 添加用户(上) 
  * 添加用户(下) 
  * 修改与过滤用户 


* **2023.01.13 土曜日:** 

* **2023.01.14 日曜日:** 




## 学习笔记
1. **GraphQL**
* GraphQL与RESTful区别
  * RESTful一个接口只能返回一个资源，GraphQL一次可以获取多个资源
  * RESTful用不同的URL来区分资源，GraphQL用类型区分资源
* Schema：用于描述接口获取数据逻辑
  * Query描述资源的获取方式，可以将Schema理解为多个Query组成的一张表。其中，Query特指GraphQL中的查询（包含三种类型），query指GraphQL中的查询类型（仅指查询类型）
  * GraphQL中使用Query来抽象数据的查询逻辑，标准情况，有三种查询类型，分别是query（查询）、mutation（更改）和subscription（订阅）
* GraphQL，启动！
  * `npm install express express-graphql graphql mongoose`
  * create `xxx.js` with code
  * `http://localhost:4001/graphql`
    * `4001`: `app.listen(4001)`
    * `/graphql`: `app.use('/graphql', graphqlHTTP({ schema: Schema, rootValue: root, graphiql: true}))`
* 参数类型与传递
  * 基本类型：在GraphQL中他们统称叫标量类型(Scalar Type)，主要包括：`Int`（整型）, `Float`（浮点型）, `String`（字符串）, `Boolean`（布尔型）和`ID`（唯一标识符类型）；也允许自定义标量类型；另有对象类型
  * `!`用来表示这个参数不可以是空的；`[]`表示查询这个字段返回的是数组，`[]`里面是数组的类型
* MongoDB，启动: `mongod -dbpath=G:\NiHon-IT-Training-Plan\React\07_reactGraphQL\DB`
* GraphQL与React
  * 导入依赖: `npm i react-apollo apollo-boost graphql graphql-tag`
  * 要在React里使用Apollo数据栈前端至少需要三个包
    * `apollo-client`用于连接到Apollo后端
    * `graphql-tag`用于编写GraphQL查询
    * `react-apollo`用于执行GraphQL查询并将结果传给React的展示组件
  * `apollo-boost`：这个包包含了搭建Apollo客户端需要的所有东西
  * `react-apollo`：集成React的视图层
  * `graphql-tag`：解析GraphQL查询必要依赖
  * `graphql`：用于解析GraphQL查询

2. **DvaJS**
* dva是基于现有应用架构(redux+react-router+redux-saga等)的一层轻量封装，没有引入任何新概念
* DvaJS特性
  * 易学易用，仅有6个api，对redux用户尤其友好，配合umi使用后更是降低为0 API
  * elm概念，通过reducers, effects和subscriptions组织model
  * 插件机制，比如dva-loading可以自动处理loading状态，不用一遍遍地写showLoading和hideLoading
  * 支持HMR（模块热替换），基于babel-plugin-dva-hmr实现components、routes和 models的HMR
* 数据流向
  * 所有的`state`通过`connect`流向组件，组件经过`dispatch`发起`action`请求
  * 通过model中的`reducer`和`effect`去改变`state`,`effect`副作用函数统一`call`/`fork`同步或者异步与服务进行数据交互
* 启动！
  * `npm install dva-cli -g`
  * `dva new react-dva`
  * `npm start`
* 项目目录结构
  > `mock`: 存放用于 mock 数据的文件 \
  > `public`: 一般用于存放静态文件，打包时会被直接复制到输出目录(./dist) \
  > `src`: 文件夹用于存放项目源代码 \
    > `asserts`: 用于存放静态资源，打包时会经过 webpack 处理 \
    > `components`: 用于存放 React 组件，一般是该项目公用的无状态组件 \
    > `models`: 用于存放模型文件 \
    > `routes`: 用于存放需要 connect model 的路由组件 \
    > `services`: 用于存放服务文件，一般是网络请求等 \
    > `utils`: 工具类库 \
    > `router.js`: 路由文件 \
    > `index.js`: 项目的入口文件 \
  > `editorconfig`: 编辑器配置文件 \
  > `.eslintrc`: ESLint配置文件 \
  > `.roadhogrc.mock.js`: Mock配置文件 \
  > `.webpackrc`: 自定义的webpack配置文件，JSON格式，如果需要JS格式，可修改为`.webpackrc.js`

3. **UmiJS**
* Umi以路由为基础的，同时支持配置式路由和**约定式路由**，保证路由的功能完备，并以此进行功能扩展
* 什么时候不用Umi？
  * 需要支持IE 8或更低版本的浏览器
  * 需要支持React 16.8.0以下的React
  * 需要跑在Node 10以下的环境中
  * 有很强的webpack自定义需求和主观意愿
  * 需要选择不同的路由方案
* 为什么不是create-react-app: 是基于webpack的打包层方案，包含build、dev、lint等，他在打包层把体验做到了极致，但是不包含路由，不是框架，也不支持配置
* 为什么不是next.js: 不够贴近业务，不够接地气
* 约定化思想: 按照约定好的方式开发，就能达到某种效果，中间的过程由框架帮我们完成
* 技术收敛: 把大家常用的技术栈进行整理，收敛到一起
* 插件体系: 是Umi最重要的基建，包括Umi内部实现也是全部由插件构成
* 项目目录结构: 最重要的文件是``.umirc.ts`配置文件，在里面可以配置各种功能和插件，umi支持不同环境读取不同的配置文件
  ```
  .
  ├── package.json
  ├── .umirc.ts 配置文件，包含 umi 内置功能和插件的配置。
  ├── .env 环境变量
  ├── dist 执行 umi build 后，产物默认会存放在这里
  ├── mock 存储 mock 文件，此目录下所有 js 和 ts 文件会被解析为 mock 文件
  ├── public 此目录下所有文件会被 copy 到输出路径
  └── src
      ├── .umi 临时文件目录，比如入口文件、路由等，都会被临时生成到这里
      ├── layouts/index.tsx 约定式路由时的全局布局文件
      ├── pages 所有路由组件存放在这里
          ├── index.less
          └── index.tsx
      └── app.ts 运行时配置文件，可以在这里扩展运行时的能力，比如修改路由、修改 render 方法等
  ```
* 约定式路由
  * 约定式路由也叫文件路由，就是不需要手写配置，文件系统即路由
  * 通过src/pages目录和文件及其命名分析出路由配置, 也就是让umi根据约定好的目录结构帮我们生成路由配置文件
  * 需要注意的是，满足以下任意规则的文件不会被注册为路由
    > 以.或_开头的文件或目录 \
    > 以d.ts结尾的类型定义文件 \
    > 以test.ts、spec.ts、e2e.ts结尾的测试文件（适用于.js、.jsx和.tsx文件） \
    > components和component目录 \
    > utils和util目录 \
    > 不是.js、.jsx、.ts或.tsx文件 \
    > 文件内容不包含JSX元素
* mock功能
  * umi里约定mock文件夹下的文件或者page(s)文件夹下的_mock文件即mock文件
  * 文件导出接口定义，支持基于require动态分析的实时刷新，支持ES6语法，以及友好的出错提示
* dva集成
  * 按目录约定注册model，无需手动app.model
  * 文件名即namespace，可以省去model导出的namespace key
  * 无需手写router.js，交给umi处理，支持model和component的按需加载
  * 内置query-string处理，无需再手动解码和编码
  * 内置dva-loading和dva-immer，其中dva-immer需通过配置开启(简化reducer编写)

4. **JSON Server**: https://www.npmjs.com/package/json-server
* `npm install -g json-server`: 全局安装，否则找不到`json-server`指令，也不是环境变量的问题
* `json-server db.json --port 5000`: 在当前终端所在的文件夹目录上确保存在`db.json`本地文件
* `http://localhost:5000/`





## 内容拓展




## 遇见问题
1. 【已解决】**04_mongoDB.js**中，涉及mongoDB的配置，在CMD中输入`mongod -dbpath=G:\NiHon-IT-Training-Plan\React\07_reactGraphQL\DB`报错`'mongod' is not recognized as an internal or external command`。配置环境变量`C:\Program Files\MongoDB\Server\7.0\bin\`(注意结尾的`\`)后`mongod -version`
```
db version v7.0.5
Build Info: {
    "version": "7.0.5",
    "gitVersion": "7809d71e84e314b497f282ea8aa06d7ded3eb205",
    "modules": [],
    "allocator": "tcmalloc",
    "environment": {
        "distmod": "windows",
        "distarch": "x86_64",
        "target_arch": "x86_64"
    }
}
```

2. [课件链接](https://github.com/warrenlucky/zerostart/blob/main/java/React/(%E4%BA%8C%E5%8D%81%E5%85%AD)GraphQL.adoc#%E5%8F%AF%E8%A7%86%E5%8C%96%E5%B7%A5%E5%85%B7%E6%9F%A5%E8%AF%A2)中关于可视化工具查询，不清楚是什么软件，就暂时没去下载或复现

3. 【已解决】**04_mongoDB.js**中，`mongoose.connect("mongodb://localhost:27017/maizuo", { useNewUrlParser: true, useUnifiedTopology: true })`提示警告如下
```
[MONGODB DRIVER] Warning: useNewUrlParser is a deprecated option: useNewUrlParser has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
[MONGODB DRIVER] Warning: useUnifiedTopology is a deprecated option: useUnifiedTopology has no effect since Node.js Driver version 4.0.0 and will be removed in the next major version
```
经查询搜索后知道，去掉那两个已弃用参数即可，即直接使用`mongoose.connect("mongodb://localhost:27017/maizuo")`就行

4. 【基本解决】**05_GraphQL普通页面.html**中，与数据库的连接有问题，导致任何操作都会报错
```
05_GraphQL普通页面.html:30 
POST http://127.0.0.1:5500/graphql 405 (Method Not Allowed)
queryFilm @ 05_GraphQL普通页面.html:30
onclick @ 05_GraphQL普通页面.html:14
VM3511:1 Uncaught (in promise) SyntaxError: Unexpected end of JSON input
at 05_GraphQL普通页面.html:39:42
```
给`fetch('/graphql', {...})`补全为`'http://localhost:4001/graphql'`后恢复正常；但控制台的输出依旧是出现个几秒后就自己清空掉了，还不清楚是什么情况

5. 【基本解决】**06_query-src**中，安装`react-apollo`报错
```
PS G:\NiHon-IT-Training-Plan\React\07_reactGraphQL> npm i react-apollo
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR!
npm ERR! While resolving: graphql@0.1.0
npm ERR! Found: graphql@15.8.0
npm ERR! node_modules/graphql
npm ERR!   graphql@"^15.8.0" from the root project
npm ERR!   peer graphql@"^0.11.0 || ^0.12.0 || ^0.13.0 || ^14.0.0 || ^15.0.0" from 
apollo-client@2.6.10
npm ERR!   node_modules/apollo-client
npm ERR!     peer apollo-client@"^2.6.4" from react-apollo@3.1.5
npm ERR!     node_modules/react-apollo
npm ERR!       react-apollo@"*" from the root project
npm ERR!
npm ERR! Could not resolve dependency:
npm ERR! peer graphql@"^14.3.1" from react-apollo@3.1.5
npm ERR! node_modules/react-apollo
npm ERR!   react-apollo@"*" from the root project
npm ERR!
npm ERR! Fix the upstream dependency conflict, or retry
npm ERR! this command with --force or --legacy-peer-deps
```
查了一下发现近一两年的用法基本都是引入的`@apollo/client`，考虑到是不是apollo的版本也迭代了。于是安装了相应的依赖并作改写(注释中的内容是改写的新依赖)
```JavaScript
import React, { Component } from 'react'
import { ApolloProvider, Query } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'
```
改写为
```JavaScript
import React, { Component } from 'react'
import { Query } from '@apollo/client/react/components'
import { ApolloClient, ApolloProvider, gql } from '@apollo/client'
```
但这样写的话编译能过，网页端则依然报错
```
invariant.ts:12 Uncaught Invariant Violation: An error occurred! For more details, see the full error text at https://go.apollo.dev/c/err#%7B%22version%22%3A%223.8.8%22%2C%22message%22%3A15%2C%22args%22%3A%5B%5D%7D
```
若把`react-apollo`包以外的依赖按原样写
```JavaScript
import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo'
import { Query } from '@apollo/client/react/components'
import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'
```
则报错变为
```
Uncaught TypeError: Cannot read properties of undefined (reading 'bind') at useQuery.ts:483:1
react-dom.development.js:18687 The above error occurred in the <Query> component: at Query (http://localhost:3000/static/js/bundle.js:52359:24)
```
按`npm i react-apollo --legacy-peer-deps`方式安装能成功，并且也按最初的依赖引入方式来写，就能成功运行，但总觉得这样是不是不太好，只是刚好没遇到什么冲突才得以正常运行，新版的话是不是还是应该用`@apollo/client`的方法来做，但网上的相关内容则又基本没有使用到`Query`组件进行包裹的形式，而报错也正是在`Query`组件上，很怀疑是不是`import { Query } from '@apollo/client/react/components'`的引入方式有问题

6. 【已解决】**08_reactDvaJS**中，`Login`部分实现有问题，报错
```
POST http://localhost:8000/users/login 404 (Not Found)
```
后来找到是没有去修改`./.roadhogrc.mock.js`文件为
```JavaScript
const mockobj  = require('./mock/test')
export default {
  ...mockobj
};
```

7. 【已解决】**09_reactUmiJS**创建项目并`npm start`时报错
```
node:internal/crypto/hash:68
  this[kHandle] = new _Hash(algorithm, xofLen);
                  ^

Error: error:0308010C:digital envelope routines::unsupported
    at new Hash (node:internal/crypto/hash:68:19)
    at Object.createHash (node:crypto:138:10)
    at module.exports.__webpack_modules__.57442.module.exports (G:\NiHon-IT-Training-Plan\React\09_reactUmiJS\node_modules\@umijs\deps\compiled\webpack\4\bundle4.js:135907:62)
    at NormalModule._initBuildHash (G:\NiHon-IT-Training-Plan\React\09_reactUmiJS\node_modules\@umijs\deps\compiled\webpack\4\bundle4.js:109317:16)
    at handleParseError (G:\NiHon-IT-Training-Plan\React\09_reactUmiJS\node_modules\@umijs\deps\compiled\webpack\4\bundle4.js:109371:10)
    at G:\NiHon-IT-Training-Plan\React\09_reactUmiJS\node_modules\@umijs\deps\compiled\webpack\4\bundle4.js:109403:5
    at G:\NiHon-IT-Training-Plan\React\09_reactUmiJS\node_modules\@umijs\deps\compiled\webpack\4\bundle4.js:109258:12
    at G:\NiHon-IT-Training-Plan\React\09_reactUmiJS\node_modules\@umijs\deps\compiled\webpack\4\bundle4.js:61157:3
    at iterateNormalLoaders (G:\NiHon-IT-Training-Plan\React\09_reactUmiJS\node_modules\@umijs\deps\compiled\webpack\4\bundle4.js:60998:10)
    at Array.<anonymous> (G:\NiHon-IT-Training-Plan\React\09_reactUmiJS\node_modules\@umijs\deps\compiled\webpack\4\bundle4.js:60989:4) {
  opensslErrorStack: [ 'error:03000086:digital envelope routines::initialization error' ],
  library: 'digital envelope routines',
  reason: 'unsupported',
  code: 'ERR_OSSL_EVP_UNSUPPORTED'
}

Node.js v20.10.0
```
解决办法为将`package.json`文件中
```
"start": "umi dev",
```
改成
```
"start": "SET NODE_OPTIONS=--openssl-legacy-provider && umi dev",
```

8. 【基本解决】**09_reactUmiJS**中
* 首先是`./src/pages/cinema.tsx`中`import { SearchOutline } from 'antd-mobile-icons';`的`'antd-mobile-icons'`标红，于是`npm install antd-mobile-icons`即可
* 其次，`./src/pages/cinema.tsx`中`import { NavBar, DotLoading } from 'antd-mobile';`的`DotLoading`与`./src/pages/city.tsx`中`import { IndexBar, List } from 'antd-mobile';`的`IndexBar`均标红；同时，`./src/pages/cinema.tsx`中`<NavBar back={props.cityName} ... >`的`back`也标红，报错信息为
```
No overload matches this call.
  Overload 1 of 2, '(props: NavBarProps | Readonly<NavBarProps>): NavBar', gave the following error.
    Type '{ children: string; back: any; right: Element; backArrow: boolean; onBack: () => void; }' is not assignable to type 'IntrinsicAttributes & IntrinsicClassAttributes<NavBar> & Pick<Readonly<NavBarProps> & Readonly<...>, "method" | ... 363 more ... | "key"> & Partial<...> & Partial<...>'.
      Property 'back' does not exist on type 'IntrinsicAttributes & IntrinsicClassAttributes<NavBar> & Pick<Readonly<NavBarProps> & Readonly<...>, "method" | ... 363 more ... | "key"> & Partial<...> & Partial<...>'.
  Overload 2 of 2, '(props: NavBarProps, context: any): NavBar', gave the following error.
    Type '{ children: string; back: any; right: Element; backArrow: boolean; onBack: () => void; }' is not assignable to type 'IntrinsicAttributes & IntrinsicClassAttributes<NavBar> & Pick<Readonly<NavBarProps> & Readonly<...>, "method" | ... 363 more ... | "key"> & Partial<...> & Partial<...>'.
      Property 'back' does not exist on type 'IntrinsicAttributes & IntrinsicClassAttributes<NavBar> & Pick<Readonly<NavBarProps> & Readonly<...>, "method" | ... 363 more ... | "key"> & Partial<...> & Partial<...>'.ts(2769)
```
最后通过`npm install antd-mobile`得到解决(找不到组件还可以说是版本问题，重新安装得到解决，和back参数有什么关系实在没想通orz)
* 顺便一提，运行后不显示轮播图且控制台依然会警告
```
Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
```
是因为原网站的轮播图无了，相应的内容都没有了，应该影响到state的update也无法进行了的缘故
* 关于`antd-mobile`，在`.umirc.ts`中有`antd: {mobile: false,},`，后来搜到其用途是关闭umi自带mobile，否则可能会有冲突报错，所以需要额外重新安装一次`antd-mobile`似乎也就说得通了

9. **10_reactBackEndSystem**中，`_layout.jsx`嵌套路由是umi3.x的内容，新版嵌套路由参考[链接](https://github.com/umijs/umi/issues/8850#issuecomment-1206194329)

10. 【已解决】**Layout布局**报错
```
ERROR  Failed to compile with 1 errors                                                     16:29:48
This dependency was not found:

* antd/es/theme/style in ./src/layouts/index.jsx

To install it, you can run: npm install --save antd/es/theme/style

ERROR in ./src/layouts/index.jsx
Module not found: Error: Can't resolve 'antd/es/theme/style' in 'G:\NiHon-IT-Training-Plan\React\10_reactBackEndSystem\src\layouts'
 @ ./src/layouts/index.jsx 7:0-29
 @ ./src/.umi/core/routes.ts
 @ ./src/.umi/umi.ts
 @ multi ./node_modules/@umijs/preset-built-in/bundled/@pmmmwh/react-refresh-webpack-plugin/client/ReactRefreshEntry.js ./src/.umi/umi.ts
```
其实一开始有提到有2个依赖都找不到，`npm install antd`后就只剩`antd/es/theme/style`找不到了。按报错给出的解决方案`npm install --save antd/es/theme/style`也没用，提示为
```
npm ERR! code ENOENT
npm ERR! syscall open
npm ERR! path G:\NiHon-IT-Training-Plan\React\10_reactBackEndSystem\antd\es\theme\style/package.jsonnpm ERR! errno -4058
npm ERR! enoent ENOENT: no such file or directory, open 'G:\NiHon-IT-Training-Plan\React\10_reactBackEndSystem\antd\es\theme\style\package.json'
npm ERR! enoent This is related to npm not being able to find a file.
npm ERR! enoent

npm ERR! A complete log of this run can be found in: C:\Users\Toubun\AppData\Local\npm-cache\_logs\2024-01-11T08_32_51_653Z-debug-0.log
```
去到`node_modules`里面也确实找不到这个目录。至此，一直觉得是依赖缺失的问题。后来查到相关的问题讨论，参考[链接1](https://github.com/ant-design/pro-components/issues/6104)和[链接2](https://github.com/montr/montr/issues/1706#issuecomment-1328019807)
因为讨论中似乎提到这个问题的本质应该是
```
theme不是组件，但是babel-plugin-import把它当成组件处理了，所以导致找不到antd/es/theme/style
```
所以我这边给出的解决方案是，在`node_modules/antd/es/theme`目录下创建了名为`style.js`的空文件。。果然顺利运行出来噜！

11. 【已解决】**Layout布局**中设置`#root .ant-layout {height: 100dvh;}` 依然存在滚动条。原因似乎与Chrome等浏览器的动态地址栏有关。使用了推荐的可以动态调整的`dvh`单位后问题依然存在，且Chrome和Edge均存在此问题。后来再检视的时候发现`<body>`标签竟然自带了`margin: 8px`，设0之后就填充满了

12. **侧边栏取数据**中，关于JSON Server，`http://localhost:5000/rights?_embed=children`报错`query._embed?.forEach is not a function`，同时控制台报错`Failed to load resource: the server responded with a status of 500 (Internal Server Error)`；其他的简单判断如`id=`是能够正常运行的
```
C:\Windows\system32>json-server -v
Unknown option '-v'
Usage: json-server [options] <file>

Options:
  -p, --port <port>  Port (default: 3000)
  -h, --host <host>  Host (default: localhost)
  -s, --static <dir> Static files directory (multiple allowed)
  --help             Show this message
  --version          Show version number
```
```
C:\Windows\system32>json-server --version
file:///C:/Users/Toubun/AppData/Roaming/npm/node_modules/json-server/lib/bin.js:60
            const pkg = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf8'));
                                                     ^

ReferenceError: __dirname is not defined in ES module scope
This file is being treated as an ES module because it has a '.js' file extension and 'C:\Users\Toubun\AppData\Roaming\npm\node_modules\json-server\package.json' contains "type": "module". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.
    at args (file:///C:/Users/Toubun/AppData/Roaming/npm/node_modules/json-server/lib/bin.js:60:54)
    at file:///C:/Users/Toubun/AppData/Roaming/npm/node_modules/json-server/lib/bin.js:91:49
    at ModuleJob.run (node:internal/modules/esm/module_job:218:25)
    at async ModuleLoader.import (node:internal/modules/esm/loader:329:24)
    at async loadESM (node:internal/process/esm_loader:34:7)
    at async handleMainPromise (node:internal/modules/run_main:113:12)

Node.js v20.10.0
```
* 将`C:\Users\Toubun\AppData\Roaming\npm\node_modules\json-server\lib`目录下的`bin.js`中涉及`__dirname`的直接写出来
```JavaScript
// --version
if (values.version) {
    const pkg = JSON.parse(readFileSync('C:/Users/Toubun/AppData/Roaming/npm/node_modules/json-server/package.json', 'utf8')); // join(__dirname, '../package.json')
    console.log(pkg.version);
    process.exit();
}
```
得到
```
C:\Windows\system32>json-server -v
Unknown option '-v'
Usage: json-server [options] <file>

Options:
  -p, --port <port>  Port (default: 3000)
  -h, --host <host>  Host (default: localhost)
  -s, --static <dir> Static files directory (multiple allowed)
  --help             Show this message
  --version          Show version number
```
与
```
C:\Windows\system32>json-server --version
1.0.0-alpha.19
```
震惊！`http://localhost:5000/rights?_embed=children`也能正常运行了！所以主要就是个`__dirname`路径问题。。（也去过`C:\Users\Toubun\AppData\Roaming\npm\node_modules\json-server\lib\service.js`里面查看过`embed`等函数的具体情况，是没有问题的，所以其实是因为路径缺失导致找不到了的缘故。。网上基本没有我这个问题的情况，不知道为什么
* 顺便补充，`__dirname`代表当前js文件所在目录的路径(绝对路径)



## 下周计划


