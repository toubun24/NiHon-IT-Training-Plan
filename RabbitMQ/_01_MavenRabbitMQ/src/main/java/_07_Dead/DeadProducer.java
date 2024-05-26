package _07_Dead;

import com.rabbitmq.client.AMQP;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import org.apache.log4j.BasicConfigurator;
import util.RabbitMQUtil;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.TimeoutException;

public class DeadProducer {
//    private static final String EXCHANGE_NAME = "exchange_Reject";
    private static final String EXCHANGE_NAME = "exchange_topic";

    public static void main(String[] args) throws IOException, TimeoutException {
        BasicConfigurator.configure();
        Connection connection = RabbitMQUtil.getConnection();
        Channel channel = connection.createChannel();
        channel.exchangeDeclare(EXCHANGE_NAME, "topic");
        AMQP.BasicProperties.Builder builder = new AMQP.BasicProperties.Builder(); // new
        //设置消息过期时间
        builder.expiration("10000"); // new
        AMQP.BasicProperties properties = builder.build(); // new
        for (int i = 0; i < 10; i++) { // 队列最大长度测试
//        String message = "RejectMessage"; // 消息拒绝
//            String message = "DeadMessage"; // new
            String message = "DeadMessage"+i; // 队列最大长度测试
//        channel.basicPublish(EXCHANGE_NAME, "orange.to", null, message.getBytes(StandardCharsets.UTF_8)); // 消息拒绝
            channel.basicPublish(EXCHANGE_NAME, "orange.to", properties, message.getBytes(StandardCharsets.UTF_8)); // new
        } // 队列最大长度测试
       connection.close();
    }
}