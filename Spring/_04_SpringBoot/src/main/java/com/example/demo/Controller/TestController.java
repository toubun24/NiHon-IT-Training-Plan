package com.example.demo.Controller;

import com.example.demo.Bean.Custom;
import com.example.demo.Factory.YamlConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
// @PropertySource("classpath:11111.properties") // @PropertySource abc123
// @PropertySource("classpath:22222.yml") // @PropertySource null
// @PropertySource(value = "classpath:22222.yml", factory = YamlConfig.class) // @PropertySource 321cba // Factory.YamlConfig
public class TestController {
    /*1. 读取配置文件数据: 使用@Value注解,例如:@Value("${属性名.属性名}")*/
//    @Value("${server.port}")
//    private String port;

    /*2. 使用环境对象Environment,默认获取application配置文件的内容*/
//    @Autowired
//    private Environment environment;

    /*3. 实体类对象&@ConfigurationProperties注解读取配置文件数据*/
    @Autowired
    Custom custom;

    @GetMapping("/hello")
    public String hello(){
        /*1. @Value注解读取配置文件数据*/
//        System.out.println("@Value "+port); // @Value 8080
//        System.out.println("Environment "+environment.getProperty("server.port")); // Environment 8080

        /*2. 环境对象Environment&@PropertySource注解(Bean.Custom)读取配置文件数据*/
//        System.out.println("@PropertySource "+environment.getProperty("user.MyName"));
//        // @PropertySource abc123 (.properties)
//        // @PropertySource null (.yml with @PropertySource("classpath:22222.yml"))
//        // @PropertySource 321cba (.yml with @PropertySource(value = "classpath:22222.yml", factory = YamlConfig.class))

        /*3. 实体类对象&@ConfigurationProperties注解读取配置文件数据*/
        System.out.println("@ConfigurationProperties "+custom.getPort()); // @ConfigurationProperties 8080

        return "hello world";
    }
}
