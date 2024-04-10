package Java._07_Lambda;

public class Test05 { // 函数式接口 // Runnable
    public static void main(String[] args) {
        Runnable task = new Runnable() { // 匿名内部类
            @Override
            public void run() {
                System.out.println("task run");
            }
        };
        new Thread(task).start(); // 有很多构造方法
    }
}
