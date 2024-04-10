package Java._05_Object2;

public class Test02 { // 匿名内部类
    public static void main(String[] args) {
//        HelloWorld helloWorld = new HelloWorld() { // Interface
//            @Override
//            public void HelloWorld() {
//                System.out.println("匿名内部类HelloWorld");
//            }
//        }; // ;
//        helloWorld.HelloWorld(); //
        Hello hello = new Hello() { // abstract class
            @Override
            public void Hello() {
                System.out.println("Hello");
            }
        };
        hello.Hello(); // Hello
    }

}
