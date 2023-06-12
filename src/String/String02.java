package String;

public class String02 {
    public static void main(String[] args) {
        String a = "hello world" + "!" + 222;
        String b = "   hello world   "+"!";

        System.out.println(a);
        System.out.println(a.length());
        System.out.println(a.substring(1));
        System.out.println(a.substring(1,5));
        System.out.println(b);
        System.out.println(b.trim());
        System.out.println(a.replace("hello","nihao"));
        System.out.println(a.indexOf("l")); // 2
        System.out.println(a.lastIndexOf("l")); // 9
    }
}
