package _05_Topic;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.DeliverCallback;
import org.apache.log4j.BasicConfigurator;
import util.RabbitMQUtil;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

public class TopicConsumer {
    //交换机名称
//    private final static String QUEUE_NAME = "RoutingQueue";
    private final static String QUEUE_NAME = "TopicQueue"; // new
    //队列名称
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
//        channel.exchangeDeclare(EXCHANGE_NAME,"direct");
        channel.exchangeDeclare(EXCHANGE_NAME,"topic"); // new
        //声明队列
        channel.queueDeclare(QUEUE_NAME,false,false,false,null);
        /**
         * 队列绑定交换机
         * 参数1.queue:消费队列名称
         * 参数2.exchange:消费成功之后是否要自动应答 true 自动应答 false 手动应答
         * 参数3.routingKey:路由key
         */
//        channel.queueBind(QUEUE_NAME,EXCHANGE_NAME,"orange");
        // * 匹配单层级，# 可匹配多层级或无层级
        channel.queueBind(QUEUE_NAME,EXCHANGE_NAME,"orange.*"); // new
        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            System.out.println(new String(delivery.getBody()));
        };
        /**
         * 消费消息
         * 参数1.消费队列名称
         * 参数2.消费成功之后是否要自动应答 true 自动应答 false 手动应答
         * 参数3.消费成功的回调
         * 参数4.消费失败的回调
         */
        channel.basicConsume(QUEUE_NAME, false, deliverCallback, consumerTag -> {
        });
    }
}
// all (.* "orange.to")
// null (.* "orange.to.black")