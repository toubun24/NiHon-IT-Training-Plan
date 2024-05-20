package HelloWorld;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.DeliverCallback;
import org.apache.log4j.BasicConfigurator;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

public class HelloConsumer {
    //队列名称
    private final static String QUEUE_NAME = "HelloWorldQueue";

    public static void main(String[] args) throws IOException, TimeoutException {
        BasicConfigurator.configure(); // 问题23.2

        //设置连接工厂
        ConnectionFactory connectionFactory = new ConnectionFactory();
        connectionFactory.setHost("127.0.0.1");
        connectionFactory.setPort(5672);
        connectionFactory.setVirtualHost("/");
        connectionFactory.setUsername("guest");
        connectionFactory.setPassword("guest");
        //连接工厂获取Connection
        Connection connection = connectionFactory.newConnection();
        //获取Channel
        Channel channel = connection.createChannel();
        //RabbitMQ推送的消息如何进行消费的接口回调
        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            //consumerTag消费者唯一标识符,同一会话consumerTag固定
            System.out.println(new String(delivery.getBody()));
        };
        /**
         * 消费消息
         * 参数1.消费队列名称
         * 参数2.消费成功之后是否要自动应答 true 自动应答 false 手动应答
         * 参数3.消费成功的回调
         * 参数4.消费失败的回调
         */
        channel.basicConsume(QUEUE_NAME, true, deliverCallback, consumerTag -> {
        });
        // 不签收则false
//        channel.basicConsume(QUEUE_NAME, false, deliverCallback, consumerTag -> {
//        });
    }
}
