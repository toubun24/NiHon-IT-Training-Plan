package Java._08_Thread;

public class SynchronizedExample3 {
    private int count = 0;
    //同一时间只能有一个线程访问这些方法
    public void increment() {
        // count++;
        synchronized (Test06.object01){
            count++;
        }
    }

    public void decrement() {
        // count--;
        synchronized (Test06.object02){
            count--;
        }
    }

    public int getCount() {
        // return count;
        synchronized (Test06.object02){
            return count;
        }
    }
}