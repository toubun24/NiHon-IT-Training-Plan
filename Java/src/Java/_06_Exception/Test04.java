package Java._06_Exception;

public class Test04 { // 自定义异常
    public static void main(String[] args) {
        try {
            Person john = new Person("john", 17);
            System.out.println(john.getName());
            System.out.println(john.getAge());
        } catch (InvalidAgeException e) {
            // throw new RuntimeException(e);
            System.out.println(e.getMessage()); // 年龄不合法
        }
    }
}
