package Java._01_HelloWorld;

public class Switch01 {
    public static void main(String[] args) {
        String age = "1";
        String sex = "Male";
        switch (age){
            case "1":
                switch (sex){
                    case "Male":
                        System.out.println("OK");
                }
                break;
            case "2":
                System.out.println(age);
                break;
            default:
                System.out.println("NO");
                break;
        }
    }
}
