package com.example.demo.mapper;

import com.example.demo.Bean.TestTable;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface TestMapper { // MyBatis
    List<TestTable> getAll();

    TestTable getOne(Long id);

    boolean insertOne(TestTable testTable);

    boolean updateOne(Long id, TestTable testTable);

    boolean deleteOne(Long id);
}
