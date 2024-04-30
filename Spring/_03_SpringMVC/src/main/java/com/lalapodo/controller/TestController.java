package com.lalapodo.controller;

import com.lalapodo.Bean.User;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller // 注册为处理器对象
// @RequestMapping("/test") // 解决路径冲突
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

    /*(原始)通过ServletAPI获取请求参数*/
    @RequestMapping("/getparameter")
    @ResponseBody
    public String testgetparameter(HttpServletRequest request){ // jakarta
        String name = request.getParameter("name");
        System.out.println(name);
        return "getparameter";
    }

    /*方法形参获取请求参数，注意新版spring-webmvc需添加@RequestParam否则请求失败*/
    @RequestMapping("/getparameter2")
    @ResponseBody
    public String getparameter2(@RequestParam("name") String name, @RequestParam("password") String password){
        System.out.println(name);
        System.out.println(password);
        return "getparameter2";
    }

    /*通过POJO获取请求参数*/
    @RequestMapping("/getparameter3")
    @ResponseBody
    public String getparameter3(User user){
        System.out.println(user);
        return "getparameter3";
    }

    /*@RequestParam, required：是否为必传参数, defaultValue：参数默认值*/
    @RequestMapping("/getparameter4")
    @ResponseBody
    public String getparameter4(@RequestParam("username") String name, @RequestParam("password") String password){
        System.out.println(name);
        System.out.println(password);
        return "getparameter4";
    }

    /*JSON数据处理*/
    @RequestMapping("/testjson")
    @ResponseBody
    // public String testjson(@RequestBody User user){ // @RequestBody: 将外部传递的json数据映射到形参的集合或对象中
    public String testjson(@RequestBody List<User> user){
        System.out.println(user);
        return "testjson";
    }

    /*响应JSON数据*/
    @RequestMapping("/responsejson")
    @ResponseBody
    public User responsejson(){
        User user = new User();
        user.setId(1L);
        user.setName("张三");
        user.setPassword("abc123");
        return user;
    }

    /*响应JSON数据2*/
    @RequestMapping("/responsejson2")
    @ResponseBody
    // public User responsejson2(){
    public List<User> responsejson2(){
        User user = new User();
        user.setId(1L);
        user.setName("张三");
        user.setPassword("abc123");
        User user2 = new User();
        user2.setId(12L);
        user2.setName("张三2");
        user2.setPassword("abc1232");
        List<User> list = new ArrayList<>();
        list.add(user);
        list.add(user2);
        return list;
    }
}
