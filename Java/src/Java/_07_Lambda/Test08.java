package Java._07_Lambda;

import java.util.function.Function;

public class Test08 { // Function
    public static void main(String[] args) {
        Function<Integer, String> function = new Function<Integer, String>() { // new F...
            @Override
            public String apply(Integer integer) {
                return "number is" + integer;
            }
        };
        String apply = function.apply(123);
        System.out.println(apply); // number is123

        Function<Integer, Integer> function1 = integer -> integer >>> 4; // <Integer,Integer>
        Function<Integer, String> function2 = integer -> {
            if (integer > 16) {
                return "NO"; // ""
            }
            return "YES";
        };
        System.out.println(test(111, function1, function2)); // YES
        System.out.println(test(1111, function1, function2)); // NO
    }

    public static String test(int number, Function<Integer, Integer> function1, Function<Integer, String> function2) {
        return function2.apply(function1.apply(number));
    }
}
