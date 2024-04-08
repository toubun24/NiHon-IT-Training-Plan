package Java._04_Object;

public class Object06 {
    public static void main(String[] args) {
        Object05 object05 = new Object05("zhangsan", 18);
        object05.print(); // zhangsan 18

        Object05 object06 = new Object05("zhangsan");
        object06.print(); // zhangsan 0

        Object05 object07 = new Object05();
        object07.print(); // null 0

        Object06 object08 = new Object06();
        object08.eat();
        object08.eat("foodName");
        object08.eat("123", 456);

//        final Person person = new Person();
//        person.setName("123");
//        person.setAge(18);
//        System.out.println(person.getName()); // 123
//        System.out.println(person.getAge()); // 18

        final Student student = new Student("zhangsan",18,"aaa");
        System.out.println(student.getName()); // zhangsan
        System.out.println(student.getAge()); // 18
        System.out.println(student.getSchool()); // aaa

        final Student student2 = new Student();
        student2.setSchool("school2");
        student2.setAge(19);
        student2.setName("name2");
        System.out.println(student2.getName()); // name2
        System.out.println(student2.getAge()); // 19
        System.out.println(student2.getSchool()); // school2

        student2.print(); // zhangsan222 zhangsan222

        final Dog dog = new Dog();
        dog.print(); // 方法重写
    }

    public void eat() {
        System.out.println("eat");
    }

    public void eat(String foodName) {
        System.out.println("eat " + foodName);
    }

    public void eat(String foodName, int num) {
        System.out.println("eat " + foodName + num);
    }
}
