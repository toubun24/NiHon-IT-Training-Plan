package Java._11_IO;

import java.io.File;

public class FileExample {
    public static void main(String[] args) {
        // 创建File对象，表示当前工作目录下的text.txt文件
        File file = new File("text.txt"); // 文件不存在???
        /*实际上只是创建了一个 File 类的实例，这个实例代表了一个文件路径（在这个例子中是名为 "text.txt" 的文件）。然而，这并不会在文件系统中真正创建一个文件。换句话说，这仅仅是一个指向文件或目录路径的引用，而不是一个实际的文件。*/
        // 检查文件是否存在
        if (file.exists()) {
            System.out.println("文件存在"); // 文件存在
            // 检查是否为文件
            if (file.isFile()) {
                System.out.println("是文件"); // 是文件
            } else {
                System.out.println("不是文件");
            }
            // 获取文件名和路径
            System.out.println("文件名：" + file.getName()); // 文件名：text.txt
            System.out.println("文件路径：" + file.getPath()); // 文件路径：text.txt
            System.out.println("文件绝对路径：" + file.getAbsolutePath()); // 文件绝对路径：G:\NiHon-IT-Training-Plan\Java\text.txt
            file.renameTo(new File("G:\\NiHon-IT-Training-Plan\\Java\\text2.txt"));
            System.out.println("文件名：" + file.getName()); // 文件名：text.txt???
            file.renameTo(new File("G:\\NiHon-IT-Training-Plan\\Java\\text3.txt"));
            System.out.println("文件名：" + file.getName()); // 文件名：text.txt
            // 删除文件
//            boolean deleted = file.delete();
//            if (deleted) {
//                System.out.println("文件已删除"); // 文件已删除
//            } else {
//                System.out.println("文件删除失败");
//            }
        } else {
            System.out.println("文件不存在");
        }
        // 创建目录
        File dir = new File("mydir");
        boolean created = dir.mkdir();
        if (created) {
            System.out.println("目录创建成功"); // 目录创建成功
            // 检查是否为目录
            if (dir.isDirectory()) {
                System.out.println("是目录"); // 是目录
            } else {
                System.out.println("不是目录");
            }
            // 获取目录下的文件和子目录
            String[] files = dir.list();
            for (String filename : files) {
                System.out.println(filename);
            }
            // 删除目录
            boolean deletedDir = dir.delete();
            if (deletedDir) {
                System.out.println("目录已删除"); // 目录已删除
            } else {
                System.out.println("目录删除失败");
            }
        } else {
            System.out.println("目录创建失败");
        }
    }
}
