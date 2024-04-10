package Java._07_Lambda;

import java.util.ArrayList; // import
import java.util.Comparator;

public class Test04 {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<>(); // import java.util.ArrayList;
        names.add("John");
        names.add("Mary");
        names.add("Bob");
        names.add("Alice");
        System.out.println(1);
        System.out.println(names); // [John, Mary, Bob, Alice]

        // 使用匿名内部类排序
        names.sort(new Comparator<String>() { // import java.util.Comparator;
            @Override
            public int compare(String a, String b) {
                return a.compareToIgnoreCase(b); // 忽略大小写比较
            }
        });
        System.out.println(2);
        System.out.println(names); // [Alice, Bob, John, Mary]

        // 使用Lambda表达式排序
        names.sort((a, b) -> a.compareToIgnoreCase(b));
        System.out.println(3);
        System.out.println(names); // [Alice, Bob, John, Mary]

        // 使用方法引用排序
        names.sort(String::compareToIgnoreCase);
        System.out.println(4);
        System.out.println(names); // [Alice, Bob, John, Mary]

    }
}