package String;

public class String01 {
    public static void main(String[] args) {
        String a = "hello world";
        String b = """
                {
                    "a":"b",
                    "c":"d"
                }
                """;
        String c = new String ("HELLO WORLD");
        System.out.println(a);
        System.out.println(b);
        System.out.println(c);
    }
}
