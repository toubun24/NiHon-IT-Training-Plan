# Week 5 Report

## 学习内容及时长

* **2024.01.15 月曜日:** 
  * 登录界面 13:40-14:45 14:50-15:15 18:25-21:35
  * 登录权限优化 22:30-23:35

* **2023.01.16 火曜日:** 
  * 软件工程师常用日本语中级上 (P96-P100) 17:30-17:48
  * 日语影子跟读初中级Unit4 17:48-18:00
  * 登录权限优化 18:00-19:25
  * 撰写新闻布局 19:45-21:50 23:05-23:30 01:40-02:05
  * 登录路由权限控制优化 02:25-02:35
  * 撰写新闻逻辑实现 02:35-02:50 

* **2023.01.17 水曜日:** 
  * 撰写新闻逻辑实现 11:00-11:20 11:30-12:00
  * 草稿箱实现(上) 13:25-14:50 18:20-18:40
  * 草稿箱实现(下) 18:40-20:00
  * 登录路由权限控制优化 21:25-22:05

* **2023.01.18 木曜日:** 
  * 审核列表实现 17:10-17:45 17:55-18:50
  * 审核新闻实现 19:50-20:45
  * 新闻分类实现 
  
* **2023.01.19 金曜日:** 

* **2023.01.20 土曜日:** 

* **2023.01.21 日曜日:** 



  * 审核列表实现 
  * 审核新闻实现 
  * 新闻分类实现 
  * 发布管理 
  * 侧边栏折叠功能 
  * 首页布局 
  * 首页完善 
  * 新闻浏览页面 


## 学习笔记


## 内容拓展
### yarn与npm的区别
* npm的缺点
  * 当新建一个项目需要执行npm inatall的时候速度太慢
  * 对于同一个项目，不同的人在安装的时候无法保证模块版本的一致性。****
* yarn的优点
  * 安装速度快：因为yarn缓存每一个下载过的包，所以再次使用时无需重复下载。同时利用并行下载以最大化资源利用率，因此安装速度更快。
  * 安全性较高：在执行代码之前，yarn会通过算法校验每个安装包的完整性。这个是npm所没有的。
  * 可靠性强：使用详细，间接的锁文件格式和明确的安装算法，yarn能够保证在不同系统上无差异的工作


## 遇见问题

### 引入tsparticles相关依赖报错"Module parse failed: Unexpected token. You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders"
* 报错位置：引入依赖的应该是所有源文件的`?.`可选链操作符、`??`空值合并操作符处
* 问题产生：只要`import Particles, { initParticlesEngine } from "@tsparticles/react"`(@3.0.0)或`import Particles from "react-tsparticles"`(@2.12.2)，`import { loadFull } from "tsparticles"`(@2.0.6)或`import { loadSlim } from "@tsparticles/slim"`(@3.1.0)，哪怕不写其它相关的具体代码，都会报此错误；然而同时，src目录下的文件则可以正常使用相关操作符
* 稳定版本：尝试直接复现采用了稳定版本的示例代码，`npm i`安装全部依赖并对示例代码的`package.json`核对后版本安装无误，随后`npm start`报错
```
node:internal/crypto/hash:68
  this[kHandle] = new _Hash(algorithm, xofLen);
                  ^

Error: error:0308010C:digital envelope routines::unsupported

{
  opensslErrorStack: [ 'error:03000086:digital envelope routines::initialization error' ],
  library: 'digital envelope routines',
  reason: 'unsupported',
  code: 'ERR_OSSL_EVP_UNSUPPORTED'
}

Node.js v20.10.0
```
这是一个以前发生过的问题，直接采用现成的解决方案，在`package.json`中将`"start": "umi dev`修改为`"start": "SET NODE_OPTIONS=--openssl-legacy-provider && umi dev"`即可，随后依然对tsparticles相关依赖报错
```
Module parse failed: Unexpected token. You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
```
也就是说，肯定是我本地有什么问题。。
* 操作符复现示例输出正常
```HTML
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>hello_react</title>
</head>

<body>
    <div id="test"></div>
    <script>
        // 空值合并操作符用于选择性地提供默认值，仅当变量的值为 null 或 undefined 时，才返回提供的默认值。否则，它将返回变量的实际值
        const foo = null ?? 'default string';
        console.log(foo); // default string
        // 可选链操作符允许您在访问对象属性或调用函数时，检查中间的属性是否存在或为 null/undefined。如果中间的属性不存在或为空，表达式将短路返回 undefined，而不会引发错误
        const adventurer = { name: 'Alice', cat: { name: 'Dinah' } };
        const dogName = adventurer.dog?.name;
        console.log(dogName); // undefined
    </script>
</body>

</html>
```
* 以前一直以为`npm`和`yarn`没什么区别，都不过只是个下载器而已，去搜了才发现`yarn`的好处还是很多的，虽然好像也有不那么适合使用的场景；总之这次是尝试使用`yarn`去安装依赖，看一下是不是依赖安装上出现的问题。已经全局安装过`yarn`了，在`yarn install`后`yarn start`，首先又报了`opensslErrorStack: error:03000086`的错，依然是给`start`项加上一句后重新`yarn start`，但是操作符报错依然存在；`yarn --version: 1.22.21`，也去查了一下，`yarn`的v2v3好像对`node_modules`有很大的改动，如果还是在`node_modules`这一框架下的话那现在用的v1应该不至于是报操作符错误的罪魁祸首
* 也顺便补充随便找的一条完整报错信息，不知道会不会有所帮助
```
ERROR in ./node_modules/tsparticles-engine/esm/Utils/HslColorManager.js 9:67
Module parse failed: Unexpected token (9:67)
You may need an appropriate loader to handle this file type, currently no loaders are configured to 
process this file. See https://webpack.js.org/concepts#loaders
|     }
|     handleColor(color) {
>         const colorValue = color.value, hslColor = colorValue.hsl ?? color.value;
|         if (hslColor.h !== undefined && hslColor.s !== undefined && hslColor.l !== undefined) {   
|             return hslToRgb(hslColor);
 @ ./node_modules/tsparticles-engine/esm/init.js 2:0-58 6:73-88
 @ ./node_modules/tsparticles-engine/esm/index.js
 @ ./node_modules/tsparticles-interaction-external-trail/esm/Options/Classes/Trail.js
 @ ./node_modules/tsparticles-interaction-external-trail/esm/index.js
 @ ./node_modules/tsparticles/esm/index.js
 @ ./src/pages/login.jsx
 @ ./src/.umi/core/routes.ts
 @ ./src/.umi/umi.ts
 @ multi ./node_modules/umi/node_modules/@umijs/preset-built-in/bundled/@pmmmwh/react-refresh-webpack-plugin/client/ReactRefreshEntry.js ./src/.umi/umi.ts
```
像这样的报错还有很多，指向则都包含`??`和`?.`这些操作符，包则都出自`tsparticles`
* 刚刚突然想到把给的那一小段测试操作符代码贴到其它有用到的依赖里面去会怎么样（因为我好奇其他依赖里面是否也使用过这些操作符，用过的话为什么不报错）找了个肯定会调用到的`...\node_modules\react\index.js`文件
```JavaScript
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/react.production.min.js');
} else {
  module.exports = require('./cjs/react.development.js');
}
```
添加成了以下片段（这个片段在src里面的文件里，比如`login.jsx`，也添加过是可以正常运行的）
```JavaScript
if (process.env.NODE_ENV === 'production') {
  const foo = null ?? 'default string';
  console.log(foo); // default string
  const adventurer = { name: 'Alice', cat: { name: 'Dinah' } };
  const dogName = adventurer.dog?.name;
  console.log(dogName); // undefined
  module.exports = require('./cjs/react.production.min.js');
} else {
  const foo = null ?? 'default string';
  console.log(foo); // default string
  const adventurer = { name: 'Alice', cat: { name: 'Dinah' } };
  const dogName = adventurer.dog?.name;
  console.log(dogName); // undefined
  module.exports = require('./cjs/react.development.js');
}
```
令人意想不到的事发生了：为了先运行通过，`tsparticles`相关内容已经暂时被注释掉了，所以原本是可以正常运行的，加入测试代码后，报错
```
ERROR in ./node_modules/react/index.js 4:20
Module parse failed: Unexpected token (4:20)
You may need an appropriate loader to handle this file type, currently no loaders are configured to 
process this file. See https://webpack.js.org/concepts#loaders
|
| if (process.env.NODE_ENV === 'production') {
>   const foo = null ?? 'default string';
|   console.log(foo); // default string
|   const adventurer = { name: 'Alice', cat: { name: 'Dinah' } };
 @ ./node_modules/@umijs/runtime/dist/index.esm.js 4:0-98 224:35-48 294:22-35 353:18-28 355:4-23 372:26-39 386:46-56 565:30-43 569:30-43 569:83-96 573:26-39
 @ ./src/.umi/umi.ts
 @ multi ./node_modules/@umijs/preset-built-in/bundled/@pmmmwh/react-refresh-webpack-plugin/client/ReactRefreshEntry.js ./src/.umi/umi.ts
```
刷新网页后报错并自动中断终端（这个先报操作符错误然后对网页进行刷新后中断进程并报错的内容和一开始也是一样的，只是这里为了完整性也再贴一次（且之后关闭网页和VSCode重新打开并编译也直接报错了根本进不了网页更不用说出现这个刷新网页的报错了，但这个应该问题不大，因为我可能是一开始运行正常的情况下故意加入测试代码然后报错并刷新才会出现这个报错）
```
node:internal/process/promises:289
            triggerUncaughtException(err, true /* fromPromise */);
            ^

AssertionError [ERR_ASSERTION]: chunk of umi not found.
    at G:\NiHon-IT-Training-Plan\React\10_reactBackEndSystem\node_modules\@umijs\preset-built-in\lib\plugins\commands\htmlUtils.js:104:27
    at Array.forEach (<anonymous>)
    at chunksToFiles (G:\NiHon-IT-Training-Plan\React\10_reactBackEndSystem\node_modules\@umijs\preset-built-in\lib\plugins\commands\htmlUtils.js:93:14)
    at G:\NiHon-IT-Training-Plan\React\10_reactBackEndSystem\node_modules\@umijs\preset-built-in\lib\plugins\commands\htmlUtils.js:189:32
    at Generator.next (<anonymous>)
    at asyncGeneratorStep (G:\NiHon-IT-Training-Plan\React\10_reactBackEndSystem\node_modules\@umijs    at _next (G:\NiHon-IT-Training-Plan\React\10_reactBackEndSystem\node_modules\@umijs\preset-built-in\lib\plugins\commands\htmlUtils.js:64:194)
    at processTicksAndRejections (node:internal/process/task_queues:95:5) {
  generatedMessage: false,
  code: 'ERR_ASSERTION',
  actual: undefined,
  expected: true,
  operator: '=='
}

Node.js v20.10.0
```
但总而言之，问题不再在于粒子包了，而是只要是依赖里面出现相关操作符就会报错，之前没有报错应该只是其他依赖包正好都没用到这个操作符（虽然一开始我预想的是既然有这么多依赖，不至于其他包正好全都没用过这个操作符吧，所以一开始没往这方面去想）
* 震惊！居然答案就藏在我之前看过的一个[链接](https://blog.csdn.net/weixin_45717984/article/details/125005282)里的第一条
```
问题原因：
因为导入的组件库是直接上源码的，必须告知webpack，需要编译一下这个库，让源码中的es6、es7的特性转换为es5

解决方案：
1.在vue.config.js 里面加上transpileDependencies: [‘/@yabby-business/’]
...
```
但我看第一条是Vue的，那会儿刚开始debug，不觉得这个可能性有多大，就跳过了，转而去研究“相对更熟悉”的babel啊什么的方法去了；刚刚重新搜到这个网页，一看就觉得很对症，然后虽然umi里确实搜不到`transpileDependencies`，但去umi官方文档搜`转译`就找到了相关设置[链接](https://v3.umijs.org/config#nodemodulestransform)
```
nodeModulesTransform 3.1+
Type: object
Default: { type: 'all' }
设置 node_modules 目录下依赖文件的编译方式。

子配置项包含：

type，类型，可选 all 和 none
exclude，忽略的依赖库，包名，暂不支持绝对路径
两种编译模式，

默认是 all，全部编译，然后可以通过 exclude 忽略不需要编译的依赖库；
可切换为 none，默认值编译 es5-imcompatible-versions 里声明的依赖，可通过 exclude 配置添加额外需要编译的；
前者速度较慢，但可规避常见的兼容性等问题，后者反之。
```
回头一看，`.umirc.ts`中`nodeModulesTransform`居然默认是`type: 'none'`，也就是说。。
```JavaScript
nodeModulesTransform: {
    type: 'all',
    exclude: [],
  },
```
那么为什么不采用
```JavaScript
nodeModulesTransform: {
    type: 'none',
    exclude: ['react-tsparticles', 'tsparticles'],
  },
```
因为。。虽然只下载了2个依赖，但`node_modules`里还构建了一堆`tsparticles-XXX`的目录，这些目录文件夹名称不一样，需要一个个去指定的话有几十条。。我在考虑能不能用正则化的方式批量指定？查了下，除非先创个很长的列表把所有名字都放进去再拆成分段的字符串数组，而好像没有办法让一个数据的内容去自动匹配一样，除非去修改`nodeModulesTransform`的函数，让`exclude`的匹配方式改变？

### 退出登录(token为空)的情况下网页打开报错"SyntaxError: Unexpected end of JSON input"
```
SyntaxError: Unexpected end of JSON input
MyDropdown
./src/components/myDropdown.jsx:9
   6 | const MyDropdown = () => {
   7 |   const history = useHistory(); // history
   8 |   // console.log('dorp-token',token)
>  9 |   const { role: { roleName }, username } = JSON.parse(localStorage.getItem('token'))
  10 |   const items = [
  11 |     {
  12 |       key: '1',
```
这是因为退出登录后`token`为空，`localStorage.getItem('token')`取到并传递给`JSON.parse`的值也为空，但`JSON.parse`不允许接受空值。所以将
```JavaScript
const { role: { roleName }, username } = JSON.parse(localStorage.getItem('token'))
```
修改为
```JavaScript
const tokenContent = localStorage.getItem('token');
const { role: { roleName }, username } = tokenContent == '' ? { role: { roleName: '' }, username: "" } : JSON.parse(tokenContent)
```
顺便注意，一开始我是采用的`if-const`结构，但这也是不合法的，因为`const`只在`if`块内生效

### "登录权限优化"中，侧边栏展示权限在切换用户进入界面后还保留着上一个用户的界面权限，需要刷新之后才能展示出正确权限的侧边栏内容，且控制台Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function
```
devScripts.js:6523 Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
    at Overflow (http://localhost:8000/umi.js:135555:32)
    at InheritableContextProvider (http://localhost:8000/umi.js:132409:23)
    at http://localhost:8000/umi.js:130947:29
    at http://localhost:8000/umi.js:86964:66
    at http://localhost:8000/umi.js:86872:69
    at div
    at div
    at div
    at aside
    at http://localhost:8000/umi.js:85445:34
    at MySider (http://localhost:8000/umi.js:229687:24)
    at div
    at http://localhost:8000/umi.js:85799:76
    at Layout
```
结果是不小心把
```JavaScript
const tokenContent = localStorage.getItem('token');
const { role: { rights } } = tokenContent == '' ? { role: { rights: '' } } : JSON.parse(tokenContent)
const checkPagePermission = (item) => {
  return item.pagepermission && rights.checked.includes(item.key)
}
```
写在函数组件外部了，导致了错误的调用顺序
* 但警告依然存在，会在退出登录时进行提示，也就是如字面意思卸载组件的时候会有这个问题，留到以后再优化

### AntD PageHeader Module not found
`PageHeader`相关的`Module not found`报错一连串，比如
```
ERROR in ./node_modules/@ant-design/pro-layout/es/components/PageContainer/index.js
Module not found: Error: Can't resolve 'antd/es/page-header' in 'G:\NiHon-IT-Training-Plan\React\10_reactBackEndSystem\node_modules\@ant-design\pro-layout\es\components\PageContainer'
 @ ./node_modules/@ant-design/pro-layout/es/components/PageContainer/index.js 7:0-46 180:19-30        
 @ ./node_modules/@ant-design/pro-layout/es/index.js
 @ ./src/pages/news-manage/add.jsx
 @ ./src/.umi/core/routes.ts
 @ ./src/.umi/umi.ts
 @ multi ./node_modules/@umijs/preset-built-in/bundled/@pmmmwh/react-refresh-webpack-plugin/client/ReactRefreshEntry.js ./src/.umi/umi.ts
```
首先在官方文档里搜不到直接给出的`PageHeader`使用方法了，查看[官方文档](https://ant-design.antgroup.com/docs/react/migration-v5-cn#%E7%BB%84%E4%BB%B6%E9%87%8D%E6%9E%84%E4%B8%8E%E7%A7%BB%E9%99%A4)，回头确认`package.json`，果然是antd5.x，也就是说要用新的引入方法调用`PageHeader`
```JavaScript
- import { PageHeader } from 'antd';
+ import { PageHeader } from '@ant-design/pro-layout';
  const App: React.FC = () => (
    <>
      <PageHeader />
    </>
  );
  export default App;
```
但是照此方法引用报了以上的错，参照报错去`node_modules`，无论是在`@ant-design`还是在`antd`的对应子目录下均找不到`PageHeader`相关内容，只有个`PageContainer`有点关系，但调用它依然会报错
* 尝试把示例代码`node_modules`里antd4.x的`PageHeader`复制进来，果然还是行不通x然后想到会不会是@ant-design/pro-layout@6.x和antd@5.x的版本不对应，一查果然@ant-design/pro-layout已经更新到了@7.x，但默认安装不知道为什么是安装的@6.x，于是手动安装`npm i @ant-design/pro-layout@7.17.16`，果然@ant-design/pro-layout目录下出现了`PageHeader`，按新版的调用也就成功了
* **下次做大项目直接按示例的node_modules来做了，再也不自己从零配环境了呜嗷**

### 登录或退出登录时网页加载缓慢，进度条基本卡住不动，刷新网页后报错"Error: Rendered more hooks than during the previous render."，再次刷新后又正常进入目标页面并正常显示内容
* 完整报错信息为
```
Error: Rendered more hooks than during the previous render.
▶ 5 stack frames were collapsed.
App
./src/layouts/index.jsx:23
  20 | if (props.location.pathname === '/login' || props.location.pathname === '/login/') {
  21 |   return <div>{props.children}</div> // 离开后台界面回到登录页面
  22 | }
> 23 | const [collapsed, setCollapsed] = useState(false); // useState
     | ^  24 | const {
  25 |   token: { colorBgContainer, borderRadiusLG },
  26 | } = theme.useToken();
View compiled
▶ 19 stack frames were collapsed.
(anonymous function)
./modules/Router.js:34
  31 | if (!props.staticContext) {
  32 |   this.unlisten = props.history.listen(location => {
  33 |     if (this._isMounted) {
> 34 |       this.setState({ location });
     | ^  35 |     } else {
  36 |       this._pendingLocation = location;
  37 |     }
View compiled
▶ 7 stack frames were collapsed.
(anonymous function)
./src/pages/login.jsx:29
  26 |       message.error('登录失败')
  27 |     } else {
  28 |       localStorage.setItem('token', JSON.stringify(res.data[0]))
> 29 |       history.push('/home')
     | ^  30 |     }
  31 |   }
  32 | )
```
参考[链接](https://www.jb51.net/article/268993.htm)，应该与钩子函数的位置和使用方式有关
  * 只从React函数组件或自定义钩子中调用Hook
  * 只在最顶层使用Hook
  * 不要在循环，条件或嵌套函数中调用Hook
  * 确保总是在React函数的最顶层以及任何return之前使用Hook
这有助于React在多个useState和useEffect调用之间保留钩子的状态