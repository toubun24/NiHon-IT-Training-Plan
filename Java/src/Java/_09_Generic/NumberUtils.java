package Java._09_Generic;

public class NumberUtils { // 泛型类型限制
    public static <T extends Number> double average(T[] numbers) {
        double sum = 0.0;
        for (T number : numbers) {
            sum += number.doubleValue(); // 安全地使用doubleValue进行类型转换
        }
        return sum / numbers.length;
    }
    public static void main(String[] args) {
        Integer[] integers = {1, 2, 3, 4, 5};
        double avg = NumberUtils.average(integers);
        System.out.println("Average: " + avg); // Average: 3.0

        Long[] longs = {1L, 2L, 3L, 4L, 5L};
        double avg2 = NumberUtils.average(longs);
        System.out.println("Average2: " + avg2); // Average2: 3.0
    }
}
