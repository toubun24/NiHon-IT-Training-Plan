package HelloWorld;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import org.apache.log4j.BasicConfigurator;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.TimeoutException;

public class HelloProducer {
    private static final String QUEUE_NAME = "HelloWorldQueue";

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
        /**
         * 声明队列
         * 参数1.queue:队列名称
         * 参数2.durable:队列里面的消息是否持久化，默认false消息存储在内存中
         * 参数3.exclusive:是否排他.如果一个队列声明为排他队列，该队列对首次声明它的连接可见，并在连接断开时自动删除
         * 参数4.autoDelete:是否自动删除 最后一个消费者断开连接以后 该队列是否自动删除
         * 参数5.arguments:封装描述队列的其他信息
         */
        channel.queueDeclare(QUEUE_NAME, false, false, false, null);
        /**
         * 发送消息
         * 参数1.exchange:发送到那个交换机,HelloWorld模式一定是""，不能为null
         * 参数2.routingKey:路由key，如exchange为空，则为队列名称
         * 参数3.props:封装描述消息的其他信息
         * 参数4.body:消息体，字节流
         */
        channel.basicPublish("", QUEUE_NAME, null, "Hello World".getBytes(StandardCharsets.UTF_8));
        //channel自动关闭,不需要手动关闭,这里关闭连接
        connection.close();
    }
}
