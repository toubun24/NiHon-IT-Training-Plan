package Java.HelloWorld;

public class Compare {
    public static void main(String[] args) {
        /*
        int a = 1;
        double b = 1.0;
        System.out.println(a == b);
        System.out.println(a != b);
        System.out.println(a > b);
        System.out.println(a < b);
        System.out.println(a >= b);
        System.out.println(a <= b);
        */

        int a = 10, b = 20;
        System.out.println(Integer.toBinaryString(a));
        System.out.println(Integer.toBinaryString(b));
        System.out.println(Integer.toBinaryString(a&b));
        System.out.println(Integer.toBinaryString(a|b));
        System.out.println(Integer.toBinaryString(a^b));
        System.out.println(~a);
        System.out.println(Integer.toBinaryString(a<<2));
        System.out.println(Integer.toBinaryString(a>>2));
        System.out.println(Integer.toBinaryString(a>>>2));
    }
}
