package Java._11_IO;

import java.io.IOException;
import java.io.Serializable;

public class Person3 implements Serializable { // 对象流4-自定义序列化和反序列化
    private String name;
    private int age;
    private transient String password;
    private static final long serialVersionUID = 11113L;

    private void writeObject(java.io.ObjectOutputStream out)
            throws IOException { // Serializable.java
        out.defaultWriteObject();
        out.writeObject(password.toUpperCase());
    }

    ;

    private void readObject(java.io.ObjectInputStream in)
            throws IOException, ClassNotFoundException { // Serializable.java
        in.defaultReadObject();
        password = (String) in.readObject();
    }

    ;
//    private void readObjectNoData()
//            throws ObjectStreamException; // Serializable.java

    public Person3(String name, int age, String password) {
        this.name = name;
        this.age = age;
        this.password = password;
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

    @Override
    public String toString() {
        return "Person2{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", password='" + password + '\'' +
                '}';
    }
}
