package Java._08_Thread;

public class MyThread extends Thread {
    private SynchronizedExample example;

    public MyThread(SynchronizedExample example) {
        this.example = example;
    }

    public void run() {
        for (int i = 0; i < 10000; i++) {
            example.increment();
            example.decrement();
        }
    }
}