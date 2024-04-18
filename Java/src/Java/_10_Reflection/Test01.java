package Java._10_Reflection;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class Test01 {
    public static void main(String[] args) throws ClassNotFoundException, NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException, NoSuchFieldException {
        Class<?> aClass = Class.forName("Java._10_Reflection.Person");
        Class<? extends Person> aClass1 = new Person().getClass();
        Class<Person> personClass = Person.class;
        Constructor<?> constructor = aClass.getConstructor(String.class, int.class);
        // Person person = (Person) Class.forName("Java._10_Reflection.Person").newInstance();
        Person tom = (Person) constructor.newInstance("tom", 25);
        Method sayHello = aClass.getMethod("sayHello");
        sayHello.invoke(tom); // nametomage25

        Field name = aClass.getDeclaredField("name"); // private
        Field age = aClass.getDeclaredField("age"); // private
        name.setAccessible(true);
        age.setAccessible(true);
        name.set(tom,"jerry"); // Person tom
        age.set(tom,100); // Person tom
        // Method sayHello = aClass.getMethod("sayHello");
        sayHello.invoke(tom); // namejerryage100
    }

}
