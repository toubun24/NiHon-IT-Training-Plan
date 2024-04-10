package Java._07_Lambda;

public class Test01 {
    public static void main(String[] args) {
        MyInterface myInterface = (a, b) -> { // 省略了int
            return a + b;
        };
        MyInterface myInterface2 = (a, b) -> a+b; // 省略大括号和return
        int calculate = myInterface.calculate(3,5);
        System.out.println(calculate); // 8

        MyInterface myInterface3 = (var a, var b) -> a+b;
        int calculate3 = myInterface3.calculate(3, 3);
        System.out.println(calculate3); // 6

//        MyInterface myInterface4 = a -> a+a; // 只有一个参数可以省略括号
//        int calculate4 = myInterface4.calculate2(3);
//        System.out.println(calculate4);
    }
}
