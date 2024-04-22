package Java._12_Socket;

import java.io.InputStream;
import java.io.OutputStream;
import java.net.ServerSocket;
import java.net.Socket;

public class TCPServer {
    public static void main(String[] args) throws Exception {
        //创建ServerSocket对象
        ServerSocket serverSocket = new ServerSocket(8888);

        //等待客户端连接
        Socket clientSocket = serverSocket.accept();

        //接收数据
        InputStream in = clientSocket.getInputStream();
        byte[] buffer = new byte[1024];
        int len = in.read(buffer);
        System.out.println(new String(buffer, 0, len));

        //发送数据
        OutputStream out = clientSocket.getOutputStream();
        out.write("Hello, Client".getBytes());

        //关闭Socket对象和ServerSocket对象
        clientSocket.close();
        serverSocket.close();
    }
}
