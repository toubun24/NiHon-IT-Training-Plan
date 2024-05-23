package _02_WorkQueue;

import com.rabbitmq.client.*;
import org.apache.log4j.BasicConfigurator;
import util.RabbitMQUtil;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

public class WorkConsumer1 {
//    private final static String QUEUE_NAME = "HelloWorldQueue";
    private final static String QUEUE_NAME = "WorkQueue";
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
        Consumer consumer = new DefaultConsumer(channel) {
            @Override
            public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body) throws IOException {
                System.out.println(new String(body));
            }
        };
        channel.basicConsume(QUEUE_NAME, true, consumer);
    }
}
//几乎瞬间
//WorkQueue1
//WorkQueue3
//WorkQueue5
//WorkQueue7
//WorkQueue9
//WorkQueue11
//WorkQueue13
//WorkQueue15
//WorkQueue17
//WorkQueue19
//WorkQueue21
//WorkQueue23
//WorkQueue25
//WorkQueue27
//WorkQueue29
//WorkQueue31
//WorkQueue33
//WorkQueue35
//WorkQueue37
//WorkQueue39
//WorkQueue41
//WorkQueue43
//WorkQueue45
//WorkQueue47
//WorkQueue49