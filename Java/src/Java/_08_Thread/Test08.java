package Java._08_Thread;

public class Test08 {
    public static void main(String[] args) {
        Object o = new Object();
        Thread thread01 = new Thread(()->{
            synchronized (o){
                System.out.println("thread 1 start");
                try {
                    o.wait();
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
                System.out.println("thread 1 restart");
            }
        });
        Thread thread02 = new Thread(()->{
            synchronized (o){
                System.out.println("thread 2 start");
                o.notify();
            }
        });
        thread01.start();
        thread02.start();
    }
}
//thread 1 start
//thread 2 start
//thread 1 restart

