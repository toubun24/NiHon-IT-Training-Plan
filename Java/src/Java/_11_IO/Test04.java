package Java._11_IO;

import java.io.*;

public class Test04 { // 缓冲流1
    public static void main(String[] args) {
        System.out.println("111");
            try (BufferedInputStream bufferedInputStream = new BufferedInputStream(new FileInputStream("ex.txt"))){
                int n;
                while((n=bufferedInputStream.read())!=-1){
                    System.out.println((char)n);
                }
            }
//        catch (FileNotFoundException e) {
//            throw new RuntimeException(e);
//        }
            catch (IOException e) {
                throw new RuntimeException(e);
        }

        System.out.println("222");
        try (BufferedInputStream bufferedInputStream = new BufferedInputStream(new FileInputStream("ex.txt"))){
            byte[] bytes = new byte[1024]; // new
            int n;
            // while((n=bufferedInputStream.read())!=-1){
            while((n=bufferedInputStream.read(bytes))!=-1){
                // System.out.println((char)n);
                System.out.println(new String(bytes,0,n));
            }
            bufferedInputStream.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        System.out.println("333");
        // try (BufferedInputStream bufferedInputStream = new BufferedInputStream(new FileInputStream("ex.txt"))){
        try (BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(new FileOutputStream("ex.txt"))){
//            byte[] bytes = new byte[1024];
//            int n;
//            while((n=bufferedOutputStream.read(bytes))!=-1){
//                System.out.println(new String(bytes,0,n));
//            }
            bufferedOutputStream.write("sss".getBytes()); // 写到缓存区
            bufferedOutputStream.flush();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
