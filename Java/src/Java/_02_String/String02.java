package Java._02_String;

public class String02 {
    public static void main(String[] args) {
        String a = "hello world" + "!" + 222;
        String b = "   hello world   "+"!";

        System.out.println(a); // hello world!222
        System.out.println(a.length()); // 15
        System.out.println(a.substring(1)); // ello world!222
        System.out.println(a.substring(1,5)); // ello
        System.out.println(b); //    hello world   !
        System.out.println(b.trim()); // hello world   !
        System.out.println(a.replace("hello","nihao")); // nihao world!222
        System.out.println(a.indexOf("l")); // 2
        System.out.println(a.lastIndexOf("l")); // 9
    }
}
