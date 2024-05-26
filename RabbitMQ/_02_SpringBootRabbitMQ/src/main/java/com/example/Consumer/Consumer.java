package com.example.Consumer;

import com.rabbitmq.client.Channel;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class Consumer {
    //queues 设置要监听的队列列表
    @RabbitListener(queues = {"topic_queue"})
    void doQueue(Message message, Channel channel) throws IOException { // import com.rabbitmq.client.Channel;
        System.out.println(new String(message.getBody()));
        System.out.println(message);
        //手动Ack
        channel.basicAck(message.getMessageProperties().getDeliveryTag(), false);
    }
}
