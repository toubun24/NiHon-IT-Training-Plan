package Java._08_Thread;

public class Test04 {
    public static void main(String[] args) throws InterruptedException { // throws InterruptedException => sleep
        Thread thread = new Thread(() -> {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        });
        System.out.println("线程状态: " + thread.getState()); // 输出 NEW
        thread.start();
        System.out.println("线程状态: " + thread.getState()); // 输出 RUNNABLE
        Thread.sleep(200); // 等待一段时间
        System.out.println("线程状态: " + thread.getState()); // 输出 TIMED_WAITING
        Thread.sleep(1000); // 再等待一段时间
        System.out.println("线程状态: " + thread.getState()); // 输出 TERMINATED
    }
}
//线程状态: NEW
//线程状态: RUNNABLE
//线程状态: TIMED_WAITING
//线程状态: TERMINATED