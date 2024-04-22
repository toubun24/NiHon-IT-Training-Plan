package Java._12_Socket;

import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;

public class UDPServer {
    public static void main(String[] args) throws Exception {
        //创建DatagramSocket对象
        DatagramSocket serverSocket = new DatagramSocket(8888);

        //接收数据
        byte[] receiveData = new byte[1024];
        DatagramPacket receivePacket = new DatagramPacket(receiveData, receiveData.length);
        serverSocket.receive(receivePacket);
        System.out.println(new String(receivePacket.getData(), 0, receivePacket.getLength()));

        //发送数据
        byte[] sendData = "Hello, Client".getBytes();
        InetAddress clientAddr = receivePacket.getAddress();
        int clientPort = receivePacket.getPort();
        DatagramPacket sendPacket = new DatagramPacket(sendData, sendData.length, clientAddr, clientPort);
        serverSocket.send(sendPacket);

        //关闭DatagramSocket对象
        serverSocket.close();
    }
}
