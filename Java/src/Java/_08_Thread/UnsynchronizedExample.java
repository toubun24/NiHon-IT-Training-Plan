package Java._08_Thread;

public class UnsynchronizedExample {
    private int count = 0;
    //同一时间只能有一个线程访问这些方法
    public void increment() {
        count++;
    }

    public void decrement() {
        count--;
    }

    public int getCount() {
        return count;
    }
}