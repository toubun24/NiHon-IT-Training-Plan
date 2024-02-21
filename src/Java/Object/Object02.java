package Java.Object;

import java.lang.reflect.InvocationTargetException;

public class Object02 {
    public static void main(String[] args) throws NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {
        // Object01 object02 = new Object01();
        Object01 object02 = Object01.class.getDeclaredConstructor().newInstance();
        object02.print();
    }
}