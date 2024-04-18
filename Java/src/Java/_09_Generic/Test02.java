package Java._09_Generic;

public class Test02 {
    public static <T> void printArray(T[] arr) { // 泛型方法
        for (T e : arr) {
            System.out.print(e + " ");
        }
        System.out.println();
    }
    public static void main(String[] args) {
        // 泛型类
        MyClass<String> c1 = new MyClass<String>(); // 在MyClass里加了个构造函数否则报错
        // c1.setData(111);
        c1.setData("sss");
        System.out.println(c1.getData());

        // 泛型方法
        printArray(new Integer[]{1,2,3,4,5}); // 1 2 3 4 5
        printArray(new String[]{"a","b","c"}); // a b c
    }
}
