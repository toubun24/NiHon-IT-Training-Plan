package Java._01_HelloWorld;

import Java._04_Object.Object01;

//HelloWorldClass
public class HelloWorld {
    /*
    test
     */

    /**
     * main is method name
     * @param args
     */
    public static void main(String[] args) {
        String Name;
        System.out.println("Hello World !");

        Object01 object01 = new Object01();
        object01.name = "zhangsan"; // public
        // object01.aaa = "aaa" // protected
        // object01.bbb = "bbb" // default
    }
}
