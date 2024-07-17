package com.example;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController // RestAPIController
public class TestController {

    @GetMapping("/hello") // 配置访问路径
    public String hello(){
        return "hello world"; // JAVA对象默认返回JSON字符串
    }

    @GetMapping("/hello_list")
    public List<String> hello_list(){
        return List.of("hello","world");
    }
}
