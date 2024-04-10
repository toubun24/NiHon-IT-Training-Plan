package Java._05_Object2;

public class MethodInnerClass {
    private int a = 0;
    public void test(){
        // public class InnerClass{ // 不能修饰
        class InnerClass{
            String name;
            static {
                System.out.println("initialized");
            }
            private void printA(){
                System.out.println(a);
            }
        }
        InnerClass innerClass = new InnerClass();
        innerClass.printA();

    }

    public static void main(String[] args) {
        // new MethodInnerClass.InnerClass(); // 找不到
        MethodInnerClass methodInnerClass = new MethodInnerClass();
        methodInnerClass.test(); // initialized 0
    }
}
