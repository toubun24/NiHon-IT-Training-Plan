package Java._08_Thread;

public class Test05 {
    public static void main(String[] args) throws InterruptedException {
        Thread thread = new Thread(()->{
            try {
                while(!Thread.currentThread().isInterrupted()){
                    System.out.println("run");
                    Thread.sleep(1000);
                }
            }catch (InterruptedException e) {
                System.out.println("interrupt");
            }
        });

        Thread thread1 = new Thread(()->{
            try {
                Thread.sleep(4000);
            }catch (InterruptedException e) {
            throw new RuntimeException();
            }
            thread.interrupt(); // interrupt
        });

        thread.start();
        thread1.start(); // run run run run interrupt
        Thread.sleep(5000);
        thread.interrupt(); // run run run run run interrupt

        thread1.start(); // run run run run run interrupt
    }
}