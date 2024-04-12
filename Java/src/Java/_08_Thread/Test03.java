package Java._08_Thread;

import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.FutureTask;

public class Test03 {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        int n = 45;
        Callable<Integer> callable = () -> rabbit(n);
        FutureTask<Integer> integerFutureTask = new FutureTask<>(callable);
        new Thread(integerFutureTask).start();
        Integer integer = integerFutureTask.get(); // get() => add exception
        System.out.println("result"+integer); // result1134903170
    }
    static int rabbit(int n){
        if (n == 1 || n == 2) return 1;
        return rabbit(n-1)+rabbit(n-2);
    }
}
