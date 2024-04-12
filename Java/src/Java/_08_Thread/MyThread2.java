package Java._08_Thread;

public class MyThread2 extends Thread {
    private UnsynchronizedExample example;

    public MyThread2(UnsynchronizedExample example) {
        this.example = example;
    }

    public void run() {
        for (int i = 0; i < 10000; i++) {
            example.increment();
            example.decrement();
        }
    }
}