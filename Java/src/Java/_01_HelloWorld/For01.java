package Java._01_HelloWorld;

public class For01 {
    public static void main(String[] args) {
        for (int i = 1; i <= 10; i++) {
            if (i == 5){
                continue; // 5的输出没了
            }
            System.out.println(i);
        }
    }
}
