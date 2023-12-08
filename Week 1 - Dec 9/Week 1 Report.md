## 笔记：

1. **软件工程和计算机科学的区别:** 前者关注点在通过设计软件以解决实际问题，后者则是偏向理论研究；前者的工作内容通常需要团队协作，也因此会涉及到科学的管理方法等，而后者则能够独立进行研究

2. **敏捷开发:** 建立能解决不可预测性的过程

3. **敏捷开发代表工具:** Jira, OnTime, UML, Together Tool Set

4. **Sprint:**
* Sprint Planning: 安排工作以启动
* Daily Scrum: 检视进展，调整适应Sprint Backlog及计划
* Sprint Review: 检视成果，确定未来适应性，展示工作结果，讨论Product Goal进展情况
* Retrospective: 规划提高质量和效能的方法

5. **Scrum工件:**
* Product Backlog: 涌现的和有序的清单，列出改进产品所需的内容，为承担工作的唯一来源
  * Product Goal: 描述产品未来状态，可作为制定计划的目标
* Sprint Backlog: 
  * Sprint Goal: 目标
* Increment:
  * Definition of Done

6. **计算机网络:**
* OSI 7层划分：物理层，数据链路层，网络层(ip协议，icmp协议)，传输层(TCP，UDP)，会话层，表示层，应用层(http，ftp，smtp)
* TCP/IP 4层划分：网络接口层，网络层，传输层，应用层

7. **Linux ls:**
    > bin: 二进制可执行文件 \
	dev: 设备文件 \
	home: 用户文件 \
	root: 超级用户目录 \
	usr: 共享系统资源 \
	boot: 系统引导时所使用的文件 \
	etc: 系统配置 \
	mnt: 系统管理员安装临时文件 \
	tmp: 临时文件 \
	var: 运行时需要改变数据的文件

8. **Linux drw:**
	> d: 目录 \
	r: 读权限 \
	w: 写权限 \
	x: 可执行 \
	r-x: 可读可执行不可写 \
	(文件所有者权限，文件所属组权限，其他用户权限)

9. **Git:**
* HEAD: 指向当前分支当前版本的游标
* Index: 暂存区，当修改了git仓库里的一个文件时，这些变化一开始是unstaged状态，为了提交这些修改，需要使用git add把它加入到index，使它成为staged状态。当提交一个commit时，index里面的修改被提交。
* Working tree: 当前的工作目录。

10. **JavaWeb架构:**
* C/S: Client/Server
* B/S: Browser/Server

11. **B/S架构资源分类:**
* 动态资源：使用动态网页及时发布的资源
* 静态资源：
  * HTML: 用于搭建基础网页，展示页面的内容
  * CSS: 用于美化页面，布局页面
  * JavaScript: 控制页面的元素，有动态的效果

12. **HTML(Hyper Text Markup Language 超文本标记语言)文件标签:**
  > html: html文档的根标签 \
	head: 头标签，用于指定html文档的一些属性，引入外部的资源 \
	title: 标题标签 \
	body: 体标签 \
	`<!DOCTYPE html>`: html5中定义该文档是html文档

13. **HTML文本标签:**
	> 注释：`<!-- 注释内容 -->` \
	`<h1>` to `<h6>`: 标题标签，h1~h6字体大小逐渐递减 \
	`<p>`: 段落标签 \
	`<br>`: 换行标签 \
	`<hr>`: 展示一条水平线

	属性：
	> color: 颜色 \
	width: 宽度 \
	size: 高度 \
	align: 对齐方式 (center, left, right)
	
	> `<b>`: 字体加粗 \
	`<i>`: 字体斜体 \
	`<font>`: 字体标签 \
	`<center>`: 文本居中

	属性：
	> color: 颜色 \
	size: 大小 \
	face: 字体
 
14. **JavaScript数据类型:** number, string, boolean, null, undefined
* string转number：按照字面值转换，如果字面值不是数字，则转为NaN
* 字符串比较：按位按照字典顺序比较，越靠后越大，直到得出大小为止
* `===`: 全等于，在比较之前，先判断类型，如果类型不一样则直接返回false
* `&&`: 与前false则不会再计算与后的部分
	
* 其他类型转boolean:
  	> number: 0 \
		string: 除了空字符串("")，其他都是true \
		null&undefined: false \
		对象：所有对象都会true
	
* 防止空指针异常：`if(obj != null && obj.length>0)`或直接`if(obj)`

15. **JavaScript函数:**
* arguments: 内置对象，会把传递到函数中的实参封装成数组，可利用如`arguments.length`来判断输出实参数量

## 感想：

1. 创建EC2 instance时很多界面都和视频中的界面不一致，应该是官网版本更新所致；大部分都是默认设置，只要重点关注到SSH设置、密钥设置等即可

2. 使用XShell 7时默认用户为ec2-user，通过sudo su root可切换至root权限

3. Git本地修改后未add提交至Index的内容直接可以checkout恢复；本地修改且add后的内容则还需要reset HEAD来重置取消暂存的变更后再checkout

4. Git克隆仓库时，git clone https...会要求输入账号密码（正确输入后应该也能成功）；但因为配置了SSH密钥的缘故，想直接用这种方式进行连接，参考网上的办法输入了ssh -T git@github.com并yes确认，在没有输入账号密码的情况下利用SSH密钥显示成功登入，并在之后使用git clone git...的链接进行连接，而非https...；结果课件中进行到git push时，依然被要求输入账密，并被告知推荐使用personal access token进行连接，而我这边则是没有这一步骤了

5. 
