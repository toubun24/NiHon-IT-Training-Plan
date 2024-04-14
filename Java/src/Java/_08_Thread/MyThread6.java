package Java._08_Thread;

public class MyThread6 extends Thread {
    private SynchronizedExample5 example;

    public MyThread6(SynchronizedExample5 example) {
        this.example = example;
    }

    public void run() {
        for (int i = 0; i < 10000; i++) {
            example.increment();
            example.decrement();
        }
    }
}