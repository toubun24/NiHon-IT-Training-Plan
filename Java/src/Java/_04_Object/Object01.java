package Java._04_Object;

public class Object01 { // 一个.java文件中只能有一个public class
    public String name;
    private int age;
    protected String aaa;
    String bbb;
    class test { // 内部类
        String name;
    }

    public static void main(String[] args) {
        Object01 object01 = new Object01();
        object01.name = "zhangsan";
        object01.age = 111; // private
        object01.aaa = "sss"; // protected
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
        // object01.age = 111; // private
        object01.aaa = "sss"; // protected
    }
}

class bbb{

}