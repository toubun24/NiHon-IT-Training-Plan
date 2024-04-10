package Java._07_Lambda;

public class Test03 { // 方法引用
    public static void main(String[] args) {
        String a = new String("aaa");
        MyInterface3 myInterface3 = String::new;
        // myInterface3.calculate("sss");
        final String ssss = myInterface3.calculate("SSSS");
        System.out.println(ssss); // SSSS
    }
}
