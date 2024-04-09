package Java._05_Object2;

public class StaticInnerClassTest {
    private int a = 0;
    private static String name = "zhangsan";
    static class InnerClass{
        String name = "lisi";
        static{
            System.out.println("staticinnerclass initialized");
        }
        public String getName(){
            return StaticInnerClassTest.name+name; // zhangsan+lisi
        }
        public int getA(){
            // return a; // error, 要么将a设为static，要么将内部类设为非static，或者如下
            return new StaticInnerClassTest().a; // new&()
        }
    }

    public static void main(String[] args) {
        InnerClass innerClass=new InnerClass(); // 不依赖外部类的情况下直接new内部类
        System.out.println(innerClass.getName()); // zhangsanlisi
        System.out.println(innerClass.getA()); // 0
    }
}
