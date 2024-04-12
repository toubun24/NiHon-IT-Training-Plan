package Java._08_Thread;

public class MyThread3 extends Thread {
    private SynchronizedExample2 example;

    public MyThread3(SynchronizedExample2 example) {
        this.example = example;
    }

    public void run() {
        for (int i = 0; i < 10000; i++) {
            example.increment();
            example.decrement();
        }
    }
}