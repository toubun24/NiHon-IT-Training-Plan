package com.lalapodo.config.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller // 注册为处理器对象
public class TestController {
    @RequestMapping("/hello") // 访问路径
    @ResponseBody // 返回体
    public String hello(){
        return "hello world";
    }

    @RequestMapping("/testch") // 访问路径
    @ResponseBody // 返回体
    public String testch(){
        return "hello 张三";
    }
}
