package Java.Object;

import java.util.Arrays;

public class Object05 {
    public static void main(String[] args) {
        Object05 object04 = new Object05();
        object04.change("a", "b", "c", "d");
        object04.change(new String[]{"a", "b", "c", "d"});

        object04.change2(1, 2, "a", "b", "c", "d");
    }

    void change(String... a) {
        System.out.println(Arrays.toString(a));
    }

    void change2(int b, int c, String... a) {
        System.out.println(Arrays.toString(a));
    }
}
