package Java._07_Lambda;

import java.util.function.Function;
import java.util.function.Predicate;

public class Test09 { // Predicate
    public static void main(String[] args) {
        Predicate<Integer> predicate = new Predicate<Integer>() { // 匿名内部类
            @Override
            public boolean test(Integer integer) { // object => integer
                return integer > 0;
            }
        };

        System.out.println(predicate.test(2222)); // true
        System.out.println(predicate.test(-1)); // false

        // Lambda
        Predicate<Integer> predicate2 = integer -> integer > 0;
        System.out.println(predicate2.test(2222)); // true
        System.out.println(predicate2.test(-1)); // false

        Function<Integer, Integer> function1 = integer -> integer >>> 4; // <Integer,Integer>
        // Function<Integer, String> function2 = integer -> {
        Predicate<Integer> function2 = integer -> integer < 16;
//        {
//            if (integer > 16) {
//                return "NO"; // ""
//            }
//            return "YES";
//        };
        System.out.println(test(111, function1, function2)); // YES
        System.out.println(test(1111, function1, function2)); // NO
    }

    // public static String test(int number, Function<Integer, Integer> function1, Function<Integer, String> function2) {
    public static String test(int number, Function<Integer, Integer> function1, Predicate<Integer> function2) {
        return function2.test(function1.apply(number)) ? "YES" : "NO";
    }
}
