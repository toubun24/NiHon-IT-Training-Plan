# Week 14 Report

## 学习内容及时长

* **2024.03.18 月曜日:** 
  * reactGTS-全局变量 19:45-22:30 00:48-01:06 03:18-04:12
  * reactGTS-窗口滚动条 \

* **2023.03.21 木曜日:** 
  * reactGTS-id权限控制 18:15-19:17 23:02-23:38
  * reactGTS-主题色 23:38-00:11

* **2023.03.22 金曜日:** 
  * reactGTS-登录界面 18:17-19:15
  * reactGTS-五星好评 21:00-22:17
  * reactGTS-报告 22:17-01:05

* **2023.03.23 土曜日:** 

* **2023.03.24 日曜日:** 


## 内容拓展
### redux持久化存储和localStorage持久化存储有什么区别，各自优劣
Redux持久化存储和localStorage持久化存储是两种不同的数据持久化方法，它们之间存在一些关键的区别以及各自的优劣。

Redux持久化存储：

Redux是一个用于JavaScript应用程序的可预测状态容器。其核心思想是通过将应用的状态存储在一个单一的JavaScript对象中，并使用纯函数来修改状态，从而实现可预测性和可维护性。然而，Redux默认并不提供数据持久化的功能，即当应用重新加载或刷新时，之前存储在Redux中的状态会丢失。因此，Redux持久化中间件被开发出来，用于将Redux的状态自动持久化到本地存储中，如浏览器的localStorage或sessionStorage。这样，即使在应用重新加载或刷新后，状态也能被恢复。

优势：

* **状态管理**：Redux提供了强大的全局状态管理能力，使得状态在不同组件间共享变得简单。
* **可预测性**：通过纯函数来修改状态，确保了状态变化的可预测性。
* **灵活性**：Redux持久化中间件可以与各种存储介质配合使用，提供更大的灵活性。

劣势：

* **学习曲线**：Redux及其持久化中间件可能需要一定的学习成本，特别是对于初学者来说。
* **性能开销**：由于需要将状态持久化到存储介质中，可能会引入一定的性能开销。

localStorage持久化存储：

localStorage是Web上的一种本地存储技术，用于在客户端浏览器上永久存储数据。除非用户手动删除相关数据，否则数据会一直存在。它的生命周期是永久的，并且相同域名下的localStorage是共享的，可以读取、清除和覆盖。然而，它仅限于同一浏览器和同源文件，不同浏览器之间不能共享数据。

优势：

* **简单性**：localStorage的API相对简单，易于理解和使用。
* **持久性**：数据存储在本地，除非手动删除，否则会一直存在。
* **共享性**：相同域名下的不同页面或标签页可以共享localStorage中的数据。

劣势：

* **安全性**：localStorage中的数据可以被用户或其他脚本访问和修改，因此可能存在安全隐患。
* **存储限制**：localStorage的存储空间有限，如果存储过多数据可能会影响性能。
* **同源策略**：localStorage受限于同源策略，不同域名下的页面不能共享数据。

综上所述，Redux持久化存储和localStorage持久化存储各有其优缺点。Redux持久化存储更适合于需要全局状态管理和可预测性的场景，而localStorage持久化存储则更适合于简单的数据持久化需求。在选择使用哪种方法时，需要根据具体的应用场景和需求进行权衡。

## 遇见问题
### 【已解决】useEffect测试时`const res = await axios.get(``http://localhost:5000/trades/${params.id}``)`后的`console.log("1")`未显示输出
* 参考文心一言，关于错误处理：如果在 `await` 表达式中发生错误，并且没有适当的 `try...catch` 块来捕获这个错误，那么这个错误可能会导致整个异步函数的剩余部分不被执行，并且不会被传递到 `React` 的错误边界中，除非你在 `useEffect` 中显式地处理了错误

### Umi@3.5.41 AntD@5.13.2 修改主题色不起作用
* 无论是参考AI的写法
```jsx
// npm install less less-loader --save-dev
export default defineConfig({
  // ...
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
});
```
还是参考Umi官方文档的加一句
```jsx
theme: { '@primary-color': '#FFFF00' },
```
都不起作用
