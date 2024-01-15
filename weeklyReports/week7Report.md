# Week 5 Report

## 学习内容及时长

* **2024.01.15 月曜日:** 
  * 登录界面 13:40-14:45 14:50-15:10

* **2023.01.16 火曜日:** 

* **2023.01.17 水曜日:** 

* **2023.01.18 木曜日:** 

* **2023.01.19 金曜日:** 

* **2023.01.20 土曜日:** 

* **2023.01.21 日曜日:** 


  * 软件工程师常用日本语中级上 (P96-P100) 
  * 登录权限优化 
  * 登录路由权限控制优化 
  * 撰写新闻布局 
  * 撰写新闻逻辑实现 
  * 草稿箱实现(上) 
  * 草稿箱实现(下) 
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