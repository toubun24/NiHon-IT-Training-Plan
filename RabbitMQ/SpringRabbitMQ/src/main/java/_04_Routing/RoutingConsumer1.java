package _04_Routing;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.DeliverCallback;
import org.apache.log4j.BasicConfigurator;
import util.RabbitMQUtil;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

public class RoutingConsumer1 {
//    private final static String QUEUE_NAME = "RoutingQueue";
    private final static String QUEUE_NAME = "RoutingQueue1"; // new
    private static final String EXCHANGE_NAME = "exchange_Routing";


    public static void main(String[] args) throws IOException, TimeoutException {
        BasicConfigurator.configure();

        Connection connection = RabbitMQUtil.getConnection();
        Channel channel = connection.createChannel();
        channel.exchangeDeclare(EXCHANGE_NAME,"direct");
        channel.queueDeclare(QUEUE_NAME,false,false,false,null);
//        channel.queueBind(QUEUE_NAME,EXCHANGE_NAME,"orange");
        channel.queueBind(QUEUE_NAME,EXCHANGE_NAME,"black"); // new
        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            System.out.println(new String(delivery.getBody()));
        };
        channel.basicConsume(QUEUE_NAME, false, deliverCallback, consumerTag -> {
        });
    }
}
// null (black)