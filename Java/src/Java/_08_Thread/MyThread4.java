package Java._08_Thread;

public class MyThread4 extends Thread {
    private SynchronizedExample3 example;

    public MyThread4(SynchronizedExample3 example) {
        this.example = example;
    }

    public void run() {
        for (int i = 0; i < 10000; i++) {
            example.increment();
            example.decrement();
        }
    }
}