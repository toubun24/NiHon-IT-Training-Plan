package Java._11_IO;

import java.io.*;

public class Test09 { // 对象流4-自定义序列化和反序列化
    public static void main(String[] args) throws IOException, ClassNotFoundException {
        Person3 john = new Person3("John", 30,"ddd");
        final ObjectOutputStream objectOutputStream = new ObjectOutputStream(new FileOutputStream("person3.txt"));
        objectOutputStream.writeObject(john);
        objectOutputStream.close();

        final ObjectInputStream objectInputStream = new ObjectInputStream(new FileInputStream("person3.txt"));
        Person3 person = (Person3) objectInputStream.readObject();
        System.out.println("john"+john); // johnPerson2{name='John', age=30, password='ddd'}
        System.out.println("person"+person); // personPerson2{name='John', age=30, password='DDD'}
        }
}
