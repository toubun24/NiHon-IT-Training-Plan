package _04_Routing;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.DeliverCallback;
import org.apache.log4j.BasicConfigurator;
import util.RabbitMQUtil;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

public class RoutingConsumer {
    //交换机名称
//    private final static String QUEUE_NAME = "PubSubQueue";
    private final static String QUEUE_NAME = "RoutingQueue"; // new
    //队列名称
//    private static final String EXCHANGE_NAME = "exchange_fanout";
    private static final String EXCHANGE_NAME = "exchange_Routing"; // new

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
//        channel.exchangeDeclare(EXCHANGE_NAME,"fanout");
        channel.exchangeDeclare(EXCHANGE_NAME,"direct"); // new
        //声明队列
        channel.queueDeclare(QUEUE_NAME,false,false,false,null);
        /**
         * 队列绑定交换机
         * 参数1.queue:消费队列名称
         * 参数2.exchange:消费成功之后是否要自动应答 true 自动应答 false 手动应答
         * 参数3.routingKey:路由key
         */
//        channel.queueBind(QUEUE_NAME,EXCHANGE_NAME,"");
        channel.queueBind(QUEUE_NAME,EXCHANGE_NAME,"orange"); // new
//        channel.queueBind(QUEUE_NAME,EXCHANGE_NAME,"orang"); // 【问题23.5】
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
// all (orange)
//RoutingMessage0
//RoutingMessage1
//RoutingMessage2
//RoutingMessage3
//RoutingMessage4
//RoutingMessage5
//RoutingMessage6
//RoutingMessage7
//RoutingMessage8
//RoutingMessage9
//RoutingMessage10
//RoutingMessage11
//RoutingMessage12
//RoutingMessage13
//RoutingMessage14
//RoutingMessage15
//RoutingMessage16
//RoutingMessage17
//RoutingMessage18
//RoutingMessage19
//RoutingMessage20
//RoutingMessage21
//RoutingMessage22
//RoutingMessage23
//RoutingMessage24
//RoutingMessage25
//RoutingMessage26
//RoutingMessage27
//RoutingMessage28
//RoutingMessage29
//RoutingMessage30
//RoutingMessage31
//RoutingMessage32
//RoutingMessage33
//RoutingMessage34
//RoutingMessage35
//RoutingMessage36
//RoutingMessage37
//RoutingMessage38
//RoutingMessage39
//RoutingMessage40
//RoutingMessage41
//RoutingMessage42
//RoutingMessage43
//RoutingMessage44
//RoutingMessage45
//RoutingMessage46
//RoutingMessage47
//RoutingMessage48
//RoutingMessage49