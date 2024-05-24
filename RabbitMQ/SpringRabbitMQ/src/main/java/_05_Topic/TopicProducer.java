package _05_Topic;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import org.apache.log4j.BasicConfigurator;
import util.RabbitMQUtil;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.TimeoutException;

public class TopicProducer {
    //交换机名称
//    private static final String EXCHANGE_NAME = "exchange_Routing";
    private static final String EXCHANGE_NAME = "exchange_Topic"; // new

    public static void main(String[] args) throws IOException, TimeoutException {
        BasicConfigurator.configure();
        //工具类获取Connection
        Connection connection = RabbitMQUtil.getConnection();
        //获取Channel
        Channel channel = connection.createChannel();
        /**
         * 声明交换机
         * 参数1.exchange:交换机名称
         * 参数2.type:交换机类型
         */
//        channel.exchangeDeclare(EXCHANGE_NAME, "direct");
        channel.exchangeDeclare(EXCHANGE_NAME, "topic"); // new
        /**
         * 发送消息到交换机
         * 参数1.exchange:发送到那个交换机
         * 参数2.routingKey:路由key，如exchange为空，则为队列名称
         * 参数3.props:封装描述消息的其他信息
         * 参数4.body:消息体，字节流
         */
        for (int i = 0; i < 50; i++) {
//            String message = "RoutingMessage" + i;
            String message = "TopicMessage" + i; // new
//            channel.basicPublish(EXCHANGE_NAME, "orange", null, message.getBytes(StandardCharsets.UTF_8));
//            channel.basicPublish(EXCHANGE_NAME, "orange.to", null, message.getBytes(StandardCharsets.UTF_8)); // new
            channel.basicPublish(EXCHANGE_NAME, "orange.to.black", null, message.getBytes(StandardCharsets.UTF_8)); // 【问题23.5】
        }
        connection.close();
    }
}