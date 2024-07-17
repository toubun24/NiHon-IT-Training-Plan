package com.example;

import org.junit.jupiter.api.Test;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageProperties;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest
class ApplicationTests {
    @Autowired
    RabbitTemplate rabbitTemplate;
    private static final String EXCHANGE_NAME = "spring_topic_exchange";

    @Test
    void contextLoads() {
        MessageProperties messageProperties = new MessageProperties();
        messageProperties.getHeaders().put("name","zhangsan");
        messageProperties.getHeaders().put("age","18");
        String mess = "hello world";
        Message message = new Message(mess.getBytes(),messageProperties);// import org.springframework.amqp.core.Message;
        /*1. rabbitTemplate.convertAndSend()*/
//		rabbitTemplate.convertAndSend(EXCHANGE_NAME, "aaa.bbb",message); // 路由#随便写
        /*2. rabbitTemplate.convertAndSend()带messagePostProcessor参数*/
//		rabbitTemplate.convertAndSend(EXCHANGE_NAME, "aaa.bbb",message, message1 -> {
//			message1.getMessageProperties().getHeaders().put("test","test1");
//			message1.getMessageProperties().setExpiration("10000");
//			return message1;
//		});
        /*3. rabbitTemplate.send()*/
        rabbitTemplate.send(EXCHANGE_NAME,"aaa.bbb",message);
    }

}
