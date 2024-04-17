package Java._08_Thread;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class Test10 {
    public static void main(String[] args) {
//        ExecutorService executorService = Executors.newFixedThreadPool(5);
        ScheduledExecutorService scheduledexecutorService = Executors.newScheduledThreadPool(1);
//        for(int i=1;i<=10;i++){
//            executorService.execute(new Task(i));
//        }
//        executorService.shutdown();
        scheduledexecutorService.schedule(new Task2(),3, TimeUnit.SECONDS); // start end
        // scheduledexecutorService.scheduleAtFixedRate(new Task2(),0,3,TimeUnit.SECONDS); //
        // scheduledexecutorService.scheduleWithFixedDelay(new Task2(),0,3,TimeUnit.SECONDS); // start end start end start end ...
    }
}

class Task2 implements Runnable{
//    private final int id;
//    public Task2(int id){
//        this.id=id;
//    }

    @Override
    public void run() {
//        System.out.println("start"+id);
        System.out.println("start");
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
//        System.out.println("end"+id);
        System.out.println("end");
    }
}