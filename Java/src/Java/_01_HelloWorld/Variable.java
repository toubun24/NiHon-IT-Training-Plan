package Java._01_HelloWorld;

public class Variable {
    // 成员变量
    public String name;
    public int age;
    // 静态变量
    public static int age2 = 20;
    public static String testNull;
    public static int test0;

    public Variable(String name, int age) { // 构造函数
        this.name = name;
        this.age = age;
    }

    public void print() {
        System.out.println(name);
        System.out.println(age);
    }

    public static void main(String[] args) {
        // 局部变量
        String name0 = "zhangsan0";
        int age0 = 18, a = 1, b = 2;
        System.out.println(name0);
        System.out.println(age0);
        System.out.println(a);
        System.out.println(b);
        // 成员变量
        Variable zhangsan = new Variable("zhangsan", 18); // 创建对象zhangsan
        zhangsan.print();
        // 静态变量
        System.out.println(age2);
        System.out.println(testNull);
        System.out.println(test0);
        System.out.println(Variable.age2);
        System.out.println(Variable.testNull);
        System.out.println(Variable.test0);
        // 常量
        final String name2 = "lisi";
        System.out.println(name2);
    }
}
