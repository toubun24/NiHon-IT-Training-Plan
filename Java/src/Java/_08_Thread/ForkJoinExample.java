package Java._08_Thread;

import java.util.concurrent.ForkJoinPool;
import java.util.concurrent.RecursiveTask;

public class ForkJoinExample extends RecursiveTask<Long> {

    private static final int THRESHOLD = 10000;
    private final int[] array;
    private final int start;
    private final int end;

    public ForkJoinExample(int[] array, int start, int end) {
        this.array = array;
        this.start = start;
        this.end = end;
    }

    public static void main(String[] args) {
        int[] array = new int[100000];
        for (int i = 0; i < array.length; i++) {
            array[i] = i + 1;
        }
        ForkJoinExample task = new ForkJoinExample(array, 0, array.length);
        // 1
        Long result1 = ForkJoinPool.commonPool().invoke(task); // 可拆分
        // 2
        ForkJoinPool forkJoinPool = ForkJoinPool.commonPool();
        System.out.println(forkJoinPool.getParallelism()); // 查看并行度 // cpu核心数-1: 11
        Long result2 = forkJoinPool.invoke(task);
        // 3
        ForkJoinPool forkJoinPool1 = new ForkJoinPool();
        System.out.println(forkJoinPool1.getParallelism()); // 查看并行度 // cpu核心数: 12
        Long result3 = forkJoinPool1.invoke(task);
        // output
        System.out.println("结果1: " + result1+"结果2: " + result2+"结果3: " + result3); // 5000050000
    }

    @Override
    protected Long compute() {
        if (end - start <= THRESHOLD) {
            long sum = 0;
            for (int i = start; i < end; i++) {
                sum += array[i];
            }
            return sum;
        } else {
            int mid = (start + end) / 2;
            ForkJoinExample left = new ForkJoinExample(array, start, mid);
            ForkJoinExample right = new ForkJoinExample(array, mid, end);
            left.fork();
            right.fork();
            return left.join() + right.join();
        }
    }
}