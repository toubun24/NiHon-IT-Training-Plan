package Java._08_Thread;

public class Test01 extends Thread{
    private String name;

    public Test01(String name) {
        this.name = name;
    }

    @Override
    public void run() {
        // super.run();
        // System.out.println("run"); // run
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        System.out.println(name);
    }

    public static void main(String[] args) {
        // new Test01().start();
        new Test01("thread1").start();
        new Test01("thread2").start();
        new Test01("thread3").start();
        // thread3 2 1 // thread2 3 1 // 并发执行，任意顺序
    }
}
