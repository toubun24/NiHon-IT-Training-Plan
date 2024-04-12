package Java._08_Thread;

public class SynchronizedExample2 {
    private int count = 0;
    //同一时间只能有一个线程访问这些方法
    public synchronized void increment() {
        // count++;
        synchronized (this){
            count++;
        }
    }

    public synchronized void decrement() {
        // count--;
        synchronized (this){
            count--;
        }
    }

    public synchronized int getCount() {
        // return count;
        synchronized (this){
            return count;
        }
    }
}