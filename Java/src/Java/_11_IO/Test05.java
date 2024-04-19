package Java._11_IO;

import java.io.*;

public class Test05 { // 缓冲流2
    public static void main(String[] args) {
        System.out.println("111");
        // try (BufferedInputStream bufferedInputStream = new BufferedInputStream(new FileInputStream("ex.txt"))) {
        try (BufferedReader bufferedReader = new BufferedReader(new FileReader("ex.txt"))) {
            // byte[] bytes = new byte[1024];
            char[] chars = new char[1024];
            int n;
            // while ((n = bufferedInputStream.read()) != -1) {
            while ((n = bufferedReader.read()) != -1) {
                System.out.println((char)n);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        System.out.println("222");
        try (BufferedReader bufferedReader = new BufferedReader(new FileReader("ex.txt"))) {
            char[] chars = new char[1024];
            int n;
            // while ((n = bufferedReader.read()) != -1) {
            while ((n = bufferedReader.read(chars)) != -1) {
                // System.out.println((char)n);
                System.out.println(new String(chars,0,n));
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        System.out.println("333");
        // try (BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(new FileOutputStream("ex.txt"))) {
        try (BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter("ex.txt"))) {
            // bufferedOutputStream.write("sss".getBytes());
            bufferedWriter.write("Hello World");
            // bufferedOutputStream.flush();
            bufferedWriter.flush(); // 刷新
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        System.out.println("444");
        try (BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter("ex.txt"))) {
            // bufferedWriter.write("Hello World");
            bufferedWriter.write("Hello World2".toCharArray());
            bufferedWriter.flush();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
