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

## (03)Java HelloWorld

### HelloWorld
```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}
```
> public：表示这个类是公开的 \
> class：表示类的意思 \
  > public 和 class 是 Java 中的关键字须小写 \
> HelloWorld：表示类名 \
  > 注意:文件名须与类名同名(区分大小写),通常类名以大写字母开头 \
> {}中的内容为类的定义 \
> main方法：Java 程序的固定入口方法 \
  > public：表示方法是公开的 \
  > static：表示方法是静态的 \
  > void：表示方法的返回类型为void \
  > String[]：表示参数的类型 \
  > args：表示参数的名称 \

## (04)Java 注释

### 注释
* 文档注释和多行注释的作用基本相同，唯一的区别是文档注释可以使用javadoc命令生成文档
```java
/**
  *文档注释
*/
```

### 生成JavaDoc
* Tool-Generate JavaDoc-Output directory-Command line arguments: "-encoding UTF-8"-Generate

## (05)Java 标识符




## (06)Java 关键字与保留字


## (07)Java 变量与常量


## (08)Java 基本数据类型


## (09)Java 运算符


## (10)Java 运算符优先级


## 