package Java._06_Exception;

public class Test02 {
    public static void main(String[] args) {
        // test test = new test(); // static直接调即可
        try {
            int math = test.math(1, 0);
            System.out.println(math);
        } catch (ArithmeticException e) {
            System.out.println("math exp"); // math exp
        }
    }
}

class test {
    public static int math(int a, int b) {
        if (b == 0) throw new ArithmeticException();
        return a / b;
    }
}