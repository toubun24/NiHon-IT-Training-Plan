package Java._08_Thread;

public class Test07 {
    public static void main(String[] args) throws InterruptedException {
        SynchronizedExample synchronizedExample = new SynchronizedExample();

        MyThread thread1 = new MyThread(synchronizedExample);
        MyThread thread2 = new MyThread(synchronizedExample);

        thread1.start();
        thread2.start();
        thread1.join();
        thread2.join();

//        try {
//            thread1.join();
//            thread2.join();
//        } catch (InterruptedException e) {
//            e.printStackTrace();
//        }
        //值始终为 0，这证明了线程同步的正确性。
        System.out.println(synchronizedExample.getCount());

        UnsynchronizedExample unsynchronizedExample = new UnsynchronizedExample();
        MyThread2 thread3 = new MyThread2(unsynchronizedExample);
        MyThread2 thread4 = new MyThread2(unsynchronizedExample);
        thread3.start();
        thread4.start();
        thread3.join();
        thread4.join();
        System.out.println(unsynchronizedExample.getCount());
        // 38 ...

        SynchronizedExample2 synchronizedExample2 = new SynchronizedExample2();
        MyThread3 thread5 = new MyThread3(synchronizedExample2);
        MyThread3 thread6 = new MyThread3(synchronizedExample2);
        thread5.start();
        thread6.start();
        thread5.join();
        thread6.join();
        System.out.println(synchronizedExample2.getCount());
        // 0

        SynchronizedExample3 synchronizedExample3 = new SynchronizedExample3();
        MyThread4 thread7 = new MyThread4(synchronizedExample3);
        MyThread4 thread8 = new MyThread4(synchronizedExample3);
        thread7.start();
        thread8.start();
        thread7.join();
        thread8.join();
        System.out.println(synchronizedExample3.getCount());
        // -455

        SynchronizedExample4 synchronizedExample4 = new SynchronizedExample4();
        MyThread5 thread9 = new MyThread5(synchronizedExample4);
        MyThread5 thread10 = new MyThread5(synchronizedExample4);
        thread9.start();
        thread10.start();
        thread9.join();
        thread10.join();
        System.out.println(synchronizedExample4.getCount());
        // 0
    }
}
