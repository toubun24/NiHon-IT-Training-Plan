package Java._07_Lambda;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Supplier;

public class ExecutionExample {
    public static void main(String[] args) {
        List<Integer> numbers = new ArrayList<>();
        numbers.add(1);
        numbers.add(2);
        numbers.add(3);

//        printIfValidIndex(0, getNumber(numbers)); // Getting number, The number is 1
//        printIfValidIndex(1, getNumber(numbers)); // Getting number, The number is 1
//        printIfValidIndex(2, getNumber(numbers)); // Getting number
//        printIfValidIndex(3, getNumber(numbers)); // Getting number
        printIfValidIndex(0, () -> getNumber(numbers)); // Getting number, The number is 1
        printIfValidIndex(1, () -> getNumber(numbers)); // Getting number, The number is 1
        printIfValidIndex(2, () -> getNumber(numbers)); // /
        printIfValidIndex(3, () -> getNumber(numbers)); // /
    }

    public static int getNumber(List<Integer> numbers) {
        System.out.println("Getting number");
        return numbers.get(0);
    }

    // public static void printIfValidIndex(int number, int value) {
    public static void printIfValidIndex(int number, Supplier<Integer> supplier) {
        if (number >= 0 && number < 2) {
            // System.out.println("The number is " + value);
            System.out.println("The number is " + supplier.get());
        }
    }
}