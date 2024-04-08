package Java._04_Object;

public class Dog extends Pet {
    @Override // 编译器帮助检查是否进行了正确的重写
    // void print(int a, String b) { // Ctrl+O
    // public void print() throws Exception { // 不行，因为父类方法用的是RuntimeException
    public void print() throws RuntimeException { // Ctrl+O // public, 不能低于父类方法
        // super.print();
        System.out.println("Dog"); // 方法重写
        final int MAX_SIZE = 10; // final
        // MAX_SIZE = 20; // final报错

    }

//    static void eat() { // 重新申明而非方法重写
//
//    }
    public void eat(){
        System.out.println("dog eat");
    }
}
