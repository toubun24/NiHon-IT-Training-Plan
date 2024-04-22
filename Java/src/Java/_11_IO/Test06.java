package Java._11_IO;

import java.io.*;

public class Test06 { // 对象流1-序列化和反序列化
    public static void main(String[] args) throws IOException, ClassNotFoundException {
        Person john = new Person("John", 30);
        final ObjectOutputStream objectOutputStream = new ObjectOutputStream(new FileOutputStream("person.txt")); // final
        objectOutputStream.writeObject(john);
        objectOutputStream.close();

        // 读
        final ObjectInputStream objectInputStream = new ObjectInputStream(new FileInputStream("person.txt"));
        Person person = (Person) objectInputStream.readObject();
        System.out.println("john"+john); // johnPerson{name='John', age=30}
        System.out.println("person"+person); // personPerson{name='John', age=30}
    }
}
