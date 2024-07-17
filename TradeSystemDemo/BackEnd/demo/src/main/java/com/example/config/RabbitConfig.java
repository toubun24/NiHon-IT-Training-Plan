package com.example.config;


import org.springframework.amqp.core.AmqpAdmin;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitAdmin;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitConfig {
    private static final String EXCHANGE_NAME = "spring_topic_exchange";
    private static final String QUEUE_NAME = "topic_queue";
    private static final String ROUTING_KEY = "#"; // 匹配所有

    @Bean
    public AmqpAdmin amqpAdmin(ConnectionFactory factory) { // import org.springframework.amqp.rabbit.connection.ConnectionFactory;
        RabbitAdmin admin = new RabbitAdmin(factory);
        //声明一个交换机
        admin.declareExchange(new TopicExchange(EXCHANGE_NAME, false, false)); // TopicExchange 主题交换机 // 也可如DirectExchange, FanoutExchange
        //声明队列
        admin.declareQueue(new Queue(QUEUE_NAME, false, false, false));
        //声明绑定
        admin.declareBinding(new Binding(QUEUE_NAME, Binding.DestinationType.QUEUE, EXCHANGE_NAME, ROUTING_KEY, null));
        return admin;
    }
}
