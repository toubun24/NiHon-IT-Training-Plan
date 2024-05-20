package util;

import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

// 减少从连接工厂获取连接的重复代码
public class RabbitMQUtil {
    private static final String host;
    private static final int port;
    private static final String virtualhost;
    private static final String username;
    private static final String password;
    private static final ConnectionFactory connectionFactory;

    static {
        // 静态代码块赋值
        host = "127.0.0.1";
        port = 5672;
        virtualhost = "/";
        username = "guest";
        password = "guest";
        connectionFactory = new ConnectionFactory();
        connectionFactory.setHost(host);
        connectionFactory.setPort(port);
        connectionFactory.setVirtualHost(virtualhost);
        connectionFactory.setUsername(username);
        connectionFactory.setPassword(password);
    }

    public static ConnectionFactory getConnectionFactory() {
        return connectionFactory;
    }

    public static Connection getConnection() { // import com.rabbitmq.client.Connection;
        try {
            return connectionFactory.newConnection();
        } catch (IOException | TimeoutException e) {
            e.printStackTrace();
        }
        return null;
    }

    public static void closeConnection(Connection connection) {
        try {
            if (connection != null) connection.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}