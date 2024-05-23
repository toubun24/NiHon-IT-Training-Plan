package _03_PubSubQueue;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import org.apache.log4j.BasicConfigurator;
import util.RabbitMQUtil;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.TimeoutException;

public class PubSubProducer {
//    private static final String QUEUE_NAME = "WorkQueue";
    private static final String EXCHANGE_NAME = "exchange_fanout"; // 交换机名称

    public static void main(String[] args) throws IOException, TimeoutException {
        BasicConfigurator.configure();

        Connection connection = RabbitMQUtil.getConnection();
        Channel channel = connection.createChannel();
        /**
         * 声明交换机
         * 参数1.exchange:交换机名称
         * 参数2.type:交换机类型
         */
//        channel.queueDeclare(QUEUE_NAME, false, false, false, null);
        channel.exchangeDeclare(EXCHANGE_NAME, "fanout"); // new
        for (int i = 0; i < 50; i++) {
//            String message = "WorkQueue" + i;
            String message = "PubSubMessage" + i; // new
            /**
             * 发送消息到交换机
             * 参数1.exchange:发送到那个交换机
             * 参数2.routingKey:路由key，如exchange为空，则为队列名称
             * 参数3.props:封装描述消息的其他信息
             * 参数4.body:消息体，字节流
             */
//            channel.basicPublish("", QUEUE_NAME, null, message.getBytes(StandardCharsets.UTF_8));
            channel.basicPublish(EXCHANGE_NAME, "", null, message.getBytes(StandardCharsets.UTF_8)); // new
        }
        connection.close();
    }
}