package _07_Dead;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.DeliverCallback;
import org.apache.log4j.BasicConfigurator;
import util.RabbitMQUtil;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeoutException;

public class DeadConsumer1 {
//    private final static String EXCHANGE_NAME = "exchange_topic";
    private static final String DEAD_EXCHANGE = "dead_exchange";
//    private final static String QUEUE_NAME = "NormalQueue";
    private final static String DEAD_QUEUE_NAME = "DeadQueue";

    public static void main(String[] args) throws IOException, TimeoutException {
        BasicConfigurator.configure();
        Connection connection = RabbitMQUtil.getConnection();
        Channel channel = connection.createChannel();
//        channel.exchangeDeclare(EXCHANGE_NAME,"topic");
        channel.exchangeDeclare(DEAD_EXCHANGE, "topic");
        channel.queueDeclare(DEAD_QUEUE_NAME, false, false, false, null);
        channel.queueBind(DEAD_QUEUE_NAME, DEAD_EXCHANGE, "#");
//        Map<String, Object> params = new HashMap<>();
//        params.put("x-dead-letter-exchange", DEAD_EXCHANGE);
//        params.put("x-max-length", 5);
//        channel.queueDeclare(QUEUE_NAME,false,false,false,params);
//        channel.queueBind(QUEUE_NAME,EXCHANGE_NAME,"orange.*");
        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            System.out.println(new String(delivery.getBody()));
//            channel.basicReject(delivery.getEnvelope().getDeliveryTag(),false);
            channel.basicAck(delivery.getEnvelope().getDeliveryTag(),false); // new
        };
//        channel.basicConsume(QUEUE_NAME, false, deliverCallback, consumerTag -> {
        channel.basicConsume(DEAD_QUEUE_NAME, false, deliverCallback, consumerTag -> { // new
        });
    }
}
//DeadMessage0
//DeadMessage1
//DeadMessage2
//DeadMessage3
//DeadMessage4
//DeadMessage5
//DeadMessage6
//DeadMessage7
//DeadMessage8
//DeadMessage9