package Java._06_Exception;

public class Test01 {
    public static void main(String[] args) {
//        String a = null;
//        System.out.println(a.substring(1)); // Exception in thread "main" java.lang.NullPointerException: Cannot invoke "String.substring(int)" because "a" is null
//        System.out.println("aaa"); // 不执行
        try {
            String a = null;
            System.out.println(a.substring(1)); // Exception in thread "main" java.lang.NullPointerException: Cannot invoke "String.substring(int)" because "a" is null
            // System.out.println("aaa");
        } catch (NullPointerException e) {
            e.printStackTrace();
        } catch (Exception e2) {
            System.out.println("e2");
        } finally {
            System.out.println("aaa"); // aaa
        }
    }
}
