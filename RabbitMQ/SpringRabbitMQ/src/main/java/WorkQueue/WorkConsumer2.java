package WorkQueue;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.DeliverCallback;
import org.apache.log4j.BasicConfigurator;
import util.RabbitMQUtil;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

public class WorkConsumer2 {
    private final static String QUEUE_NAME = "WorkQueue";

    public static void main(String[] args) throws IOException, TimeoutException {
        BasicConfigurator.configure();

        Connection connection = RabbitMQUtil.getConnection();
        Channel channel = connection.createChannel();
        //声明消费者一次只消费一条消息
        channel.basicQos(1); // new
        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            try {
                Thread.sleep(1000L);
                System.out.println(new String(delivery.getBody()));
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            } finally {
                //参数1.DeliveryTag是消息投递序号(long类型),在channel中用来标志消息,可通过DeliveryTag进行Ack
                //参数2.布尔值，是否批量应答
                channel.basicAck(delivery.getEnvelope().getDeliveryTag(),false); // new
            }
        };
//        channel.basicConsume(QUEUE_NAME, true, deliverCallback, consumerTag -> {
        channel.basicConsume(QUEUE_NAME, false, deliverCallback, consumerTag -> { // 关闭自动应答
        });
    }
}
//只一条
//WorkQueue0
