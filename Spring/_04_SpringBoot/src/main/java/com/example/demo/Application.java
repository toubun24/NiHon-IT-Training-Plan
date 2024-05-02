package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
// @EnableScheduling // 开启Spring Task // 暂时关闭
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
