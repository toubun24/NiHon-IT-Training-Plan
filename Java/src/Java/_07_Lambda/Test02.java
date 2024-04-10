package Java._07_Lambda;

public class Test02 { // 方法引用
    public static void main(String[] args) {
        // MyInterface2 myInterface2 = a -> System.out.println(a);
        MyInterface2 myInterface2 = System.out::println; // sout // 3
        myInterface2.calculate(3);
    }
}
