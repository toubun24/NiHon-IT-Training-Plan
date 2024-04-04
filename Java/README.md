# JAVA

## (01)Java介绍

### JDK & JRE
* **JRE**：Java Runtime Environment （Java 运行时环境）
  * JRE包括Java虚拟机（Java Virtual Machine，JVM），以及 Java 平台核心类和基础 Java 平台库；通过 JVM 才能在电脑系统执行 Java 应用程序（Java Application）
* **JDK**：Java Development Kit （Java 开发工具包）
  * JDK 是 JRE 的超集，包含 JRE 的所有内容，以及开发小程序和应用程序所需的工具，例如编译器和调试器

### 自动垃圾回收（Garbage Collection）
* Java中对象的创建和放置都是在存储器堆栈上面进行
* 当一个对象没有任何引用的时候，Java的自动垃圾收集机制就发挥作用，自动删除这个对象所占用的空间，释放存储器以避免存储器泄漏
* 而在常规语言例如C++，程序员必须确保已分配的内存被释放。防止造成内存泄漏的麻烦
* 不同厂商、不同版本的JVM中的存储器垃圾回收机制并不完全一样，通常越新版本的存储器回收机制越快