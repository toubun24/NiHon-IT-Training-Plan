package Java._04_Object;

public interface PetI {
    // int a; // 成员属性，不行
    public static final int a =1; // public static final 冗余
    String b = "v";
    void eat();
    default void run(){ // 接口默认方法
        System.out.println("run default");
    }
    static void test(){ // 接口静态方法
        System.out.println("test static");
    }
}
