package com.example.demo.Service.Imlp;

import com.example.demo.Bean.TestTable;
import com.example.demo.Service.TestService;
import com.example.demo.mapper.TestMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;

@Service // 否则not found // 标注业务层
public class TestServiceImpl implements TestService { // MyBatis
    @Lazy // 规避循环依赖报错
    @Autowired // 自动装配一个类的成员变量、构造函数或者方法，以实现依赖注入
    private TestMapper testMapper;

    @Override
    public List<TestTable> getAll() {
        return testMapper.getAll();
    }

    @Override
    public TestTable getOne(Long id) {
        return testMapper.getOne(id);
    }

    @Override
    public boolean insertOne(TestTable testTable) {
        return testMapper.insertOne(testTable);
    }

    @Override
    public boolean updateOne(Long id, TestTable testTable) {
        return testMapper.updateOne(id, testTable);
    }

    @Override
    public boolean deleteOne(Long id) {
        return testMapper.deleteOne(id);
    }
}
