package com.example.controller;

import com.example.dao.TestTable;
import com.example.mapper.TestMapper;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.InputStream;
import java.util.List;

@Controller
public class TestController {
    @RequestMapping("/hello")
    @ResponseBody
    public String hello(){
        return "hello world";
    }

    @RequestMapping("/hellocn")
    @ResponseBody
    public String hellocn(){
        return "hello 张三";
    }

    @Autowired
    private TestMapper testMapper; // 注入Mapper接口
    @RequestMapping("/users")
    @ResponseBody
    public List<TestTable> getUsers() {
        return testMapper.getAll(); // 调用Mapper接口中的方法
    }


}
