package _06_Reject;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.DeliverCallback;
import org.apache.log4j.BasicConfigurator;
import util.RabbitMQUtil;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

public class RejectConsumer1 {
//    private final static String QUEUE_NAME = "RejectQueue";
    private final static String QUEUE_NAME = "RejectQueue1";
    private static final String EXCHANGE_NAME = "exchange_Reject";

    public static void main(String[] args) throws IOException, TimeoutException {
        BasicConfigurator.configure();
        Connection connection = RabbitMQUtil.getConnection();
        Channel channel = connection.createChannel();
        channel.exchangeDeclare(EXCHANGE_NAME,"topic");
        channel.queueDeclare(QUEUE_NAME,false,false,false,null);
        channel.queueBind(QUEUE_NAME,EXCHANGE_NAME,"orange.*");
        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            System.out.println(new String(delivery.getBody()));
            /**
             * Nack拒绝消息
             * 参数1.消息投递序号(long类型)
             * 参数2.multiple:布尔值，是否批量拒绝消息
             * 参数3.requeue:布尔值，拒绝消息后消息是否重新回到队列中
             */
//            channel.basicReject(delivery.getEnvelope().getDeliveryTag(),true); // reject方式
//            channel.basicNack(delivery.getEnvelope().getDeliveryTag(),false,true); // nack方式, 重回队列false // RejectMessage RejectMessage RejectMessage ...
            channel.basicNack(delivery.getEnvelope().getDeliveryTag(),false,false); // nack方式, 重回队列true // RejectMessage
        };
        channel.basicConsume(QUEUE_NAME, false, deliverCallback, consumerTag -> {
        });
    }
}