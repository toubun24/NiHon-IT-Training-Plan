package Java._08_Thread;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Test09 {
    public static void main(String[] args) {
        ExecutorService executorService = Executors.newFixedThreadPool(5);
        for(int i=1;i<=10;i++){
            executorService.execute(new Task(i));
        }
        executorService.shutdown();
    }
}

class Task implements Runnable{
    private final int id;
    public Task(int id){
        this.id=id;
    }

    @Override
    public void run() {
        System.out.println("start"+id);
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        System.out.println("end"+id);
    }
}
//start3
//start5
//start1
//start4
//start2
//end3
//end5
//start7
//start6
//end4
//end1
//end2
//start9
//start10
//start8
//end7
//end10
//end9
//end8
//end6
