package Java.HelloWorld;

public class Math {
    public static void main(String[] args) {
        int a = 10;
        int b = 20;
        System.out.println(++a); // 11
        System.out.println(b--); // 20
        System.out.println(-b); // -19

        int c = 30;
        System.out.println(a + b);
        System.out.println(b - a);
        System.out.println(a * b);
        System.out.println(a * 1.0 / b);
        System.out.println(b % c);
    }
}
