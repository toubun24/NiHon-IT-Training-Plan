package _06_Reject;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.DeliverCallback;
import org.apache.log4j.BasicConfigurator;
import util.RabbitMQUtil;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

public class RejectConsumer {
//    private final static String QUEUE_NAME = "TopicQueue";
    private final static String QUEUE_NAME = "RejectQueue";
//    private static final String EXCHANGE_NAME = "exchange_Topic";
    private static final String EXCHANGE_NAME = "exchange_Reject";

    public static void main(String[] args) throws IOException, TimeoutException {
        BasicConfigurator.configure();
        Connection connection = RabbitMQUtil.getConnection();
        Channel channel = connection.createChannel();
//        channel.exchangeDeclare(EXCHANGE_NAME,"topic", true);
        channel.exchangeDeclare(EXCHANGE_NAME,"topic");
//        channel.exchangeDeclare(EXCHANGE_NAME,"reject"); // 【问题23.6】
//        channel.queueDeclare(QUEUE_NAME,true,false,false,null);
        channel.queueDeclare(QUEUE_NAME,false,false,false,null);
        channel.queueBind(QUEUE_NAME,EXCHANGE_NAME,"orange.*");
        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            System.out.println(new String(delivery.getBody()));
            /**
             * Reject拒绝消息
             * 参数1.消息投递序号(long类型)
             * 参数2.requeue:布尔值，拒绝消息后消息是否重新回到队列中
             */
            channel.basicReject(delivery.getEnvelope().getDeliveryTag(),true);
        };
        /**
         * 消费消息
         * 参数1.消费队列名称
         * 参数2.消费成功之后是否要自动应答 true 自动应答 false 手动应答
         * 参数3.消费成功的回调
         * 参数4.消费失败的回调
         */
//        channel.basicConsume(QUEUE_NAME, false, deliverCallback, consumerTag -> {
        channel.basicConsume(QUEUE_NAME, false, deliverCallback, consumerTag -> {
        });
    }
}
// RejectMessage
// ...