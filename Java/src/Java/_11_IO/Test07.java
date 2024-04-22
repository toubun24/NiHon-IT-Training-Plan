package Java._11_IO;

import java.io.*;

public class Test07 { // 对象流2-序列化版本控制
    public static void main(String[] args) throws IOException, ClassNotFoundException {
        // Person2 john = new Person2("John", 30);
        Person2 john = new Person2("John", 30,"ddd");
//        final ObjectOutputStream objectOutputStream = new ObjectOutputStream(new FileOutputStream("person22.txt")); // final
//        objectOutputStream.writeObject(john);
//        objectOutputStream.close();

        final ObjectInputStream objectInputStream = new ObjectInputStream(new FileInputStream("person22.txt"));
        Person2 person = (Person2) objectInputStream.readObject();
        System.out.println("john"+john); // johnPerson2{name='John', age=30, password='ddd'}
        System.out.println("person"+person); // personPerson2{name='John', age=30, password='null'} // null!
        // Exception in thread "main" java.io.InvalidClassException: Java._11_IO.Person2; local class incompatible: stream classdesc serialVersionUID = -2472973567582967497, local class serialVersionUID = -6892381831567343666
    }
}
