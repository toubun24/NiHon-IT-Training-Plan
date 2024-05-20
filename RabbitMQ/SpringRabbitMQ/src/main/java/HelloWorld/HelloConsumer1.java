package HelloWorld;

import com.rabbitmq.client.*;
import org.apache.log4j.BasicConfigurator;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

public class HelloConsumer1 {
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
        //创建Consumer对象，处理消息
        Consumer consumer = new DefaultConsumer(channel) {
            @Override
            public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body) throws IOException {
                System.out.println(new String(body));
            }
        };
        /**
         * 消费消息
         * 参数1.消费队列名称
         * 参数2.消费成功之后是否要自动应答 true 自动应答 false 手动应答
         * 参数3.consumer对象
         */
        channel.basicConsume(QUEUE_NAME, true, consumer);
    }
}