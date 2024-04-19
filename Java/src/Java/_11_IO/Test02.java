package Java._11_IO;

import java.io.*;
import java.nio.charset.StandardCharsets;

public class Test02 {
    public static void main(String[] args) {
        File file = new File("ex.txt");
        try(FileInputStream fis = new FileInputStream(file)){
            int read;
            while((read=fis.read())!=-1){
                System.out.println((char)read);
//                H
//                e
//                l
//                l
//                o
//
//                W
//                o
//                r
//                l
//                d
//                !
//                !
//                !
            }
        }
//        catch (FileNotFoundException e) {
//            throw new RuntimeException(e);
//        }
        catch (IOException e) {
            throw new RuntimeException(e);
        }

        try(FileInputStream fis2 = new FileInputStream(file)){
            byte[] bytes = new byte[1024]; // byte
            int read;
            // while((read=fis2.read())!=-1){
            while((read=fis2.read(bytes))!=-1){
                // System.out.println((char)read);
                System.out.println(new String(bytes)); // Hello World!!!______...
                System.out.println("\u0000"); // Unicode中的NULL字符

                System.out.println(new String(bytes,0,read)); // Hello World!!!
            }
        }
        catch (IOException e) {
            throw new RuntimeException(e);
        }

        // try(FileInputStream fis3 = new FileInputStream(file)){
        try(FileInputStream fis3 = new FileInputStream("ex.txt")){
            byte[] bytes = new byte[1024]; // byte
            int read;
            while((read=fis3.read(bytes))!=-1){
                System.out.println(new String(bytes)); // Hello World!!!______...
                System.out.println("\u0000"); // Unicode中的NULL字符

                System.out.println(new String(bytes,0,read)); // Hello World!!!
            }
        }
        catch (IOException e) {
            throw new RuntimeException(e);
        }

        try(FileOutputStream fos = new FileOutputStream(file)){
            byte[] bytes = "sss".getBytes(StandardCharsets.UTF_8);
            fos.write(bytes); // ex.txt => "sss"
        }
//        catch (FileNotFoundException e) {
//            throw new RuntimeException(e);
//        }
        catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
