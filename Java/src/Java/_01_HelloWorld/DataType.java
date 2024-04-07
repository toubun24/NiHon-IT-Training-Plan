package Java._01_HelloWorld;

public class DataType {
    public static void main(String[] args) {
        // 整数类型
        byte a = 10; // 字节型
        short b = 20; // 短整型
        int c = 30; // 整型
        long d = 40; // 长整型
        System.out.println(Byte.MAX_VALUE); // 127
        System.out.println(Short.MAX_VALUE); // 32767
        System.out.println(Integer.MAX_VALUE); // 2147483647
        System.out.println(Long.MAX_VALUE); // 9223372036854775807

        // 浮点类型
        float e = 10.0f; // 单精度浮点型
        // float e2 = (float)10; // 单精度浮点型
        // float e3 = 10.0; // 双精度浮点型
        double f = 20.0D; // 双精度浮点型
        System.out.println(e);
        System.out.println(f);

        // 布尔类型
        boolean g = true;
        boolean h = false;

        // 字符类型
        char i = 73; // I
        char j = 'J';
        System.out.println(i); // I
        System.out.println(j);
    }
}
