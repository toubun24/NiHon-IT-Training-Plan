package Java._03_Array;

public class Array01 {
    public static void main(String[] args) {
        int[] arrayName = new int[5];
        for (int i: arrayName) {
            System.out.println(i); // 0 0 0 0 0
        }
        int[] arrayName2 = new int[]{1, 2, 3, 4, 5};
        for (int i: arrayName2) {
            System.out.println(i);
        }
        int[] arrayName3 = {1, 2, 3, 4, 5};
        for (int i: arrayName3) {
            System.out.println(i);
        }
        int[] arrayName4 = new int[5];
        arrayName4[0] = 1;
        arrayName4[1] = 2;
        arrayName4[2] = 3;
        arrayName4[3] = 4;
        arrayName4[4] = 5;
        for (int i: arrayName4) {
            System.out.println(i);
        }

        System.out.println(arrayName4[0]);
        System.out.println(arrayName4[1]);
        System.out.println(arrayName4[2]);
        System.out.println(arrayName4[3]);
        System.out.println(arrayName4[4]);
        for (int i = 0; i < arrayName4.length; i++) {
            System.out.println(arrayName4[i]);
        }
        for (int j: arrayName4) {
            System.out.println(j);
        }
    }
}
