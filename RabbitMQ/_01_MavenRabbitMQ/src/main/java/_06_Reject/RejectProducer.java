package _06_Reject;

import com.rabbitmq.client.AMQP;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import org.apache.log4j.BasicConfigurator;
import util.RabbitMQUtil;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.TimeoutException;

public class RejectProducer {
//    private static final String EXCHANGE_NAME = "exchange_Topic";
    private static final String EXCHANGE_NAME = "exchange_Reject";

    public static void main(String[] args) throws IOException, TimeoutException {
        BasicConfigurator.configure();
        Connection connection = RabbitMQUtil.getConnection();
        Channel channel = connection.createChannel();
//        channel.exchangeDeclare(EXCHANGE_NAME, "topic", true);
//        channel.exchangeDeclare(EXCHANGE_NAME, "reject", true); // 【问题23.6】
        channel.exchangeDeclare(EXCHANGE_NAME, "topic");
//        AMQP.BasicProperties.Builder builder = new AMQP.BasicProperties.Builder();
//        builder.deliveryMode(2);
//        AMQP.BasicProperties properties = builder.build();
//        for (int i = 0; i < 50; i++) {
//            String message = "TopicMessage" + i;
        String message = "RejectMessage";
//            channel.basicPublish(EXCHANGE_NAME, "orange.to", properties, message.getBytes(StandardCharsets.UTF_8));
        channel.basicPublish(EXCHANGE_NAME, "orange.to", null, message.getBytes(StandardCharsets.UTF_8));
//        }
        connection.close();
    }
}