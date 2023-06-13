package Java.Object;

import java.util.Arrays;

public class Object05 {
    String name;
    int age;

    public Object05() {

    }

    public Object05(String name) {
        this.name = name;
    }

    public Object05(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public static void main(String[] args) {
        Object05 object04 = new Object05();
        object04.change("a", "b", "c", "d");
        object04.change(new String[]{"a", "b", "c", "d"});

        object04.change2(1, 2, "a", "b", "c", "d");
    }

    void print() {
        System.out.println(name);
        System.out.println(age);
    }

    void change(String... a) {
        System.out.println(Arrays.toString(a));
    }

    void change2(int b, int c, String... a) {
        System.out.println(Arrays.toString(a));
    }
}
