package com.lalapodo.Mapper;

import com.lalapodo.Bean.TestTable;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface TestMapper {
    @Select("select * from test_table")
    List<TestTable> getAll();

    // 事务
    @Insert("insert into test_table (id, name, age)VALUES (default,#{name},#{age})")
    // void insertUser(String name, String age);
    void insertUser(@Param("name") String name, @Param("age") String age);

    @Insert("insert into test2_table (id, name, age)VALUES (default,#{name},#{age})")
    // void insertUser2(String name, String age);
    void insertUser2(@Param("name") String name, @Param("age") String age);
}
