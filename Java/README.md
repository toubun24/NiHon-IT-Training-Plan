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
* Java语言中，对于变量，常量，函数，语句块也有名字，我们统统称之为Java标识符，通常由字母和数字以及其它字符构成

### 标识符规范
* 标识符可以以字母[A-Za-z]，美元符号$或下划线_开始
* 首字母后可以是字母、数字、下划线的任意组合
* Java关键字不能当作Java标识符

### 标识符命名约定
* **类和接口名**，首字母大写，如果是俩个单词，第二个单词的首字母大写
* **方法与变量**，首字符小写，其余的首字母大写，含大小写。尽量少用下划线。例如myName
* **常量**，全部字母大写，如果是俩个单词，使用下划线分隔，例如SIZE_NAME

## (06)Java 关键字与保留字

### 关键字
* Java语言中，关键字是特殊意义的固定单词
  * **数据类型**：boolean、int、long、short、byte、float、double、char、class、interface。
  * **流程控制**：if、else、do、while、for、switch、case、default、break、continue、return、try、catch、finally。
  * **修饰符**：public、protected、private、final、void、static、strict、abstract、transient、synchronized、volatile、native。
  * **动作**：package、import、throw、throws、extends、implements、this、supper、instanceof、new

### 保留字
* 保留字是为 Java 预留的关键字，它们虽然现在没有作为关键字。但可能在未来的版本中，将其作为关键字
  * true、false、null、goto、const。

## (07)Java 变量与常量

### 变量
* 变量可以分为三类：**局部变量**、**成员变量（实例变量）**、**静态变量（类变量）**
* 变量是程序中最基本的存储单元,由变量类型,变量名和存储的值组成。
* Java是一种**强类型**语言 ,每个变量都必须声明其数据类型。
* **强类型**：强制数据类型定义，更加严谨安全。所有的变量必须先声明、后使用。指定类型的变量只能接受类型与之匹配的值
#### 局部变量
* 局部变量位于方法或语句块内部，并且仅在声明的方法，语句块中可见
* 程序进入方法、语句块时会创建局部变量，直到执行完方法，语句块时，变量就会消失
* 局部变量没有任何关键字修饰
```
数据类型 标识符;
OR
数据类型 标识符 = 值;
```
#### 成员变量（实例变量）
* 成员变量是指在类体的变量部分中定义的变量，也称为属性，用于存储对象的状态
* 成员变量声明在类的内部，方法外部，对象创建时成员变量也跟着创建，对象消失成员变量也跟着消失
```java
public class HelloWorld {
    //成员变量
    public String name;
    public int age;
}
```
#### 静态变量（类变量）
* 静态变量在类中使用static关键字定义，在方法，语句块之外。
* static 修饰符告诉编译器，无论类被实例化多少次，类变量始终只有一个变量副本。只要类被加载到内存中，它就会存在。
* 随着程序启动时会创建静态变量，程序停止时会销毁静态变量。
```java
public class HelloWorld {
    //静态变量
    public static String name = "zhangsan";;
    public static int age = 18;
}
```

### 常量
* 常量是指在程序的整个运行过程中值保持不变的量，也可以分为三类：**局部常量**、**成员常量（实例变量）**、**静态常量（类变量）**
```java
// final 数据类型 标识符 = 值;
public class HelloWorld {
    //静态常量
    public static final String name = "zhangsan";;
    //成员常量
    final int age = 18;
    public static void main(String[] args) {
        // 局部常量
        final boolean i = true;
    }
}
```

## (08)Java 基本数据类型
* 整数类型、浮点类型、布尔类型、字符类型

### 整数类型
* **字节型byte**类型是最小的整数类型。当用户从网络或文件中处理数据流时，或者处理可能与 Java 的其他内置类型不直接兼容的未加工的二进制数据时，该类型非常有用。
* **短整型short**类型。
* **整型int**类型，常用的一种整数类型。
* **长整型long**：对于超出 int 类型所表示的范围时就要使用 long 类型


### 浮点类型
* 浮点类型是带有小数部分的数据类型，也叫**实型**.浮点型数据包括**单精度浮点型（float）**和**双精度浮点型（double）**。
* 双精度类型 double 比单精度类型 float 具有更高的精度和更大的表示范围。
* 注意：单精度类型float的值必须要以大写字母 F 或小写字母 f 结尾，否则会被当作 double 值。

### 布尔类型
* true 和 false

### 字符类型
* 字符类型（char）表示一个字符。可表示标准的 ASCII 码或 Unicode 字符

## (09)Java 运算符

### 运算符
* 算术运算符
  * 一元运算符
    * `-`: 取反符号
  * 二元运算符
* 赋值运算符
* 逻辑运算符
  > `&&`: 短路与(左边为false则不再执行右边) \
  > `||`: 短路或(左边为true则不再执行右边) \
  > `!`: 逻辑非 \
  > `&`: 逻辑与 \
  > `|`: 逻辑或 \
* 关系运算符
* 位运算符
  * 直接对整数类型的位进行操作，这些整数类型包括 long，int，short，char 和 byte。主要用来对操作数二进制的位进行运算。
  > `&`: 按位进行与运算 \
  > `|`: 按位进行或运算 \
  > `^`: 按位进行异或运算 \
  > `~`: 按位进行取反运算 \
  > `>>`: 有符号右移移运算符 \
  > `<<`: 左移位运算符 \
  > `>>>`: 无符号右移运算符 \
* 补充
  * 三元运算符
  * instanceof: 判断其左边对象是否为其右边类的实例，返回boolean类型的数据。可以用来判断继承中的子类的实例是否为父类的实现。
    ```
    boolean b = (任意对象表达式) instanceof (任意已定义的对象类)
    ```

### 

## (10)Java 运算符优先级
| 优先级 | 运算符 | 关联性 |
|------|-----------------|--------|
| 优先级 | 运算符 | 关联性 |
| 1 | ()、[]、{} | 左到右 |
| 2 | !、-、~、++、-- | 右到左 |
| 3 | *、/、% | 左到右 |
| 4 | +、- | 左到右 |
| 5 | <<、>>、>>>  | 左到右 |
| 6 | <、<=、>、>=、instanceof | 左到右 |
| 7 | ==、!=  | 左到右 |
| 8 | &  | 左到右 |
| 9 | ^  | 左到右 |
| 10 | &#124;  | 左到右 |
| 11 | &&  | 左到右 |
| 12 | &#124;&#124;  | 左到右 |
| 13 | ?: | 右到左 |
| 14 | =、+=、-=、*=、/=  | 右到左 |

## (12)Java 循环

### 循环中断
* `break`：break 用于完全结束一个循环
* `continue`：continue用于跳过循环中剩余的语句而强制执行下一次循环

## (13)Java 字符串与字符串常用方法
* Java字符串属于引用数据类型
* 字符串是由零个或多个字符组成的有限序列

### 字符串定义
* 双引号定义字符串
```
String a = "yes";
```

* 文本块：使用三引号定义一个多行字符串(Java 13 提供的预览特性)
```
String a = """
  Hello
  World
  """;
```

* String 类定义字符串
```
String a = new String("Hello World");
```
### 字符串常用方法
* **字符串拼接**：加法运算符可以将多个字符串进行拼接
* **获取字符串长度**：使用String 类的 `length()`方法可以获取字符串长度
* **截取字符串**：使用String 类的 `substring()`方法可以截取字符串
* **去除首尾空格**：使用String 类的 `trim()`方法可以去除首尾空格
* **字符串替换**：使用String 类的 `replace()`方法可以进行字符串替换
* **根据字符查找字符所在字符串索引**：使用String 类的 `indexOf()`方法和 `lastlndexOf()` 方法可以根据字符查找字符所在字符串索引，`indexOf()`方法为首次出现的索引位置，`lastlndexOf()`方法为最后出现的索引位置

## (14)Java 一维数组
* 数组属于引用数据类型

### 一维数组定义
* 数组中的数据类型可以是基本数据类型和引用数据类型。
* 数组的大小一旦声明就不能再修改
```java
数据类型[] 数组名;
int[] arrayName;
数组名 = new 数据类型[数组长度];
arrayName = new int[5];
OR
数据类型 数组名[];
int arrayName[];
数组名 = new 数据类型[数组长度];
arrayName = new int[5];
OR 简写
数据类型[] 数组名 = new 数据类型[数组长度];
int[] arrayName = new int[5];
```
### 一维数组初始化
* 定义的同时进行数组赋值
  ```java
  数据类型[] 数组名 = {元素1, 元素2, 元素3, 元素n};
  int[] arrayName = {1, 2, 3, 4, 5};
  OR
  数据类型[] 数组名 = new 数据类型[]{元素1, 元素2, 元素3, 元素n};
  int[] arrayName = new int[]{1, 2, 3, 4, 5};
  ```
* 定义后再进行数组赋值
  ```java
  int[] arrayName = new int[5];
  arrayName[0] = 1;
  arrayName[1] = 2;
  arrayName[2] = 3;
  arrayName[3] = 4;
  arrayName[4] = 5;
  ```

### 一维数组取值
* 使用foreach 循环遍历数组
```java
for (int i : arrayName) {
  System.out.println(i);
}
```

## (15)Java 二维数组

### 二维数组定义
* 每个数组元素是一个一维数组
* 数组长度2可为空，表示可变化
```java
数据类型[][] 数组名;
int[][] arrayName;
数组名 = new 数据类型[数组长度1][数组长度2];
arrayName = new int[5][];
OR
数据类型 数组名[][];
int arrayName[][];
数组名 = new 数据类型[数组长度1][数组长度2];
arrayName = new int[5][];
OR
数据类型[][] 数组名 = new 数据类型[数组长度1][数组长度2];
int[][] arrayName = new int[5][];
```

### 二维数组初始化
* 定义的同时进行数组赋值
  ```java
  数据类型[][] 数组名 = {{xx,xx}, {}, {}, {}};
  int[][] arrayName = {{1,2}, {3,4}, {5}};
  OR
  数据类型[][] 数组名 = new 数据类型[][]{{xx,xx}, {}, {}, {}};
  int[][] arrayName = new int[][]{{1,2}, {3,4}, {5}};
  ```
* 定义后再进行数组赋值
  ```java
  int[][] arrayName = new int[3][2];
  arrayName[0][0] = 1;
  arrayName[0][1] = 2;
  arrayName[1][0] = 3;
  arrayName[1][1] = 4;
  arrayName[2][0] = 5;
  ```

### 二维数组取值
* 使用foreach 循环遍历数组
```java
for (int[] ints : arrayName) {
  for (int anInt : ints) {
    System.out.println(anInt);
  }
}
```
* `Arrays.deepToString`
```java
System.out.println(Arrays.deepToString(arrayName))
```

## (16)Java 面向对象概念


## (17)Java 类与对象


## (18)Java 方法


## (19)Java 构造方法


## (20)Java 方法重载


## (21)Java 类封装


## (22)Java 继承


## (23)Java super关键字


## (24)Java 方法重写


## (25)Java final关键字


## (26)Java 多态


## 


## 


## 


## 