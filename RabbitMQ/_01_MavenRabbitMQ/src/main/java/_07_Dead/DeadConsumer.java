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

public class DeadConsumer {
    //交换机名称
//    private static final String EXCHANGE_NAME = "exchange_Reject";
    private final static String EXCHANGE_NAME = "exchange_topic"; // new
    //死信交换机名称
    private static final String DEAD_EXCHANGE = "dead_exchange"; // new
    //队列名称
//    private final static String QUEUE_NAME = "RejectQueue";
    private final static String QUEUE_NAME = "NormalQueue"; // new
    //死信队列名称
    private final static String DEAD_QUEUE_NAME = "DeadQueue"; // new

    public static void main(String[] args) throws IOException, TimeoutException {
        BasicConfigurator.configure();
        Connection connection = RabbitMQUtil.getConnection();
        Channel channel = connection.createChannel();
        //声明交换机
        channel.exchangeDeclare(EXCHANGE_NAME,"topic");
        channel.exchangeDeclare(DEAD_EXCHANGE, "topic"); // new
        //声明死信队列与绑定死信交换机
        channel.queueDeclare(DEAD_QUEUE_NAME, false, false, false, null); // new
        channel.queueBind(DEAD_QUEUE_NAME, DEAD_EXCHANGE, "#"); // new
        //正常队列绑定死信队列信息
        Map<String, Object> params = new HashMap<>(); // new
        params.put("x-dead-letter-exchange", DEAD_EXCHANGE); //正常队列设置死信交换机 // new
        params.put("x-max-length", 5); //正常队列设置队列最大长度 // new
//        channel.queueDeclare(QUEUE_NAME,false,false,false,null);
        channel.queueDeclare(QUEUE_NAME,false,false,false,params); // new
        channel.queueBind(QUEUE_NAME,EXCHANGE_NAME,"orange.*");
        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            System.out.println(new String(delivery.getBody()));
//            channel.basicReject(delivery.getEnvelope().getDeliveryTag(),true); // 消息拒绝
            // // 先停留在普通队列几秒后再进入死信队列
            channel.basicReject(delivery.getEnvelope().getDeliveryTag(),false); // 直接进入死信队列
        };
        channel.basicConsume(QUEUE_NAME, false, deliverCallback, consumerTag -> {
        });
    }
}