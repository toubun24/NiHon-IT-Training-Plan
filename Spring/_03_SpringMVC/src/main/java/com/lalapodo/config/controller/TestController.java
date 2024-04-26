package com.lalapodo.config.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller // 注册为处理器对象
@RequestMapping("/test") // 路径冲突
// http://localhost:8080/hello?test-params=zhangsan 报错
// http://localhost:8080/test/hello?test-params=zhangsan 通过
public class TestController {
    // @RequestMapping("/hello") // 访问路径
    @RequestMapping(value = "/hello",method = {RequestMethod.GET,RequestMethod.POST},params = {"test-params"},headers = {"test-headers"}) // params/headers缺一都会404
    @ResponseBody // 返回体
    public String hello(){
        return "hello world";
    }

    // http://localhost:8080/testch4/123/abc/2b
    // @RequestMapping("/testch") // 访问路径
    @RequestMapping("/testch?/**") // PathPattern配置开启
    // ?:表示任意的单个字符, **:表示任意的一层或多层目录
    @ResponseBody // 返回体
    public String testch(){
        return "hello 张三";
    }

    // http://localhost:8080/testch2abc123/abcd1234
    @RequestMapping("/testch2*/{name}")
    // *:表示任意的0个或多个字符, {xxx}:路径占位符,使用@PathVariable注解可以此获取参数变量
    @ResponseBody
    public String testch2(@PathVariable("name") String name){ // PathVariable
        System.out.println(name); // abcd1234
        return "hello 张三";
    }


}
