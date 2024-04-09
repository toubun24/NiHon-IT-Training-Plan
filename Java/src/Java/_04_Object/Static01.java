package Java._04_Object;

public class Static01 {
    public static int a=0; // 类的所有实例共享
    static{
        System.out.println("loaded"); // loaded // 仅初始化一次
    }

    public Static01() {
        a++;
    }
    public static int getA(){
        return a;
    }

    public static void main(String[] args) {
        Static01 static01=new Static01();
        System.out.println(static01.getA()); // 1
        Static01 static02 = new Static01();
        System.out.println(static01.a); // 2
        Static01 static03 = new Static01();
        System.out.println(getA()); // 3
    }
}
