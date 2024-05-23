package _03_PubSubQueue;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.DeliverCallback;
import org.apache.log4j.BasicConfigurator;
import util.RabbitMQUtil;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

public class PubSubConsumer {
    //    private final static String QUEUE_NAME = "WorkQueue";
    private final static String QUEUE_NAME = "PubSubQueue"; // new
    private static final String EXCHANGE_NAME = "exchange_fanout"; // 交换机名称


    public static void main(String[] args) throws IOException, TimeoutException {
        BasicConfigurator.configure();

        Connection connection = RabbitMQUtil.getConnection();
        Channel channel = connection.createChannel();
//        channel.basicQos(1);
        /**
         * 声明交换机
         * 参数1.exchange:交换机名称
         * 参数2.type:交换机类型
         */
        channel.exchangeDeclare(EXCHANGE_NAME,"fanout"); // new
        // 声明队列
        channel.queueDeclare(QUEUE_NAME,false,false,false,null); // new
        /**
         * 队列绑定交换机
         * 参数1.queue:消费队列名称
         * 参数2.exchange:消费成功之后是否要自动应答 true 自动应答 false 手动应答
         * 参数3.routingKey:路由key
         */
        channel.queueBind(QUEUE_NAME,EXCHANGE_NAME,""); // new
        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
//            try {
//                Thread.sleep(1000L);
                System.out.println(new String(delivery.getBody()));
//            } catch (InterruptedException e) {
//                throw new RuntimeException(e);
//            } finally {
//                channel.basicAck(delivery.getEnvelope().getDeliveryTag(),false);
//            }
        };
        channel.basicConsume(QUEUE_NAME, false, deliverCallback, consumerTag -> {
        });
    }
}
// all
//PubSubMessage0
//PubSubMessage1
//PubSubMessage2
//PubSubMessage3
//PubSubMessage4
//PubSubMessage5
//PubSubMessage6
//PubSubMessage7
//PubSubMessage8
//PubSubMessage9
//PubSubMessage10
//PubSubMessage11
//PubSubMessage12
//PubSubMessage13
//PubSubMessage14
//PubSubMessage15
//PubSubMessage16
//PubSubMessage17
//PubSubMessage18
//PubSubMessage19
//PubSubMessage20
//PubSubMessage21
//PubSubMessage22
//PubSubMessage23
//PubSubMessage24
//PubSubMessage25
//PubSubMessage26
//PubSubMessage27
//PubSubMessage28
//PubSubMessage29
//PubSubMessage30
//PubSubMessage31
//PubSubMessage32
//PubSubMessage33
//PubSubMessage34
//PubSubMessage35
//PubSubMessage36
//PubSubMessage37
//PubSubMessage38
//PubSubMessage39
//PubSubMessage40
//PubSubMessage41
//PubSubMessage42
//PubSubMessage43
//PubSubMessage44
//PubSubMessage45
//PubSubMessage46
//PubSubMessage47
//PubSubMessage48
//PubSubMessage49