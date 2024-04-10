package Java._07_Lambda;

import java.util.function.Consumer;

public class Test06 { // 函数式接口 // Consumer
    public static void main(String[] args) {
        Consumer<String> consumer = new Consumer<String>() {
            @Override
            public void accept(String s) {
                System.out.println(s); // Hello World
            }
        };
        consumer.accept("Hello World");

        Consumer<String> consumer1 = System.out::println; // 222
        consumer1.accept("222");

        Consumer<String> consumer2 = s -> System.out.println(s.length()); // 5
        consumer2.andThen(consumer2).accept("Hello"); // 5
    }
}
