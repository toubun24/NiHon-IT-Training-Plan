package Java.HelloWorld;
public class Variable {
    public String name;
    public int age;
    public static int age2 = 20;

    public Variable(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void print(){
        System.out.println(name);
        System.out.println(age);
    }

    public static void main(String[] args) {
        Variable zhangsan = new Variable("zhangsan", 18);
        zhangsan.print();
        System.out.println(age2);
        final String name2 = "lisi";
        System.out.println(name2);
    }
}
