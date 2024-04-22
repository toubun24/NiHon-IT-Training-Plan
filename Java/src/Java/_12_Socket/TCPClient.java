package Java._12_Socket;

import java.io.InputStream;
import java.io.OutputStream;
import java.net.Socket;

public class TCPClient {
    public static void main(String[] args) throws Exception {
        //创建Socket对象
        Socket clientSocket = new Socket("127.0.0.1", 8888);

        //发送数据
        OutputStream out = clientSocket.getOutputStream();
        out.write("Hello, Server".getBytes());

        //接收数据
        InputStream in = clientSocket.getInputStream();
        byte[] buffer = new byte[1024];
        int len = in.read(buffer);
        System.out.println(new String(buffer, 0, len));

        //关闭Socket对象
        clientSocket.close();
    }
}
