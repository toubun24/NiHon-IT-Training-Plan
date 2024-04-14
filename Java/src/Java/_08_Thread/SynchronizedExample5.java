package Java._08_Thread;

import java.util.concurrent.locks.ReentrantLock;

public class SynchronizedExample5 { // ReentrantLock
    private int count = 0;
    private final ReentrantLock lock = new ReentrantLock();
    //同一时间只能有一个线程访问这些方法
    public void increment() {
//        count++;
//        synchronized (Test06.object01){
//            count++;
//        }
        lock.lock();
        try{
            count++;
        }finally {
            lock.unlock();
        }
    }

    public void decrement() {
//        count--;
//        synchronized (Test06.object02){
//        synchronized (Test06.object01){
//            count--;
//        }
        lock.lock();
        try{
            count--;
        }finally {
            lock.unlock();
        }
    }

    public int getCount() {
//        return count;
//        synchronized (Test06.object02){
//        synchronized (Test06.object01){
//            return count;
//        }
        lock.lock();
        try{
            return count;
        }finally {
            lock.unlock();
        }
    }
}