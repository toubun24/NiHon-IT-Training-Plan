package Java._11_IO;

import java.io.Serializable;

public class Person2 implements Serializable { // 对象流2-序列化版本控制
    private String name;
    private int age;
    // private String password; // new
    private transient String password; // 对象流3-避免序列化不必要的属性 // transient
    private static final long serialVersionUID = 11112L; // 保持不变修改Person2则新增项为null，修改ID则运行不通过

    // public Person2(String name, int age) {
    public Person2(String name, int age, String password) {
        this.name = name;
        this.age = age;
        this.password = password; // new
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }

    public String getPassword() { // new
        return password;
    }

//    @Override
//    public String toString() {
//        return "Person2{" +
//                "name='" + name + '\'' +
//                ", age=" + age +
//                '}';
//    }
    @Override
    public String toString() {
        return "Person2{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", password='" + password + '\'' +
                '}';
    }
}
