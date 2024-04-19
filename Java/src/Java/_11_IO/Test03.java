package Java._11_IO;

import java.io.*;
import java.nio.charset.StandardCharsets;

public class Test03 {
    public static void main(String[] args) {
        File file = new File("ex.txt");

        //try(FileInputStream fis = new FileInputStream(file)){
        try(FileReader reader = new FileReader(file)){
            // byte[] bytes = new byte[1024];
            char[] chars = new char[1024];
            int read;
            // while((read=fis.read(bytes))!=-1){
            while((read=reader.read())!=-1){
                System.out.println(read); // 115 115 115
                System.out.println((char)read); // s s s
            }
            while((read=reader.read(chars))!=-1){
                System.out.println(new String(chars,0,read)); // 无
            }
        }
        catch (IOException e) {
            throw new RuntimeException(e);
        }

        try(FileReader reader = new FileReader(file)){
            // byte[] bytes = new byte[1024];
            char[] chars = new char[1024];
            int read;
            while((read=reader.read(chars))!=-1){
                System.out.println(new String(chars,0,read)); // sss // 不能放在上面的try中
            }
        }
        catch (IOException e) {
            throw new RuntimeException(e);
        }

        // try(FileOutputStream fos = new FileOutputStream(file)){
        try(FileWriter fileWriter = new FileWriter(file)){
            // byte[] bytes = "sss".getBytes(StandardCharsets.UTF_8);
            String hello = "Hello World!!!";
            // fos.write(bytes);
            fileWriter.write(hello); // ex.txt => "Hello World!!!"
        }
        catch (IOException e) {
            throw new RuntimeException(e);
        }

        try(FileWriter fileWriter = new FileWriter(file)){
            // String hello = "Hello World!!!";
            char[] hello = "Hello World2!!!".toCharArray();
            fileWriter.write(hello); // ex.txt => "Hello World!!!"
        }
        catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
