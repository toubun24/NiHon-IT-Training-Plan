package Java._09_Generic;

import java.util.ArrayList;
import java.util.List;

public class Test01 {
    public static void main(String[] args) {
        // ArrayList<Object> objects = new ArrayList<>();
//        List o1 = new ArrayList<>();
//        o1.add(111);
//        o1.add("sss");
//        String o = (String) o1.get(0);
//        System.out.println(o); // class java.lang.Integer cannot be cast to class java.lang.String (java.lang.Integer and java.lang.String are in module java.base of loader 'bootstrap')
        ArrayList<Object> objects = new ArrayList<>();
        List<String> o1 = new ArrayList<>();
        // o1.add(111);
        o1.add("sss");
        // String o = (String) o1.get(0); // 不用再转换了
        String o = o1.get(0);
        System.out.println(o); // sss

        List<?> list = new ArrayList<>();
        // list.add("abc"); // 编译错误，无法添加元素
        list.add(null); // 可以添加 null 元素
        Object obj = list.get(0); // 返回的是 Object 类型
        // String str = list.get(0); // 编译错误，需要进行强制类型转换
        String str = (String) list.get(0);
        System.out.println(obj); // null
        System.out.println(str); // null
    }
}
