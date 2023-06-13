package Java.Object;

import java.util.Arrays;

public class Object04 {
    public static void main(String[] args) {
        int a = 1;
        Object04 object04 = new Object04();
        object04.change(a); // 2
        System.out.println(a); // 1

        String[] b = {"a"};
        object04.change2(b); // b
        System.out.println(Arrays.toString(b)); // b

        String c = new String("a");
        object04.change3(c); // c
        System.out.println(c); // a
    }

    void change(int a){
        ++a;
        System.out.println(a);
    }

    void change2(String[] b){
        b[0] = "b";
        System.out.println(Arrays.toString(b));
    }

    void change3(String c){
        c = new String ("c");
        System.out.println(c);
    }
}
