package com.lalapodo.Mapper;

import com.lalapodo.Bean.TestTable;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface TestMapper {
    @Select("select * from test_table")
    List<TestTable> getAll();
}
