package Java._08_Thread;

public class MyThread5 extends Thread {
    private SynchronizedExample4 example;

    public MyThread5(SynchronizedExample4 example) {
        this.example = example;
    }

    public void run() {
        for (int i = 0; i < 10000; i++) {
            example.increment();
            example.decrement();
        }
    }
}