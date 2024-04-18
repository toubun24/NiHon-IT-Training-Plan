package Java._10_Reflection;

public class Person {
    private String name;
    private int age;
    public Person(){

    }

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    public void sayHello(){
        System.out.println("name"+name+"age"+age);
    }
    public void hello(){
        System.out.println("Person");
    }
}
