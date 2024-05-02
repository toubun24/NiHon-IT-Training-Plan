package com.example.demo.Task;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class TestTask {
    @Scheduled(cron = "* * * * * ?")
    public void samtask(){
        System.out.println("springboot task执行"); // springboot task执行 1s springboot task执行 ...
    }
}
