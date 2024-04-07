package Java._03_Array;

import java.util.Arrays;

public class Array02 {
    public static void main(String[] args) {
        // int[][] arrayName = new int[5][];
        int[][] arrayName = {{1, 2}, {3, 4}, {5}};
        System.out.println(Arrays.deepToString(arrayName)); // [[1, 2], [3, 4], [5]]

        int[][] arrayName2 = new int[3][2];
        arrayName2[0][0] = 1;
        arrayName2[0][1] = 2;
        arrayName2[1][0] = 3;
        arrayName2[1][1] = 4;
        arrayName2[2][0] = 5;
        System.out.println(Arrays.deepToString(arrayName2)); // [[1, 2], [3, 4], [5, 0]]

        for (int i = 0; i < arrayName2.length; i++) {
            System.out.println(Arrays.toString(arrayName2[i])); // [1, 2] [3, 4] [5, 0]
        }

        for (int i = 0; i < arrayName2.length; i++) {
            for (int j = 0; j < arrayName2[i].length; j++) {
                System.out.println(arrayName2[i][j]); // 1 2 3 4 5 0
            }
        }

        for (int[] ints : arrayName2) {
            for (int anInt : ints) {
                System.out.println(anInt); // 1 2 3 4 5 0
            }
        }
    }
}
