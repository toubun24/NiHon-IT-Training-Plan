package Java._11_IO;

import java.io.File;

public class Test01 {
    public static void main(String[] args) {
        File file = new File("text.txt");
        boolean exists = file.exists(); // boolean
        System.out.println(exists); // true

        File file2 = new File("G:\\NiHon-IT-Training-Plan\\Java", "text.txt");
        System.out.println(file2.exists()); // true

        File parentDir = new File("G:\\NiHon-IT-Training-Plan\\Java");
        File file3 = new File(parentDir, "text.txt");
        System.out.println(file3.exists()); // true
    }
}
