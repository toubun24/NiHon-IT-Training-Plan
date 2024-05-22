package WorkQueue;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
//import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.DeliverCallback;
import org.apache.log4j.BasicConfigurator;
import util.RabbitMQUtil;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

public class WorkConsumer {
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
        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            try {
                Thread.sleep(1000L); // new
                System.out.println(new String(delivery.getBody())); // new
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
//            System.out.println(new String(delivery.getBody()));
        };
        channel.basicConsume(QUEUE_NAME, true, deliverCallback, consumerTag -> {
        });
    }
}
//一秒一条
//WorkQueue0
//WorkQueue2
//WorkQueue4
//WorkQueue6
//WorkQueue8
//WorkQueue10
//WorkQueue12
//WorkQueue14
//WorkQueue16
//WorkQueue18
//WorkQueue20
//WorkQueue22
//WorkQueue24
//WorkQueue26
//WorkQueue28
//WorkQueue30
//WorkQueue32
//WorkQueue34
//WorkQueue36
//WorkQueue38
//WorkQueue40
//WorkQueue42
//WorkQueue44
//WorkQueue46
//WorkQueue48
