package Java._06_Exception;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

public class Test03 {
//    public static void main(String[] args) throws IOException {
//        FileRead fileRead = new FileRead();
//        fileRead.FilePro("text.txt");
//    }
public static void main(String[] args) {
    FileRead fileRead = new FileRead();
    try {
        fileRead.FilePro("text.txt");
    } catch (FileNotFoundException e) { // 子
        throw new RuntimeException(e);
    } catch (IOException e) { // 父
        throw new RuntimeException(e);
    }finally{
        System.out.println("final");
    }
}
}
class FileRead {
    public void FilePro(String fileName) throws FileNotFoundException, IOException {
        BufferedReader bufferedReader = new BufferedReader(new FileReader(fileName)); // unreported exception java.io.FileNotFoundException; must be caught or declared to be thrown
        bufferedReader.close(); // import java.io.FileNotFoundException;
    }
}