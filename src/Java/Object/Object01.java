package Java.Object;

public class Object01 {
    public String name;
    private int age;
    protected String aaa;
    String bbb;
    class test {
        String name;
    }

    public static void main(String[] args) {
        Object01 object01 = new Object01();
        object01.name = "zhangsan";
        object01.age = 111;
        object01.aaa = "sss";
        object01.bbb = "ddd";
    }

    void print(){
        System.out.println("new object01");
    }
}

class aaa{
    int age;
    void eat(){
        System.out.println("eat");
    }
    public static void main(String[] args) {
        Object01 object01 = new Object01();
        object01.name = "zhangsan";
        // object01.age = 111;
    }
}

class bbb{

}