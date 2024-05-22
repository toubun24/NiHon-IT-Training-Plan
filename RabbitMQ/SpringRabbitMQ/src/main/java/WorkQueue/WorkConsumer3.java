package WorkQueue;

import com.rabbitmq.client.*;
import org.apache.log4j.BasicConfigurator;
import util.RabbitMQUtil;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

public class WorkConsumer3 {
    private final static String QUEUE_NAME = "WorkQueue";
    public static void main(String[] args) throws IOException, TimeoutException {
        BasicConfigurator.configure();

        Connection connection = RabbitMQUtil.getConnection();
        Channel channel = connection.createChannel();
        //声明消费者一次只消费一条消息
        channel.basicQos(1); // new
        Consumer consumer = new DefaultConsumer(channel) {
            @Override
            public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties, byte[] body) throws IOException {
                System.out.println(new String(body));
                //参数1.DeliveryTag是消息投递序号(long类型),在channel中用来标志消息,可通过DeliveryTag进行Ack
                //参数2.布尔值，是否批量应答
                channel.basicAck(envelope.getDeliveryTag(),false); // new
            }
        };
//        channel.basicConsume(QUEUE_NAME, true, consumer);
        channel.basicConsume(QUEUE_NAME, false, consumer); // 关闭自动应答
    }
}
//几乎瞬间
//WorkQueue1
//WorkQueue2
//WorkQueue3
//WorkQueue4
//WorkQueue5
//WorkQueue6
//WorkQueue7
//WorkQueue8
//WorkQueue9
//WorkQueue10
//WorkQueue11
//WorkQueue12
//WorkQueue13
//WorkQueue14
//WorkQueue15
//WorkQueue16
//WorkQueue17
//WorkQueue18
//WorkQueue19
//WorkQueue20
//WorkQueue21
//WorkQueue22
//WorkQueue23
//WorkQueue24
//WorkQueue25
//WorkQueue26
//WorkQueue27
//WorkQueue28
//WorkQueue29
//WorkQueue30
//WorkQueue31
//WorkQueue32
//WorkQueue33
//WorkQueue34
//WorkQueue35
//WorkQueue36
//WorkQueue37
//WorkQueue38
//WorkQueue39
//WorkQueue40
//WorkQueue41
//WorkQueue42
//WorkQueue43
//WorkQueue44
//WorkQueue45
//WorkQueue46
//WorkQueue47
//WorkQueue48
//WorkQueue49