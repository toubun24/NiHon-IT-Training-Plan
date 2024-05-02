package com.example.demo.Controller;

import com.example.demo.Bean.TestTable;
import com.example.demo.Service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/test")
public class Test2Controller { // MyBatis
    @Autowired
    private TestService testService;

    @GetMapping
    public List<TestTable> getAll(){
        return testService.getAll();
    }
}
