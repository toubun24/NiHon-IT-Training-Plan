package com.example.demo.Controller;

import com.example.demo.Bean.TestTable;
import com.example.demo.Service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/{id}")
    public TestTable getOne(@PathVariable("id") Long id){
        return testService.getOne(id);
    }

    @PostMapping
    public String insertOne(@RequestBody TestTable testTable){
        boolean b = testService.insertOne(testTable);
        return b ? "成功":"失败";
    }

    @PutMapping("/{id}")
    public String updateOne(@PathVariable("id") Long id, @RequestBody TestTable testTable){
        boolean b = testService.updateOne(id, testTable);
        return b ? "成功":"失败";
    }

    @DeleteMapping("/{id}")
    private void deleteOne(@PathVariable("id") Long id){
        testService.deleteOne(id);
    }
}
