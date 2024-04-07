package Java._01_HelloWorld;

public class Compare {
    public static void main(String[] args) {
        /*
        int a = 1;
        double b = 1.0;
        // a == b
        System.out.println(a == b); // true
        System.out.println(a != b); // false
        System.out.println(a > b); // false
        System.out.println(a < b); // false
        System.out.println(a >= b); // true
        System.out.println(a <= b); // true
        */

        int a = 10, b = 20; // 0000 1010, 0001 0100

        System.out.println(Integer.toBinaryString(a)); // 0000 1010
        System.out.println(Integer.toBinaryString(b)); // 0001 0100
        System.out.println(Integer.toBinaryString(a&b)); // 0
        System.out.println(Integer.toBinaryString(a|b)); // 11110
        System.out.println(Integer.toBinaryString(a^b)); // 11110 // 相等为0
        System.out.println(~a); // -11 // 1111 0101
        System.out.println(Integer.toBinaryString(a<<2)); // 101000
        System.out.println(Integer.toBinaryString(a>>2)); // 10
        System.out.println(Integer.toBinaryString(a>>>2)); // 10

        String c = a == 20 ? "Ok" : "False";
        System.out.println(c); // False
        boolean b1 = c instanceof String; // 不能基本数据类型a instanceof String，而应用于判断左边对象是否为其右边类的实例
        System.out.println(b1); // true
    }
}
