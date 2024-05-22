package WorkQueue;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
//import com.rabbitmq.client.ConnectionFactory;
import org.apache.log4j.BasicConfigurator;
import util.RabbitMQUtil;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.TimeoutException;

public class WorkProducer {
    //    private static final String QUEUE_NAME = "HelloWorldQueue";
    private static final String QUEUE_NAME = "WorkQueue";

    public static void main(String[] args) throws IOException, TimeoutException {
        BasicConfigurator.configure();

//        ConnectionFactory connectionFactory = new ConnectionFactory();
//        connectionFactory.setHost("127.0.0.1");
//        connectionFactory.setPort(5672);
//        connectionFactory.setVirtualHost("/");
//        connectionFactory.setUsername("guest");
//        connectionFactory.setPassword("guest");
//        Connection connection = connectionFactory.newConnection();
        Connection connection = RabbitMQUtil.getConnection(); // new
        Channel channel = connection.createChannel();
        channel.queueDeclare(QUEUE_NAME, false, false, false, null);
//        channel.basicPublish("", QUEUE_NAME, null, "Hello World".getBytes(StandardCharsets.UTF_8));
        for (int i = 0; i < 50; i++) {
            String message = "WorkQueue" + i;
            channel.basicPublish("", QUEUE_NAME, null, message.getBytes(StandardCharsets.UTF_8));
        }
        connection.close();
    }
}