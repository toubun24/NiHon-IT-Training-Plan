package Java._05_Object2;

public class Test01 {
    private int a = 0;

    public InnerClass getInnerClass(){
        return new InnerClass();
    }

    // private class InnerClass { // 内部类 // 也可不用private之类的修饰
    private class InnerClass { // implements // extends
        private void printA() {
            System.out.println(a);
        }
        static{
            System.out.println("innerclass initialized"); // innerclass initialized
        }
        String innerclassName;

    }

    public static void main(String[] args) {
        final InnerClass innerClass = new Test01().new InnerClass(); // .new InnerClass()
        innerClass.printA(); // 0
        final InnerClass innerClass2 = new Test01().getInnerClass(); // .getInnerClass()
        innerClass2.printA(); // 0
    }
}
