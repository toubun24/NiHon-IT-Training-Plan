package _03_PubSubQueue;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.DeliverCallback;
import org.apache.log4j.BasicConfigurator;
import util.RabbitMQUtil;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

public class PubSubConsumer1 {
//    private final static String QUEUE_NAME = "PubSubQueue";
    private final static String QUEUE_NAME = "PubSubQueue1"; // new
    private static final String EXCHANGE_NAME = "exchange_fanout";


    public static void main(String[] args) throws IOException, TimeoutException {
        BasicConfigurator.configure();

        Connection connection = RabbitMQUtil.getConnection();
        Channel channel = connection.createChannel();
        channel.exchangeDeclare(EXCHANGE_NAME,"fanout");
        channel.queueDeclare(QUEUE_NAME,false,false,false,null);
        channel.queueBind(QUEUE_NAME,EXCHANGE_NAME,"");
        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            System.out.println(new String(delivery.getBody()));
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