package Java._11_IO;

import java.io.*;

public class Test08 { // 对象流3-避免序列化不必要的属性
    public static void main(String[] args) throws IOException, ClassNotFoundException {
        Person2 john = new Person2("John", 30,"ddd");
        final ObjectOutputStream objectOutputStream = new ObjectOutputStream(new FileOutputStream("person2222.txt"));
        objectOutputStream.writeObject(john);
        objectOutputStream.close();

        final ObjectInputStream objectInputStream = new ObjectInputStream(new FileInputStream("person2222.txt"));
        Person2 person = (Person2) objectInputStream.readObject();
        System.out.println("john"+john); // johnPerson2{name='John', age=30, password='ddd'}
        System.out.println("person"+person); // johnPerson2{name='John', age=30, password='ddd'} => personPerson2{name='John', age=30, password='null'}
        }
}
