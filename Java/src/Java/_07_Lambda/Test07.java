package Java._07_Lambda;

import java.util.Random;
import java.util.function.Supplier;

public class Test07 { // Supplier
    public static void main(String[] args) {
        Supplier<Integer> supplier = () -> new Random().nextInt(10); // 0~9
        System.out.println(supplier.get()); // 5 0 3 ...

        Supplier<Integer> supplier2 = () -> new Random().nextInt(10,20);
        System.out.println(supplier2.get()); // 13 ...
    }
}
