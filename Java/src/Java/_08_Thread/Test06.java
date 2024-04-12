package Java._08_Thread;

public class Test06 {
    /* SynchronizedExample */
    public static final Object object01 = new Object();
    public static final Object object02 = new Object();

    /* 守护线程 */
    public static void main(String[] args) throws InterruptedException {
        Thread thread = new Thread(()->{
            while (true){
                System.out.println("守护线程执行");
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                }
            }
        });
//        thread.start();
//        System.out.println("主线程运行");
//        Thread.sleep(5000);
//        System.out.println("主线程结束");
//        主线程运行
//        守护线程执行
//        守护线程执行
//        守护线程执行
//        ...
//        Process finished with exit code 130
        thread.setDaemon(true); // 设置守护线程
        thread.start();
        System.out.println("主线程运行");
        Thread.sleep(5000);
        System.out.println("主线程结束");
//        主线程运行
//        守护线程执行
//        守护线程执行
//        守护线程执行
//        守护线程执行
//        守护线程执行
//        主线程结束
    }
}
