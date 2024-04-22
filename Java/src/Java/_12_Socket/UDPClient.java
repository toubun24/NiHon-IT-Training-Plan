package Java._12_Socket;

import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;

public class UDPClient {
    public static void main(String[] args) throws Exception {
        //创建DatagramSocket对象
        DatagramSocket clientSocket = new DatagramSocket();
        //发送数据
        byte[] sendData = "Hello, Server".getBytes();
        InetAddress serverAddr = InetAddress.getByName("127.0.0.1");
        DatagramPacket sendPacket = new DatagramPacket(sendData, sendData.length, serverAddr, 8888);
        clientSocket.send(sendPacket);

        //接收数据
        byte[] receiveData = new byte[1024];
        DatagramPacket receivePacket = new DatagramPacket(receiveData, receiveData.length);
        clientSocket.receive(receivePacket);
        System.out.println(new String(receivePacket.getData(), 0, receivePacket.getLength()));

        //关闭DatagramSocket对象
        clientSocket.close();
    }
}
