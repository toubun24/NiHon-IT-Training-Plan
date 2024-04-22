package Java._11_IO;

import java.io.Serializable;

public class Person implements Serializable { // 对象流1-序列化和反序列化
    private String name;
    private int age;
    public Person(String name, int age){
        this.name = name;
        this.age = age;
    }

    public String getName(){
        return name;
    }

    public int getAge(){
        return age;
    }

    @Override
    public String toString() { // generate => toString()
        return "Person{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}
